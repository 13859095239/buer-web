window.config = {
    title: '不二平台',
    miniTitle: '不二平台'
};
document.title = window.config.title;
var stateCheck = setInterval(() => {
    var doms = document.getElementsByClassName('app-loading-title');
    if (doms.length > 0) {
        doms[0].innerText = document.title;
        clearInterval(stateCheck);
    }
}, 100);