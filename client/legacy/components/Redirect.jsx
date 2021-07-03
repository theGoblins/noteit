import { withRouter } from 'react-router-dom';
import React from 'react';

const Redirect = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('note') }}
  >
    Click Me!
  </button>
))

export default Redirect;
