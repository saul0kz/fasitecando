import React from "react";
import { HashRouter as Routes, Switch, Route } from "react-router-dom";
import Home from "./views/home/";
import Header from "./components/header/";
import UserView from "./views/user/view";

function Main() {
  return (
    <Routes>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/:id" component={UserView} />
      </Switch>
    </Routes>
  );
}

export default Main;
