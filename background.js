chrome.commands.onCommand.addListener(function (command) {
    if (command === "reload-tab") {
        reloadTab();
    } else if (command === "close-tab") {
        closeTab();
    }
});

function reloadTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        let tab = tabs[0];
        chrome.tabs.reload(tab.id);
    });
}

function closeTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        let tab = tabs[0];
        chrome.tabs.remove(tab.id);
    });
}