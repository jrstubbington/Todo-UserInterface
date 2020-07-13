import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import TaskContainer from './TaskContainer';
// import LeftMenu from './LeftMenu';
// import {Route} from 'react-router-dom';
import { format } from "date-fns";
import {
  TaskManagementApi,
  ResponseContainerTaskDto,
  TaskDto,
  TaskCreationRequest,
} from "taskServiceApi";
import { useHistory } from "react-router-dom";
import { Store } from "../store/store";

// const mainStyle = css`
//     display: flex;
//     flex-direction: row;
//     flex: 1 1 auto;
//     padding: 25px 25px;
// `

type TestProps = {
  userUuid: string;
  workspaceUuid: string;
};

function Test(): JSX.Element {
  const history = useHistory();
  const { state, dispatch } = React.useContext(Store);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>({});

  React.useEffect(() => {
    setUserInfo(state.user);
  }, [state.user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskManagementApi = new TaskManagementApi();

    console.log("SUBMIT ID: " + userInfo.sub);

    const task: TaskDto = {
      name: title,
      description: description,
      status: "fuck",
      createdByUserUuid: userInfo?.sub,
      assignedToUserUuid: userInfo?.sub,
      workspaceUuid: "292578fe-35de-45dc-891b-7438409a0942",
      priority: 0,
      reminderDate: startDate,
    };

    const taskCreationRequest: TaskCreationRequest = {
      task: task,
      categoryUuid: "69c0f95e-60fc-4fda-8122-55feddaba33a",
    };

    const requestHeaders: any = {
      headers: {
        Authorization: "Bearer " + state.keycloak?.token,
      },
    };

    taskManagementApi
      .createTask(taskCreationRequest, requestHeaders)
      .then((taskResponse: ResponseContainerTaskDto) => {
        history.push("/");
        const tempArray = state.tasks;
        tempArray.push(taskResponse.data ? taskResponse.data[0] : undefined);
        return dispatch({
          type: "FETCH_USER_DATA",
          payload: tempArray,
        });
      });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label
        css={(theme) => css`
          color: ${theme.primaryTextColor};
        `}
      >
        Title:
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label
        css={(theme) => css`
          color: ${theme.primaryTextColor};
        `}
      >
        Description:
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label
        css={(theme) => css`
          color: ${theme.primaryTextColor};
        `}
      >
        Reminder Date:
        <input
          type="datetime-local"
          // onSubmit={testSubmit}
          onChange={(date) => {
            setStartDate(
              date.target.value
                ? new Date(date.target.value.toString())
                : undefined
            );
          }}
          value={startDate ? format(startDate, "yyyy-MM-dd'T'HH:mm") : ""}
          min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
        />
        <button
          type="button"
          onClick={() => {
            setStartDate(undefined);
          }}
          // hidden={!isEditing}
        >
          clear
        </button>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Test;
