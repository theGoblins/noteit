document.body.onload = function() {
    let dataArr = [];
    chrome.storage.sync.get("data", function(items) {
      if (!chrome.runtime.error) {
        console.log(items);
        dataArr.push(items.data);
        document.getElementById("data").innerText = dataArr;
        console.log(dataArr, "data array!!!");
      }
    });

  document.getElementById("set").onclick = function() {
    var d = document.getElementById("text").value;
    chrome.storage.sync.set({ "data" : d }, function() {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
    window.close();
  }

  function displayNotes() {
    console.log('hit displayNotes');
    chrome.runtime.getBackgroundPage((backgroundPage) => {
      var currentUrl = backgroundPage.tabURL;
      fetch(`http://localhost:5535/notes`)
        .then(resp => resp.json())
        .then(data => {
          console.log('response received from server\n populating DOM...');
          data.forEach(e, i => {
            // populate a note
            $('#notes').append(`
              <div class="note" id="note${i}">
                <div class="note-text">${e.text}</div>
                <div class="datestamp">Created on: ${e.created_at.toString()}</div>
              </div>
            `);
          });
        })
        .catch(err => console.error(err));
      });
    }

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'notes_to_highlight', data: msg.data });
  });

  displayNotes();
}
  // "content_security_policy": "script-src 'self' 'unsafe-eval' https://apis.googleapis.com https://ajax.googleapis.com; object-src 'self' 'unsafe-eval' https://apis.googleapis.com https://ajax.googleapis.com",


  // "content_security_policy": "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'self'",