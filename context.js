chrome.contextMenus.create({
    id: "Inputs",
    title: "Fill user data",
    contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
        chrome.tabs.executeScript(tab.id, {file: "background.js", allFrames: true});
    }
});