import React from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';


import Login from "./containers/Login.jsx";
import Home from "./containers/Home.jsx";
import Noteit from "./components/Noteit.jsx";
import EditPage from "./containers/EditPage.jsx";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/note" component={Noteit} />
    </Switch>
  </main>
);

export default Main;
