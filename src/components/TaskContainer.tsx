import React, { CSSProperties } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// import { UserManagementApi, UserDto, ResponseContainerUserDto, ErrorDetails, WorkspaceManagementApi, ResponseContainerWorkspaceDto, WorkspaceDto } from 'accountServiceApi';
import { TaskDto, CategoryDto } from "taskServiceApi";
import Task from "./Task";
import { Store } from "../store/store";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const GUTTER_SIZE = 15;

// const mainStyle = css`
//     flex: 1 1 auto;
//     display: flex;
//     flex-direction: column;
//     color: black;
//     font-size: 24px;

// `

function TaskContainer(): JSX.Element {
  const { state } = React.useContext(Store);
  // const { state, dispatch } = React.useContext(Store);
  // const [page, setPage] = useState(0)
  // const [user, setUsers] = useState<UserDto | undefined>(undefined);
  // const [categories, setCategories] = useState<Map<String, CategoryDto>>(new Map());
  // const [tasks, setTasks] = useState<TaskDto[]>([]);
  // const [last, setLast] = useState(false);
  // const userUuid = "bbad57b3-9f06-4a61-b4d0-fba5ff2bd771";
  // const workspaceUuid = "292578fe-35de-45dc-891b-7438409a0942"

  //TODO: Move this to a higher state?
  // useEffect(() => {
  //     const userManagementApi = new UserManagementApi();
  //     const categoryApi = new CategoryManagementApi();

  //     // userManagementApi.getUserByUUID(userUuid)
  //     //   .then((value: ResponseContainerUserDto) => {
  //     //     setUsers(value?.data?.filter(x => x.uuid === userUuid)[0]);

  //     //     if (value.last) {
  //     //       setLast(true);
  //     //     }
  //     //   })
  //     //   .catch((value: Response) => /* what is suppose to happen here IF NOT a console.error?!? */ console.error(value));

  //     // setTasks(state.tasks)

  //     userManagementApi.getUserWorkspaces(userUuid)
  //     .then((value: ResponseContainerWorkspaceDto) => {
  //       const workspace = value?.data?.filter(x => x.status === WorkspaceDto.StatusEnum.ACTIVE)[0];
  //       const workspaceUuid = workspace?.uuid;
  //       if (workspaceUuid !== undefined) {
  //         categoryApi.getCategoryByWorkspaceUuid(workspaceUuid)
  //         .then((value: ResponseContainerWorkspaceDto) => {
  //           setCategories(value.data);
  //         })
  //       }
  //     })
  //   }, [state.tasks])

  // React.useEffect(() => {
  //   setCategories(state.categories);
  // }, [state.categories]);

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
        <Task
          id={task.uuid ? task.uuid : ""}
          label={task.name ? task.name : ""}
          description={task.description ? task.description : ""}
          color={selectedCategory?.color ? selectedCategory?.color : "#AAAAAA"}
          dueDate={task.reminderDate}
          userUuid={task.assignedToUserUuid ? task.assignedToUserUuid : ""}
          workspaceUuid={task.workspaceUuid ? task.workspaceUuid : ""}
        />
      </div>
    );
  };

  // const innerElementType = forwardRef(({ style, ref, ...rest }: {style: CSSProperties, rest: ReactNode, ref: string}) => (
  //   <div
  //     ref={ref}
  //     style={{
  //       ...style,
  //       paddingLeft: 0,
  //       paddingTop: GUTTER_SIZE
  //     }}
  //     {...rest}
  //   />
  // ));

  // const innerElementType = forwardRef((props, ref) => (
  //   <div
  //     ref={ref}
  //     style={{
  //       ...props.style,
  //       paddingLeft: 0,
  //       paddingTop: GUTTER_SIZE
  //     }}
  //     {...rest}
  //   />
  // ));

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          itemData={state.tasks}
          itemCount={state.tasks.length}
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

export default TaskContainer;
