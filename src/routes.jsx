import React from "react";
import { HashRouter as Routes, Switch, Route } from "react-router-dom";
import Home from "./views/home/";

function Main() {
  return (
    <Routes>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Routes>
  );
}

export default Main;
