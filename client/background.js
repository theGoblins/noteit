
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

// chrome.webNavigation.onCompleted.addListener((details) => {
//   console.log(details);
//   if (details.frameId === 0) {
//     chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
//       url = tabs[0].url;
//       currentURL = url || details.url;
//       console.log(currentURL);
//       setTimeout(getNotesForURL, 2000);
//     });
//   }
// });

chrome.runtime.onMessage.addListener((msg) => {
  console.log('background message received!');
  // If the received message has the expected format...
  if (msg.type === 'highlighted-text-path') {
      // Call the specified callback, passing
      // the web-page's DOM content as argument
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'notes_to_highlight', data: msg.data });
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


