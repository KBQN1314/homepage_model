<?php
header('Content-Type: application/json; charset=utf-8');

function json_response($statusCode, $payload) {
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'message' => 'Method not allowed']);
}

$configFile = __DIR__ . '/db.php';
if (!file_exists($configFile)) {
    json_response(500, ['ok' => false, 'message' => '数据库配置文件不存在，请在服务器上创建 api/db.php']);
}

$config = require $configFile;
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

function value_of($data, $key, $maxLength = 500) {
    $value = isset($data[$key]) ? trim((string)$data[$key]) : '';
    if ($value === '') return null;
    if (function_exists('mb_substr')) return mb_substr($value, 0, $maxLength, 'UTF-8');
    return substr($value, 0, $maxLength);
}

$name = value_of($data, 'name', 100);
$contact = value_of($data, 'contact', 150);
$formType = value_of($data, 'purpose', 100) ?: value_of($data, 'form_type', 100) ?: 'unknown';

if (!$name || !$contact) {
    json_response(422, ['ok' => false, 'message' => '请填写姓名和联系方式']);
}

try {
    $host = $config['host'] ?? '127.0.0.1';
    $port = (int)($config['port'] ?? 3306);
    $database = $config['database'] ?? '';
    $charset = $config['charset'] ?? 'utf8mb4';
    $username = $config['username'] ?? '';
    $password = $config['password'] ?? '';

    $dsn = "mysql:host={$host};port={$port};dbname={$database};charset={$charset}";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    $stmt = $pdo->prepare(
        'INSERT INTO form_submissions
        (form_type, name, contact, child_age, focus_area, course_interest, city, cooperation_type, message, source_page, user_agent, ip_address)
        VALUES
        (:form_type, :name, :contact, :child_age, :focus_area, :course_interest, :city, :cooperation_type, :message, :source_page, :user_agent, :ip_address)'
    );

    $stmt->execute([
        ':form_type' => $formType,
        ':name' => $name,
        ':contact' => $contact,
        ':child_age' => value_of($data, 'childAge', 50),
        ':focus_area' => value_of($data, 'focusArea', 255),
        ':course_interest' => value_of($data, 'courseInterest', 255),
        ':city' => value_of($data, 'city', 100),
        ':cooperation_type' => value_of($data, 'cooperationType', 255),
        ':message' => value_of($data, 'message', 5000),
        ':source_page' => value_of($data, 'sourcePage', 500),
        ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        ':ip_address' => $_SERVER['HTTP_X_FORWARDED_FOR'] ?? ($_SERVER['REMOTE_ADDR'] ?? ''),
    ]);

    json_response(200, ['ok' => true, 'id' => $pdo->lastInsertId(), 'message' => '提交成功']);
} catch (Throwable $e) {
    error_log('[form-submit] ' . $e->getMessage());
    json_response(500, ['ok' => false, 'message' => '服务器暂时无法保存信息，请稍后再试']);
}
