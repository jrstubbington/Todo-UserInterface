import React, { CSSProperties } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// import { UserManagementApi, UserDto, ResponseContainerUserDto, ErrorDetails, WorkspaceManagementApi, ResponseContainerWorkspaceDto, WorkspaceDto } from 'accountServiceApi';
import { TaskDto, CategoryDto } from "taskServiceApi";
import Task from "./Task";
import { Store } from "../store/store";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Workspace from "./Workspace";
import { useHistory } from "react-router";

const GUTTER_SIZE = 15;

function WorkspaceContainer(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const history = useHistory();

  const selectWorkspace = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    dispatch({
      type: "SET_SELECTED_WORKSPACE",
      payload: id,
    });
    history.push("/category");
  };

  const Row = ({
    index,
    style,
    data,
  }: {
    index: number;
    style: CSSProperties;
    data: TaskDto[];
  }) => {
    const task: TaskDto = data[index];

    const selectedCategory: CategoryDto = state.categories.filter(
      (category: CategoryDto) => {
        return category.uuid === task.categoryUuid;
      }
    )[0];

    // style is passed by the List component to give our Row the correct dimensions
    return (
      <div style={style} key={index}>
        <Workspace
          id={task.uuid ? task.uuid : ""}
          clickHandler={selectWorkspace}
        />
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          itemData={state.workspaces}
          itemCount={state.workspaces.length}
          itemSize={100 + GUTTER_SIZE}
          width={width}
          height={height}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
}

export default WorkspaceContainer;
