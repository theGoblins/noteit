// Enter an API key from the Google API Console:
//   https://console.developers.google.com/apis/credentials
const apiKey = 'AIzaSyB2tqI7KyQO7isaI7eivfu61cu02MMll1w';

// Enter the API Discovery Docs that describes the APIs you want to
// access. In this example, we are accessing the People API, so we load
// Discovery Doc found here: https://developers.google.com/people/api/rest/
const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/plus/v1/rest"];

// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script.
const clientId = '616174675838-lhonhh213amr4hl1brlcq6ooa03h35lu.apps.googleusercontent.com';

// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
const scopes = 'https://www.googleapis.com/auth/plus.me';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const continueButton = document.getElementById('continue-button');

function initClient() {
  gapi.client.init({
    apiKey,
    discoveryDocs,
    clientId,
    scopes,
  }).then(() => {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
    continueButton.onclick = handleContinueClick;
  });
}

function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}


function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    makeApiCall();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function handleContinueClick (event) {
  window.location = 
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client.plus.people.get({
    'userId': 'me',
  }).then(function(resp) {
    console.log(resp);
    const p = document.createElement('p');
    const name = resp.result.name.givenName;
    const email = resp.result.emails[0].value;
    p.appendChild(document.createTextNode('Hello, '+name+'!'+' Your email is '+email+'.'));
    document.getElementById('content').appendChild(p);
  });
}

function postSignIn() {
  
}