import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Avatar from "react-avatar";
// import LeftMenu from './LeftMenu';
import MenuButton from "./MenuButton";
import { Store } from "../store/store";

const mainStyle = css`
  display: flex;
  flex-direction: row;
  background-color: white;
  color: dark-grey;
  font-size: 24px;
  height: 100px;
  align-items: center;
  padding: 0px 25px;
`;

const spacerStyle = css`
  flex: 1 1 auto;
`;

function TopMenu(): JSX.Element {
  const { state } = React.useContext(Store);
  const [userInfo, setUserInfo] = useState<any>({});

  React.useEffect(() => {
    setUserInfo(state.user);
  }, [state.user]);

  function logout() {
    state.keycloak.logout();
  }

  return (
    <div
      css={(theme) =>
        css`
          ${mainStyle};
          background-color: ${theme.primaryBGColor};
          color: ${theme.primaryTextColor};
        `
      }
    >
      <div>
        <MenuButton></MenuButton>
      </div>
      <div>The Todo Project</div>
      <div css={spacerStyle} />
      <div>
        <button onClick={logout}>Logout</button>{" "}
      </div>
      <div>
        <Avatar
          round={true}
          size="60"
          color="#EFEFEF"
          fgColor="black"
          name={userInfo?.name}
        />
      </div>
    </div>
  );
}

export default TopMenu;
