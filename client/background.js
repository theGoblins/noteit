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
