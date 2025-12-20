var userAgent = navigator.userAgent;
if (userAgent.indexOf('Firefox') == -1 && userAgent.indexOf('Chrome') == -1) {
  window.location.href = 'assets/browser/page/index.html';
}