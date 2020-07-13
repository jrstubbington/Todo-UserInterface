/** @jsx jsx */
import { jsx } from "@emotion/core";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

// const mainStyle = css`
//     flex: 1 1 auto;
//     display: flex;
//     flex-direction: column;
//     background-color: skyblue;
//     color: white;
//     font-size: 24px;
//     width: 100px;
// `

const styles = {
  bmBurgerButton: {
    position: "relative",
    width: "30px",
    height: "25px",
    margin: "10px",
    //   left: '30px',
    //   top: '36px'
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
    top: "24px",
    right: "24px",
  },
  bmCross: {
    //   background: '#bdc3c7',
    background: "#373a47",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    left: "0px",
    top: "0px",
  },
  bmMenu: {
    background: "white",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    //   width: '200px',
    right: "0",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    height: "0",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    top: "0px",
  },
};

function MenuButton(): JSX.Element {
  return (
    <Menu styles={styles}>
      <Link to={"/"}>Home</Link>
      <Link to={"/createTask/"}>Create New Task</Link>
      {/* <a id="preferences" className="menu-item" href="/">Preferences</a><br/> */}
      {/* <a id="about" className="menu-item" href="/about">About</a><br/> */}
    </Menu>
  );
}

export default MenuButton;
