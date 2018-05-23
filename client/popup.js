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
  }
  
  document.getElementById("set").onclick = function() {
    var d = document.getElementById("text").value;
    chrome.storage.sync.set({ "data" : d }, function() {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
    window.close();
  }


  // "content_security_policy": "script-src 'self' 'unsafe-eval' https://apis.googleapis.com https://ajax.googleapis.com; object-src 'self' 'unsafe-eval' https://apis.googleapis.com https://ajax.googleapis.com",


  // "content_security_policy": "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'self'",