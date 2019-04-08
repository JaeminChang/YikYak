import axios from "axios";
import * as helpers from "./serviceHelpers";

const insertUser = payload => {
  const config = {
    method: "POST",
    url: "http://localhost:8080/user",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const updatePassword = payload => {
  const config = {
    method: "PUT",
    url: "http://localhost:8080/user",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const selectUser = payload => {
  const config = {
    method: "GET",
    url:
      "http://localhost:8080/user?userName=" +
      payload.userName +
      "&password=" +
      payload.password,
    crossdomain: true,
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { insertUser, selectUser, updatePassword };
