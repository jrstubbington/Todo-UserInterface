// import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import TopMenu from "./TopMenu";
// import LeftMenu from './LeftMenu';
// import {BrowserRouter as Router} from 'react-router-dom';
import Content from "./Content";

const mainStyle = css`
  display: flex;
  flex-flow: column;
  background-color: #efefef;
  height: 100%;
  // height: 100vh;
`;

function HomePage(): JSX.Element {
  return (
    <div css={mainStyle}>
      <TopMenu />
      <Content />
    </div>
  );
}

export default HomePage;
