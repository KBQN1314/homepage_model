(function () {
  function getApiUrl() {
    return new URL('api/submit-form.php', window.location.href).toString();
  }

  function showResult(titleText, messageText) {
    const modal = document.getElementById('modal');
    if (!modal) {
      alert(messageText || titleText);
      return;
    }
    const title = modal.querySelector('h3');
    const text = modal.querySelector('p');
    if (title) title.textContent = titleText;
    if (text) text.textContent = messageText;
    modal.classList.add('show');
  }

  function collectFormData(form) {
    const data = Object.fromEntries(new FormData(form).entries());
    data.sourcePage = window.location.href;
    return data;
  }

  function initMysqlFormSubmit() {
    const form = document.getElementById('unifiedInquiryForm');
    if (!form) return;

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = '正在提交...';
      }

      try {
        const response = await fetch(getApiUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(collectFormData(form))
        });

        let result = null;
        try {
          result = await response.json();
        } catch (error) {
          result = null;
        }

        if (!response.ok || !result || result.ok !== true) {
          throw new Error((result && result.message) || '提交失败，请稍后再试');
        }

        form.reset();
        const select = document.getElementById('purposeSelect');
        if (select) select.dispatchEvent(new Event('change'));
        showResult('信息已提交', '我们已收到你的信息，并已保存到数据库。工作人员会根据你的需求尽快联系。');
      } catch (error) {
        showResult('提交失败', error.message || '服务器暂时无法保存信息，请稍后再试。');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText || '提交信息';
        }
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMysqlFormSubmit);
  } else {
    initMysqlFormSubmit();
  }
})();
