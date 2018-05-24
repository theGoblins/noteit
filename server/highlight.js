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

Highlight.Selector.mouseup = function() {
  let selected = Highlight.Selector.getSelected();
  if (selected != '') {
    let stack = [];
    while (selected.parentNode != null) {
      let sibCount = 0;
      let sibIndex = 0;
      for (let i = 0; i < selected.parentNode.childNodes.length; i++) {
        let sib = selected.parentNode.childNodes[i];
        if (sib.nodeName == selected.nodeName) {
          if (sib === path) {
            sibIndex = sibCount;
          }
          sibCount++;
        }
      }
      if (path.hasAttribute('id') && selected.id != '') {
        stack.unshift(selected.nodeName.toLowerCase() + '#' + el.id);
      } else if (sibCount > 1) {
        stack.unshift(
          selected.nodeName.toLowerCase() + ':eq(' + sibIndex + ')'
        );
      } else {
        stack.unshift(selected.nodeName.toLowerCase());
      }
      selected = selected.parentNode;
    }
    const highlightObj = {
      anchorData: selected.anchorNode.data,
      anchorOffset: selected.anchorOffset,
      focusData: selected.focusNode.data,
      focusOffset: selected.focusOffset,
      anchorElement: selected.anchorNode,
      focusElement: selected.focusNode
    };
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

 
    const finalObj = JSON.parse(JSON.stringify(noteObj));
    let position = selected.anchorNode.compareDocumentPosition(selected.focusNode);
        // send message to background.js
        
        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          
          let tempFocus = finalObj.focusPath;
          let tempFocusOffset = finalObj.focusOffset;
          finalObj.focusPath = finalObj.anchorPath;
          finalObj.anchorPath = tempFocus;
          finalObj.focusOffset = finalObj.anchorOffset;
          finalObj.anchorOffset = tempFocusOffset;
        }
        
        chrome.runtime.sendMessage({ type: 'sent-obj', data: finalObj });

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

      chrome.runtime.sendMessage({
        type: 'highlighted-text-path',
        data: stack
      });

      return stack;
    }

    const noteObj = {
      anchorPath: getDomPath(highlightObj.anchorElement),
      focusPath: getDomPath(highlightObj.focusElement),
      anchorOffset: highlightObj.anchorOffset,
      focusOffset: highlightObj.focusOffset
    };

    const finalObj = JSON.parse(JSON.stringify(noteObj));
    let position = selected.anchorNode.compareDocumentPosition(
      selected.focusNode
    );

    if (position & Node.DOCUMENT_POSITION_PRECEDING) {
      let tempFocus = finalObj.focusPath;
      let tempFocusOffset = finalObj.focusOffset;
      finalObj.focusPath = finalObj.anchorPath;
      finalObj.anchorPath = tempFocus;
      finalObj.focusOffset = finalObj.anchorOffset;
      finalObj.anchorOffset = tempFocusOffset;
    }

    console.log(`finalObj: ${JSON.stringify(finalObj)}`);

    return finalObj;
  }
};

$(document).ready(function() {
  $(document).bind('mouseup', Highlight.Selector.mouseup);
});
