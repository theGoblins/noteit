let contextMenuItem = {
    "id": "highlight",
    "title": "Highlight It",
    "contexts": ["selection"]
};



chrome.contextMenus.create(contextMenuItem, function highlightStuff(info) {
    var searchstring = info.selectionText;
    console.log(searchstring, "this is the search string");
});