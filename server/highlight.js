if (!window.Highlight) {
  Highlight = {};
}
Highlight.Selector = {};
Highlight.Selector.getSelected = function() {
  var t = '';
  if (window.getSelection) {
    t = window.getSelection();
  } else if (document.getSelection) {
    t = document.getSelection();
  } else if (document.selection) {
    t = document.selection.createRange().text;
  }
  return t;
};

//   Highlight.Selector.mouseup = function(){
//     var st = Highlight.Selector.getSelected();
//     if(st!=''){
//       alert("You selected:\n"+st);
//     }
//   }

function getDomPath(el) {
  var stack = [];

  // TODO: if element has an ID, reference it directly…
  // if ( el.hasAttribute('id') && el.id != '' ) {
  //   stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
  // }

  // while the current element has a parent…
  while (el.parentNode != null) {
    var siblingIndex = 0;
    var prevSibling = el.previousSibling;

    while (prevSibling) {
      if (el.nodeName === prevSibling.nodeName) siblingIndex++;
      prevSibling = prevSibling.previousSibling;
    }

    // exclude elements starting with '#' (i.e. '#text')
    if (el.nodeName[0] !== '#') {
      stack.unshift(
        el.nodeName.toLowerCase() +
          (siblingIndex > 0 ? ':eq(' + siblingIndex + ')' : '')
      );
    }

    el = el.parentNode;
  }

  return stack;
}

Highlight.Selector.mouseup = function() {
  let selected = Highlight.Selector.getSelected();
  if (selected == '') return;

  const highlightObj = {
    anchorData: selected.anchorNode.data,
    anchorOffset: selected.anchorOffset,
    focusData: selected.focusNode.data,
    focusOffset: selected.focusOffset,
    anchorElement: selected.anchorNode,
    focusElement: selected.focusNode
  };

  let position = selected.anchorNode.compareDocumentPosition(
    selected.focusNode
  );

  let shouldSwap = position & Node.DOCUMENT_POSITION_PRECEDING;

  const noteObj = {
    start_path: shouldSwap
      ? getDomPath(highlightObj.focusElement)
      : getDomPath(highlightObj.anchorElement),
    stop_path: shouldSwap
      ? getDomPath(highlightObj.anchorElement)
      : getDomPath(highlightObj.focusElement),
    start_index: shouldSwap
      ? highlightObj.focusOffset
      : highlightObj.anchorOffset,
    stop_index: shouldSwap
      ? highlightObj.anchorOffset
      : highlightObj.focusOffset
  };

  const finalObj = JSON.parse(JSON.stringify(noteObj));

  chrome.runtime.sendMessage({
    type: 'highlighted-notes',
    data: [finalObj]
  });

  console.log(`noteObj: ${JSON.stringify(noteObj)}`);

  return finalObj;
};

$(document).ready(function() {
  $(document).bind('mouseup', Highlight.Selector.mouseup);
});
