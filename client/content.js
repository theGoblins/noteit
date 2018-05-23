chrome.runtime.onMessage.addListener((msg) => {
  console.log('message received!');
  // If the received message has the expected format...
  if (msg.type === 'notes_to_highlight') {
      // Call the specified callback, passing
      // the web-page's DOM content as argument
      highlightNotes(msg.data)
  }
});

function highlightNotes(data) {
  // const singleElement = true;
  // if (data.startPath && data.stopPath) singleElement = false;
  const regex = /\d+/i
  const startElement = $('html body p:eq(3)');
  const originalHtml = startElement.html();
  // if (singleElement) {
    const newHtml = originalHtml.slice(0, data.startIndex) + '<span style = "background-color:yellow">' + originalHtml.slice(data.startIndex, data.stopIndex) + '</span>' + originalHtml.slice(data.stopIndex);
    startElement.html(newHtml);
  // } else {
  //   const pathOpener = startPath.join(' ');
  //   pathOpener.splice(startPath.indexOf('('));
  //   const newHtml = originalHtml.slice(0, data.startIndex) + '<span style = "background-color:yellow">' + originalHtml.slice(data.startIndex) + '</span>';
  //   startElement.html(newHtml);
  //   for (let i = data.startPath[data.startPath.length - 1].slice(data.startPath[data.startPath.length - 1].indexOf('('), data.startPath[data.startPath.length - 1].indexOf(')')) + 1; i <= data.stopPath[data.stopPath.length - 1].slice(data.stopPath[data.stopPath.length - 1].indexOf('('), data.stopPath[data.stopPath.length - 1].indexOf(')')); i++) {
  //     const element = $(pathOpener + i + ')');
      
  //   }
  // }
  
}