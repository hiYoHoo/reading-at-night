var block_switch = document.getElementById('switch');
var status_opp = {
    'on': 'off',
    'off': 'on'
};
var changeStatus = function(status) {
    if (status === 'on') {
        block_switch.className = 'open';
        chrome.browserAction.setBadgeBackgroundColor({color: '#32CD32'});
        chrome.browserAction.setBadgeText({text: 'ON'});
    } else if (status === 'off') {
        block_switch.className = 'close';
        chrome.browserAction.setBadgeBackgroundColor({color: '#DC143C'});
        chrome.browserAction.setBadgeText({text: 'OFF'});
    }
};

// 初始化
chrome.storage.sync.get('status', function(result){
    changeStatus(result.status);
});


block_switch.onclick = function() {
    chrome.storage.sync.get('status', function(result){
        var status = status_opp[result.status];
        // 向页面发送消息
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {status: status}, function(response){
                changeStatus(status);
                chrome.storage.sync.set({'status': status});
            });
        });
    });
};


