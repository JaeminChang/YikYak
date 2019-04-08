import { ADD_USER, GET_USER, LOGOUT_USER, UPDATE_USER } from "./types";
import * as userService from "../services/userService";

const insertUser = payload => {
  return dispatch => {
    return userService
      .insertUser(payload)
      .then(response => {
        dispatch(createPostSuccess(response));
      })
      .catch(error => {
        throw error;
      });
  };
};

const createPostSuccess = response => {
  return {
    type: ADD_USER,
    payload: {
      userName: response.userName,
      password: response.password
    }
  };
};

const updatePassword = payload => {
  return dispatch => {
    return userService
      .updatePassword(payload)
      .then(response => {
        dispatch(updatePasswordSuccess(response));
      })
      .catch(error => {
        throw error;
      });
  };
};
const updatePasswordSuccess = response => {
  return {
    type: UPDATE_USER,
    payload: {
      userName: response.userName,
      password: response.password
    }
  };
};

const getUser = payload => {
  return dispatch => {
    return userService
      .selectUser(payload)
      .then(response => {
        dispatch(getUserSuccess(response.recordset));
      })
      .catch(error => {
        throw error;
      });
  };
};

const getUserSuccess = data => {
  return {
    type: GET_USER,
    payload: {
      userName: data[0].UserName,
      password: data[0].Password,
      image: data[0].FileUrl
    }
  };
};

const logout = () => {
  return {
    type: LOGOUT_USER,
    payload: new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    })
  };
};

export {
  insertUser,
  createPostSuccess,
  getUser,
  getUserSuccess,
  logout,
  updatePassword
};
