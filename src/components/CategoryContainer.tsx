import React, { CSSProperties } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// import { UserManagementApi, UserDto, ResponseContainerUserDto, ErrorDetails, WorkspaceManagementApi, ResponseContainerWorkspaceDto, WorkspaceDto } from 'accountServiceApi';
import { TaskDto, CategoryDto } from "taskServiceApi";
import { Store } from "../store/store";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Category from "./Category";
import { useHistory } from "react-router";

const GUTTER_SIZE = 15;

function CategoryContainer(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const history = useHistory();

  const selectCategory = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    console.log("SELECTED CATEGORY: " + id);
    dispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: id,
    });
    history.push("/");
  };

  const Row = ({
    index,
    style,
    data,
  }: {
    index: number;
    style: CSSProperties;
    data: CategoryDto[];
  }) => {
    const category: CategoryDto = data[index];

    // style is passed by the List component to give our Row the correct dimensions
    return (
      <div style={style} key={index}>
        <Category
          id={category.uuid ? category.uuid : ""}
          clickHandler={selectCategory}
        />
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          itemData={state.categories}
          itemCount={state.categories.length}
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

export default CategoryContainer;
