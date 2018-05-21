var range = window.getSelection().getRangeAt(0);
var selectionContents = range.extractContents();
var div = document.createElement("div");
div.style.color = "yellow";
div.appendChild(selectionContents);
range.insertNode(div);