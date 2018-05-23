document.addEventListener("DOMContentLoaded", function() {

let googleID, firstName, email, token;
const userInfoBox = document.getElementById('user-display');

// comment below out for testing -------
  chrome.identity.getAuthToken({ interactive: true }, (auth_token) => {
    if (chrome.runtime.lastError) {
      alert(chrome.runtime.lastError.message);
      return;
    }
    token = auth_token;
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + auth_token)
      .then(resp => resp.json())
      .then(resp => {
        console.log('Identity response: ', resp)
        googleID = resp.id;
        firstName = resp.given_name;
        email = resp.email;
        userInfoBox.textContent = `Welcome, ${resp.given_name}!`;
        userInfoBox.style.display = 'block';
      })
      .catch(err => {
        userInfoBox.textContent = `Welcome, Guest!`;
        userInfoBox.style.display = 'block';
        console.error(err);
      });
  });
// ------ comment above out for testing

});
