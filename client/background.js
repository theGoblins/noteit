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
