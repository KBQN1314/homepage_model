/* Team member list renderer. */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function pageMode() {
    var file = (location.pathname.split('/').pop() || 'team.html').toLowerCase();
    if (file === 'experts.html') return { group: 'expert' };
    if (file === 'assistants.html') return { group: 'assistant' };
    if (file === 'team-page-2.html') return { page: 2 };
    return { page: 1 };
  }

  function membersForMode(members, mode) {
    if (mode.group) return members.filter(function (item) { return item.group === mode.group; });
    if (mode.page === 2) return members.slice(6);
    return members.slice(0, 6);
  }

  function memberCard(member) {
    return [
      '<article class="member-card reveal show">',
      '<div class="member-photo avatar ', escapeHtml(member.avatarClass), '"></div>',
      '<div class="member-info">',
      '<div class="role">', escapeHtml(member.role), '</div>',
      '<h3>', escapeHtml(member.name), '</h3>',
      '<p>', escapeHtml(member.summary), '</p>',
      '<a class="btn-mini" href="', escapeHtml(member.href), '">查看更多 &gt;&gt;</a>',
      '</div>',
      '</article>'
    ].join('');
  }

  function renderTeamList() {
    var grid = document.querySelector('.team-grid[data-team-list]');
    var members = window.ZKTeamMembers;
    if (!grid || !Array.isArray(members) || !members.length) return;

    var mode = pageMode();
    var visibleMembers = membersForMode(members, mode);
    grid.innerHTML = visibleMembers.map(memberCard).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTeamList);
  } else {
    renderTeamList();
  }
}());
