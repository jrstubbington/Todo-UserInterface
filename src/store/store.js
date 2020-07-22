import React from "react";

export const Store = React.createContext();

const initialState = {
  tasks: [],
  users: [],
  workspaces: [],
  selected_workspace: undefined,
  categories: [],
  selected_category: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "DELETE_TASK": {
      let temp_tasks = state.tasks;
      temp_tasks.remove(action.payload);
      return { ...state, tasks: temp_tasks };
    }
    case "FETCH_TASK_DATA":
      return { ...state, tasks: action.payload };
    case "FETCH_USER_DATA":
      return { ...state, users: action.payload };
    case "FETCH_USER_INFO":
      return { ...state, user: action.payload };
    // case "SET_BEARER_TOKEN":
    //   return { ...state, bearer_token: action.payload };
    case "SET_KEYCLOAK":
      return { ...state, keycloak: action.payload };
    case "SET_AUTHENTICATED":
      return { ...state, authenticated: action.payload };
    case "FETCH_WORKSPACE_DATA":
      return { ...state, workspaces: action.payload };
    case "SET_SELECTED_WORKSPACE":
      return { ...state, selected_workspace: action.payload };
    case "FETCH_CATEGORIES_DATA":
      return { ...state, categories: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selected_category: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
