chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (!tabs.length) return;
        const currentTab = tabs[0];

        switch (command) {
            case "reload-tab":
                reloadTab(currentTab);
                break;
            case "close-tab":
                closeTab(currentTab);
                break;
            case "create-tab":
                createTab(currentTab);
                break;
            case "restore-tab":
                restoreTab();
                break;
        }
    });
});

function reloadTab(currentTab) {
    chrome.tabs.reload(currentTab.id);
}

function closeTab(currentTab) {
    chrome.tabs.remove(currentTab.id);
}

function createTab(currentTab) {
    chrome.tabs.create({ index: currentTab.index + 1, active: true });
}

function restoreTab() {
    chrome.sessions.getRecentlyClosed({ maxResults: 1 }, (sessions) => {
        if (sessions.length > 0) {
            const lastSession = sessions[0];
            if (lastSession.tab) {
                chrome.sessions.restore(lastSession.tab.sessionId);
            }
        }
    });
}
