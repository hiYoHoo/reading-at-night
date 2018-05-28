// 获取初始状态并保存
var status = 'off';
chrome.storage.sync.get('status', function(result){
    status = result.status || status;
    chrome.storage.sync.set({'status': status}, function(){
        if (status === 'on') {
            chrome.browserAction.setBadgeBackgroundColor({color: '#32CD32'});
            chrome.browserAction.setBadgeText({text: 'ON'});
        } else if (status === 'off') {
            chrome.browserAction.setBadgeBackgroundColor({color: '#DC143C'});
            chrome.browserAction.setBadgeText({text: 'OFF'});
        }
    });
});
