import React from "react";
import { HashRouter as Routes, Switch, Route } from "react-router-dom";
import Home from "./views/home/";
import Header from "./components/header/";
import UserEdit from "./views/user/edit";

function Main() {
  return (
    <Routes>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/:id" component={UserEdit} />
      </Switch>
    </Routes>
  );
}

export default Main;
