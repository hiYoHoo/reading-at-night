var changeStatus = function(status) {
    var head_node = document.getElementsByTagName('head')[0];
    if (status === 'on') {
        var style = document.createElement('style');
        style.id = 'ran_dark_theme';
        style.appendChild(document.createTextNode('*{background-color:#0f1112!important;color:#666!important;}'));
        head_node.appendChild(style);
    } else if (status === 'off') {
        var style = document.getElementById('ran_dark_theme');
        style && head_node.removeChild(style);
    }
};

// 初始化
chrome.storage.sync.get('status', function(result){
    changeStatus(result.status);
});

// 监听来自popup改变状态的动作
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    changeStatus(request.status);
});
