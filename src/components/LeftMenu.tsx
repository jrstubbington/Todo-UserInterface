import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { slide as Menu } from "react-burger-menu";

const mainStyle = css`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  color: white;
  font-size: 24px;
  width: 100px;
`;

function LeftMenu(): JSX.Element {
  // const showSettings =>  (event) {
  //     event.preventDefault();

  // }

  return (
    <Menu>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
    </Menu>
  );
}

export default LeftMenu;
