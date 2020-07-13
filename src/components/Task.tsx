import React, { useState, useEffect } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { TaskManagementApi, TaskDto } from "taskServiceApi";

import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const mainContainer = css`
  display: flex;
  flex-direction: row;
  font-size: 24px;
  height: 100px;
`;

const taskSection = css`
  flex: 0 1 30px;
  background-color: white;
  // color: black;
`;

const testing = css`
  //   border-size: 0.2px;
  //   border-color: grey;
  //   border-style: dashed;
`;

const descriptionCss = css`
  font-size: 0.6em;
`;

type CardProps = {
  id: string;
  label: string;
  description: string;
  color: string;
  dueDate: Date | undefined;
  userUuid: string;
  workspaceUuid: string;
};

function Task({
  id,
  label,
  description,
  color,
  dueDate,
  userUuid,
  workspaceUuid,
}: CardProps): JSX.Element {
  const taskManagementApi = new TaskManagementApi();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [internal_label, setLabel] = useState<string>(label);
  const [internal_description, setDescription] = useState<string>(description);
  const [startDate, setStartDate] = useState<Date | undefined>(
    dueDate ? new Date(dueDate) : undefined
  );
  const [tempDate, setTempDate] = useState<Date | undefined>(
    dueDate ? new Date(dueDate) : undefined
  );

  const testSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Submitting task");
    label = internal_label;
    description = internal_description;
    setIsEditing(false);
    setTempDate(startDate);

    const task: TaskDto = {
      uuid: id,
      name: internal_label,
      description: internal_description,
      status: "fuck",
      createdByUserUuid: userUuid,
      assignedToUserUuid: userUuid,
      workspaceUuid: workspaceUuid,
      priority: 0,
      reminderDate: startDate,
    };

    taskManagementApi.updateTask(task);
  };

  useEffect(() => {
    // console.log(dueDate)
    // // if (dueDate !== null && dueDate !== undefined) {
    // //     setStartDate(new Date(dueDate));
    // //     setTempDate(new Date(dueDate));
    // // }
    // else {
    //     setStartDate(undefined);
    //     setTempDate(undefined);
    // }
  }, [isEditing]);

  const changeEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setStartDate(tempDate);
    }
  };

  // const deleteTask = () => {
  //     taskManagementApi.deleteTask(id).then((task ) => {

  //     })
  // }

  return (
    <div id={id} css={mainContainer}>
      <div
        css={(theme) => css`
            color: ${theme.primaryLight};
            ${taskSection};
            ${testing}
            background-color: ${color};
        `}
      />

      <div
        css={(theme) => css`
                ${taskSection};
                ${testing};
                background-color: ${theme.primaryBGColor};
                display: flex;
                flex: 1 1 240px;
                flex-display: column
                padding: 10px 10px;
            `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            padding: 10px 10px;
          `}
        >
          <div
            css={(theme) => css`
              ${testing};
              color: ${theme.primaryTextColor};
            `}
          >
            {isEditing ? (
              <input
                defaultValue={internal_label}
                onChange={(e) => setLabel(e.target.value)}
              ></input>
            ) : (
              internal_label
            )}
          </div>
          <div
            css={(theme) => css`
              ${descriptionCss};
              ${testing};
              color: ${theme.primaryTextColor};
            `}
          >
            {isEditing ? (
              <input
                defaultValue={internal_description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            ) : (
              internal_description
            )}
          </div>
        </div>
        <div
          css={(theme) =>
            css`
              ${testing};
              min-width: 150px;
              padding-right: 0px;
              color: ${theme.primaryTextColor};
            `
          }
        >
          {/* Due Date: <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date? date : undefined)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    todayButton="Today"
                    // withPortal
                    filterDate={isInTheFuture}
                    popperPlacement="top-end"
                    popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: "-100px, 0px"
                        },
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: "viewport"
                        }
                      }}
                    // calendarContainer={MyContainer}
                /> */}
          {isEditing ? (
            <button
              onClick={(e) => {
                testSubmit(e);
              }}
            >
              SAVE
            </button>
          ) : null}
          <button
            onClick={() => {
              changeEditing();
            }}
          >
            {isEditing ? "CANCEL" : "EDIT"}
          </button>

          <input
            type="datetime-local"
            disabled={!isEditing}
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
            onClick={() => {
              setStartDate(undefined);
            }}
            hidden={!isEditing}
          >
            clear
          </button>
          {/* {isEditing? 
                    <button
                        onClick={e => {deleteTask()} }
                    >
                        DELETE
                    </button>
                :
                    null
                } */}
        </div>
      </div>
    </div>
  );
}

export default Task;
