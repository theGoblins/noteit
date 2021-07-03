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

<<<<<<< HEAD
  Highlight.Selector.mouseup = function(){
    let selected = Highlight.Selector.getSelected();
      if (selected!=''){
         let stack = [];
         while (selected.parentNode != null){
             console.log (selected.nodeName);
             let sibCount = 0;
             let sibIndex = 0;
             for (let i = 0; i < selected.parentNode.childNodes.length; i++){
                 let sib = selected.parentNode.childNodes[i];
                 if (sib.nodeName == selected.nodeName){
                     if (sib === path){
                         sibIndex = sibCount;
                     }
                     sibCount++;
                 }
             }
             if ( path.hasAttribute('id') && selected.id != '' ) {
                    stack.unshift(selected.nodeName.toLowerCase() + '#' + el.id);
                    } else if ( sibCount > 1 ) {
                     stack.unshift(selected.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
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
            focusElement: selected.focusNode,
         }
          function getDomPath(el) {
            var stack = [];
            while ( el.parentNode != null ) {
              console.log(el.nodeName);
              var sibCount = 0;
              var sibIndex = 0;
              for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
                var sib = el.parentNode.childNodes[i];
                if ( sib.nodeName == el.nodeName ) {
                  if ( sib === el ) {
                    sibIndex = sibCount;
                  }
                  sibCount++;
                }
              }
              // if ( el.hasAttribute('id') && el.id != '' ) {
              //   stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
              if ( sibCount > 1 ) {
                stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
              } else {
                stack.unshift(el.nodeName.toLowerCase());
              }
              el = el.parentNode;
            }
             console.log(stack);
             stack.splice(-1, 1);

             const filteredArray = stack.filter(element => element[0] !== '#');
             console.log(filteredArray);
              chrome.runtime.sendMessage({ type: 'highlighted-text-path', data: filteredArray });
             return filteredArray; 
           }
        
        const noteObj = {
            anchorPath: getDomPath(highlightObj.anchorElement),
            focusPath: getDomPath(highlightObj.focusElement),
            anchorOffset: highlightObj.anchorOffset,
            focusOffset: highlightObj.focusOffset,
        }

    const finalObj = JSON.parse(JSON.stringify(noteObj));
    let position = selected.anchorNode.compareDocumentPosition(selected.focusNode);
  
    if (position & Node.DOCUMENT_POSITION_PRECEDING) {

        let tempFocus = finalObj.focusPath;
        let tempFocusOffset = finalObj.focusOffset;
            finalObj.focusPath = finalObj.anchorPath;
            finalObj.anchorPath = tempFocus;
            finalObj.focusOffset = finalObj.anchorOffset;
            finalObj.anchorOffset = tempFocusOffset;
        }


        console.log(finalObj);



        return finalObj;
=======
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
>>>>>>> 1cbb106985932c3e76607d85d44376e905647663
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
