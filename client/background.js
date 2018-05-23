
let contextMenuItem = {
    "id": "highlight",
    "title": "Highlight It",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
  if(clickData.menuItemId == "highlight" && clickData.selectionText) {
    console.log("something is happening!!");
  }
})

function postHighlights() {
  fetch(`/notes`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(),
  })
  .then(function(response) {
    return response.json();
  })
  .then()
}

let currentURL;

chrome.webNavigation.onCompleted.addListener((details) => {
  console.log(details);
  if (details.frameID === 0) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
      url = tabs[0].url;
      currentURL = url || details.url;
      console.log(currentURL);
    });
    setTimeout(getNotesForURL, 2000);
  }
});

function getNotesForURL() {
  const url = currentURL;
  fetch(`/notes/all`)
    .then(resp => resp.json())
    .then(resp => console.log(resp));
}

