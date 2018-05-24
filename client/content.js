chrome.runtime.onMessage.addListener(msg => {
  // If the received message has the expected format...
  if (msg.type === 'highlighted-notes') {
    // Call the specified callback, passing
    // the web-page's DOM content as argument
    highlightNotes(msg.data);
  }
});

function highlightNotes(arr) {
  let noteObj = arr[0];
  let startElement = noteObj.start_path.join(' > ');
  let startIndex = noteObj.start_index;
  let stopIndex = noteObj.stop_index;
  let stopElement = noteObj.stop_path.join(' > ');

  // TODO:
  // elements.forEach((e, i) => {
  //   startIndex = i === 1?
  //   element = $('html body p:eq(2)');
  //   element.markRanges([{start: 5, length: 100000}]);

  // $(startElement).html($(startElement).html() + ', Hello world!');

  $(startElement).markRanges([
    { start: startIndex, length: stopIndex - startIndex }
  ]);
}
