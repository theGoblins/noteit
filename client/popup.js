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