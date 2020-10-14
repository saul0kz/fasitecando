import React from "react";
import { Header } from "semantic-ui-react";


function Title(props) {
  return (
    <Header as='h2'>{props.title}</Header>
  );
}

export default Title;
