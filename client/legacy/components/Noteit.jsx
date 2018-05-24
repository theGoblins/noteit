import React from "react";

// var request = require('request');
// var cheerio = require('cheerio');

// request('http://www.google.com/', function(err, resp, html) {
//         if (!err){
//           const $ = cheerio.load(html);
//       }
// });

// function TestSelection () {
//   if (window.getSelection) {  // all browsers, except IE before version 9
//       var selectionRange = window.getSelection ();
//       alert ("The text content of the selection:\n" + selectionRange.toString ());
//   }
//   else {
//       if (document.selection.type == 'None') {
//           alert ("No content is selected, or the selected content is not available!");
//       }
//       else {
//           var textRange = document.selection.createRange ();
//           alert ("The text content of the selection:\n" + textRange.text);
//       }
//   }
// }

// var t = '';
//     function gText(e) {
//     t = (document.all) ? document.selection.createRange().text : document.getSelection()};

//     document.getElementById('input').value = t;

// document.onmouseup = gText;
// if (!document.all) document.captureEvents(Event.MOUSEUP);
class Noteit extends React.Component {
  componentDidMount() {
    document.addEventListener("mouseup", this.handleHighlight);
  }

  handleHighlight(selected) {
    const test = document.getSelection(); // document.getElementById("testing");
    document.getElementById('testing').style.backgroundColor = "yellow";
  }


  render() {
    return (
      <div>
        <embed id="iframez" src="https://www.wikipedia.org/" />
        <embed id="yelp" src="https://www.yelp.com/" width="640" height="480"/>
       <embed id="google" src=" https://www.google.com/"width="640" height="480" />
        <div id="options-box">
          <div id="testing">Tools:</div>
          <input
            checked="checked"
            name="highlight"
            type="radio"
            value="true"
          />Highlighter<br />
          <input name="highlight" type="radio" value="true" />UnHighlighter
          <br />
          <button>Save</button>
        </div>
      </div>
    );
  }
}

// const Noteit = props => (
//   <div>
//     <embed id="iframez" src="https://www.wikipedia.org/" />
//     <div id="options-box">
//       <input checked="checked" name="highlight" type="radio" value="true" />Highlighter<br />
//       <input name="highlight" type="radio" value="true" />UnHighlighter
//       <br />
//       <button>Save</button>
//     </div>
//   </div>
// );
//   <div>
//     <embed id="iframez" src="https://www.wikipedia.org/" />
//     <embed id="yelp" src="https://www.yelp.com/" width="640" height="480"/>
//     <embed id="google" src=" https://www.google.com/"width="640" height="480" />
//     <div id="options-box">
//       <input checked="checked" name="highlight" type="radio" value="true" />Highlighter<br/>
//       <input name="highlight" type="radio" value="true" />UnHighlighter
//       <br />
//       <button>Save</button>
//     </div>
//   </div>
// );

export default Noteit;
