let contextMenuItem = {
  id: 'highlight',
  title: 'Highlight It',
  contexts: ['selection']
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {

  if(clickData.menuItemId == "highlight" && clickData.selectionText) {
    // chrome.runtime.onMessage.addListener((msg) => {
    //   if (msg.type === 'sent-obj') {
    //     console.log("finalObj message recieved!");
    //     postHighlights(msg.data);
    //   }
    // })
    
    
    // console.log("something is happening!!");
    // postHighlights();

  }
});

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
// }) ();

function postHighlights(data) {
  fetch('http://localhost:5535/notes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({

      "url": "wiki.com",
      "text": "selection text",
      "startPath": data.anchorPath,
      "stopPath": data.focusPath,
      "startIndex": data.anchorOffset,
      "stopIndex": data.focusOffset,
      "isHighlighted": true
  }),
  })
  .then(function(response) {
    return response.json();
  })

      url: 'file:///Users/jessica/Desktop/untitled%20folder/test.html',
      text: 'This is a sample note',
      startPath: ['html', 'body:eq(3)', 'p'],
      stopPath: ['html', 'body:eq(4)', 'p'],
      startIndex: 26,
      stopIndex: 42,
      isHighlighted: true
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(somehting) {});

}

let currentURL;

// chrome.webNavigation.onCompleted.addListener((details) => {
//   if (details.frameId === 0) {
//     chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
//       url = tabs[0].url;
//       currentURL = url || details.url;
//       setTimeout(getNotesForURL, 2000);
//     });
//   }
// });

chrome.runtime.onMessage.addListener(msg => {
  // If the received message has the expected format...
  if (msg.type === 'highlighted-notes') {
    console.log('got message:');
    console.log(JSON.stringify(msg.data));
    // Call the specified callback, passing
    // the web-page's DOM content as argument
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'highlighted-notes',
        data: msg.data
      });
    });
  }
  if (msg.type === 'sent-obj') {
    postHighlights(msg.data);
  }
});

function getNotesForURL() {
  const url = currentURL;
  fetch(`http://localhost:5535/notes/all`)
    .then(resp => resp.json())
    .then(resp => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'highlighted-notes',
          data: resp
        });
      });
    })
    .catch(err => console.error(err));
}
