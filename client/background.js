
let contextMenuItem = {
    "id": "highlight",
    "title": "Highlight It",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
  if(clickData.menuItemId == "highlight" && clickData.selectionText) {
    console.log("something is happening!!");
    postHighlights();
  }
})

// let postHighlights = (async () => {
//   const rawResponse = await fetch('/notes', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "url": "file:///Users/jessica/Desktop/untitled%20folder/test.html",
//       "text": "This is a sample note",
//       "startPath": ["html", "body:eq(3)", "p"],
//       "stopPath": ["html", "body:eq(4)", "p"],
//       "startIndex": 26,
//       "stopIndex": 42,
//       "isHighlighted": true
//     })
//   });
//   const content = await rawResponse.json();
//   console.log(content, "content");
// }) ();

function postHighlights() {
  fetch('http://localhost:5535/notes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "url": "file:///Users/jessica/Desktop/untitled%20folder/test.html",
      "text": "This is a sample note",
      "startPath": ["html", "body:eq(3)", "p"],
      "stopPath": ["html", "body:eq(4)", "p"],
      "startIndex": 26,
      "stopIndex": 42,
      "isHighlighted": true
  }),
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(somehting) {
    console.log(something, "is happening");
  })
}

let currentURL;

chrome.webNavigation.onCompleted.addListener((details) => {
  console.log(details);
  if (details.frameId === 0) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
      url = tabs[0].url;
      currentURL = url || details.url;
      console.log(currentURL);
      setTimeout(getNotesForURL, 2000);
    });
  }
});

function getNotesForURL() {
  const url = currentURL;
  fetch(`http://localhost:5535/notes/all`)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      console.log('response received from server: ', resp, '\n sending data to content.js...');
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'notes_to_highlight', data: resp });
      });
    })
    .catch(err => console.error(err));
}

