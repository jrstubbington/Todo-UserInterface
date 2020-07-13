import React, { useState } from "react";
// import fetchIntercept from "fetch-intercept";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router } from "react-router-dom";
import { Store } from "../store/store";
import HomePage from "./HomePage";
import { ThemeProvider } from "emotion-theming";
// import { UserManagementApi } from "accountServiceApi";
import { TaskManagementApi, CategoryManagementApi } from "taskServiceApi";
import Keycloak, { KeycloakInstance } from "keycloak-js";
import Theme from "./interfaces/Theme";

const lightTheme: Theme = {
  primaryBGColor: "white",
  secondaryBGColor: "#D9D9D9",
  primaryTextColor: "black",
  secondaryTextColor: "red",
};

const darkTheme: Theme = {
  primaryBGColor: "#585858",
  secondaryBGColor: "#2D2D2D",
  primaryTextColor: "white",
  secondaryTextColor: "red",
};

// var browserHistory = ReactRouter.browserHistory;

export default function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const [isDark, setIsDark] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [keycloak, setKeycloak] = useState<KeycloakInstance | undefined>(
    undefined
  );
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  // const [bearer_token, setBearerToken] = useState<string | undefined>(
  //   undefined
  // );
  // const [loaded, setLoaded] = useState<boolean>(false);

  // const userUuid = "bbad57b3-9f06-4a61-b4d0-fba5ff2bd771";
  const taskManagementApi = new TaskManagementApi();
  // const userManagementApi = new UserManagementApi();
  const categoriesManagementApi = new CategoryManagementApi();

  // fetchIntercept.register({
  //   request: function (url, config) {
  //     // const { state, dispatch } = React.useContext(Store);
  //     // const withDefaults = Object.assign({}, config);
  //     // withDefaults.headers = new Headers({
  //     //   AUTHORIZATION: `Bearer ${keycloak?.token}`,
  //     // });
  //     // withDefaults.headers = {
  //     //   Authorization: "Bearer " + bearer_token,
  //     //   credentials: "include",
  //     // };
  //     //NOTE: this really should be an HTTPONLY cookie with CSRF enabled, but for demo purposes the token will be in the application state
  //     console.log("TOKEN?: " + state.bearer_token);
  //     const withDefaults = Object.assign({}, config);
  //     withDefaults.headers = {
  //       ...withDefaults.headers,
  //       credentials: "include",
  //       // Authorization: "Bearer " + bearer_token,
  //     };

  //     console.log("HEADERS: " + JSON.stringify(withDefaults));

  //     // let requestHeaders: any = {};
  //     // if (url.startsWith("http://localhost:80")) {
  //     //   console.log("RUNNING INTERCEPT TO URL: " + url);
  //     //   console.log("BEARER TOKEN: " + bearer_token);
  //     //   requestHeaders = {
  //     //     headers: {
  //     //       Authorization: "Bearer " + bearer_token,
  //     //     },
  //     //   };
  //     //   console.log("HEADERS?: " + JSON.stringify(requestHeaders));
  //     // }

  //     return [url, withDefaults];
  //   },

  //   requestError: function (error) {
  //     // Called when an error occured during another 'request' interceptor call
  //     return Promise.reject(error);
  //   },

  //   response: function (response) {
  //     // Modify the reponse object
  //     return response;
  //   },

  //   responseError: function (error) {
  //     // Handle an fetch error
  //     return Promise.reject(error);
  //   },
  // });

  React.useEffect(() => {
    if (isDark) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, [isDark]);

  window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => {
    if (e.matches) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  });

  const fetchTaskDataAction = async () => {
    // const taskManagementApi = new TaskManagementApi(); //{accessToken: keycloak?.token}
    //TODO move to fetch intercept
    const requestHeaders: any = {
      headers: {
        Authorization: "Bearer " + keycloak?.token,
      },
    };
    //the below user id isn't used, just need a place holder to avoid a format exception
    const data = taskManagementApi.getTaskListByUserUuid(
      "bbad57b3-9f06-4a61-b4d0-fba5ff2bd771",
      requestHeaders
    );
    const dataJSON = (await data).data;
    return dispatch({
      type: "FETCH_TASK_DATA",
      payload: dataJSON,
    });
  };

  const fetchCategoriesDataAction = async () => {
    // const taskManagementApi = new TaskManagementApi(); //{accessToken: keycloak?.token}
    //TODO move to fetch intercept
    const requestHeaders: any = {
      headers: {
        Authorization: "Bearer " + keycloak?.token,
      },
    };
    const data = categoriesManagementApi.getCategoryByWorkspaceUuid(
      "292578fe-35de-45dc-891b-7438409a0942",
      requestHeaders
    );
    const dataJSON = (await data).data;
    return dispatch({
      type: "FETCH_CATEGORIES_DATA",
      payload: dataJSON,
    });
  };

  // const fetchUserDataAction = async () => {
  //   //TODO move to fetch intercept
  //   // const headers = new Headers();
  //   // headers.set("Authorization", "Bearer " + keycloak?.token?.toString());
  //   const requestHeaders: any = {
  //     headers: {
  //       Authorization: "Bearer " + keycloak?.token,
  //     },
  //   };
  //   const data = userManagementApi.getUserByUUID(state.user.id, requestHeaders);
  //   const dataJSON = (await data).data;
  //   return dispatch({
  //     type: "FETCH_USER_DATA",
  //     payload: dataJSON,
  //   });
  // };

  React.useEffect(() => {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      setKeycloak(keycloak);
      setAuthenticated(authenticated);
      dispatch({
        type: "SET_KEYCLOAK",
        payload: keycloak,
      });
      dispatch({
        type: "SET_AUTHENTICATED",
        payload: authenticated,
      });
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (keycloak && authenticated) {
      // if (keycloak?.token !== undefined) {
      //   setBearerToken(keycloak?.token);
      // }

      keycloak
        .loadUserInfo()
        .then((userInfo) => {
          return dispatch({
            type: "FETCH_USER_INFO",
            payload: userInfo,
          });
        })
        .catch((e) => alert("couldn't load user data: " + e));

      dispatch({
        type: "SET_BEARER_TOKEN",
        payload: keycloak?.token,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  React.useEffect(() => {
    state.user !== undefined && authenticated && fetchTaskDataAction();
    state.user !== undefined && authenticated && fetchCategoriesDataAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user, authenticated]);

  if (keycloak) {
    if (authenticated) {
      return (
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <Router>
              <HomePage />
            </Router>
          </ThemeProvider>
        </React.Fragment>
      );
    } else return <div>Unable to authenticate!</div>;
  }
  return <div>Initializing Keycloak...</div>;
}
