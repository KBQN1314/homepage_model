(function () {
  'use strict';
  // Course challenge rendering has been centralized in statics/js/main.js.
  // This compatibility shim prevents duplicate DOM insertion on pages that still reference the legacy file.
  window.ZKSite = window.ZKSite || {};
  window.ZKSite.legacyCourseChallengesShimLoaded = true;
})();
