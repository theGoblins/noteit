import React, { PropTypes } from "react";
import { withRouter } from 'react-router-dom';

const Sign = props => {

  // console.log('props: ', props);
  let submit = props.verifyUser;
  let text = 'Log in:';
  if (props.label === "sign") {
    text = 'Sign up:';
    submit = props.createUser;
  };
  const cb = () => props.history.push('note');

  return (
    <div id="log">
      <form class="user-form" onSubmit={(e) => submit(e, cb)}>
        <label>{text}</label><br />
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
      <br />
    </div>
  );
};

export default Sign;
