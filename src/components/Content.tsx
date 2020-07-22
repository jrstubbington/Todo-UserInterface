/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import TaskContainer from "./TaskContainer";
// import LeftMenu from './LeftMenu';
import { Route, Switch } from "react-router-dom";
import Test from "./Test";
import WorkspaceContainer from "./WorkspaceContainer";
import CategoryContainer from "./CategoryContainer";

const mainStyle = css`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  padding: 25px 25px;
`;

function Content(): JSX.Element {
  return (
    <div
      css={(theme) => css`
        ${mainStyle}
        background-color: ${theme.secondaryBGColor}
        `}
    >
      <Switch>
        <Route exact path="/">
          <TaskContainer />
        </Route>
        <Route exact path="/workspace">
          <WorkspaceContainer />
        </Route>
        <Route exact path="/category">
          <CategoryContainer />
        </Route>
        <Route exact path="/createTask">
          <Test />
        </Route>
      </Switch>
      {/* <TaskContainer/> */}
    </div>
  );
}

export default Content;
