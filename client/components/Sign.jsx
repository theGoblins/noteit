import React, { PropTypes } from "react";

const Sign = props => {
  let text = 'Log in:';
  if (props.label === "sign") text = 'Sign up:';
  return (
    <div id="log">
      <form class="user-form" onSubmit={props.createUser}>
        <label>{text}</label><br />
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sign;
