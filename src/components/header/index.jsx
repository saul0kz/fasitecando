import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Header(props) {
  const handleItemClick = () => {};

  return (
    <Menu>
      <Link to="/">
        <Menu.Item name="Home" onClick={handleItemClick}>
          Home{" "}
        </Menu.Item>
      </Link>
    </Menu>
  );
}

export default Header;
