chrome.runtime.onMessage.addListener((msg) => {
  console.log('message received!');
  // If the received message has the expected format...
  if (msg.type === 'notes_to_highlight') {
      // Call the specified callback, passing
      // the web-page's DOM content as argument
      // highlightNotes(msg.data)
  }
});

function highlightNotes(DBobjs) {
  let elementString = DBobjs.join(' ');
  console.log('elementstring ' + elementString);
  let start = 3, length = 140;
  // once the selector arrays are properly constructed, use this: 
  // elements.forEach((e, i) => {
  //   startIndex = i === 1?
  //   element = $('html body p:eq(2)');
  //   element.markRanges([{start: 5, length: 100000}]);
  $(elementString).text('HELLLO!!!!!');
  
  // .markRanges([{start: 0, length: 40}]);
}

