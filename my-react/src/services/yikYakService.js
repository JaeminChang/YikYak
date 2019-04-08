import axios from "axios";
import * as helpers from "./serviceHelpers";

const insert = data => {
  const config = {
    method: "POST",
    url: "http://localhost:8080/api/yikYak",
    data: data,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const update = data => {
  const config = {
    method: "PUT",
    url: "http://localhost:8080/api/yikYak",
    data: data,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const deleteYik = id => {
  const config = {
    method: "DELETE",
    url: "http://localhost:8080/api/yikYak",
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const deleteComment = id => {
  const config = {
    method: "DELETE",
    url: "http://localhost:8080/api/comment?id=" + id,
    data: id,
    crossdomain: true
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const selectAll = () => {
  const config = {
    method: "GET",
    url: "http://localhost:8080/api/yikYak",
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const selectById = data => {
  const config = {
    method: "GET",
    url: "http://localhost:8080/api/yikYak/getPost?id=" + data,
    crossdomain: true,
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const selectByPostId = data => {
  const config = {
    method: "GET",
    url: "http://localhost:8080/api/comment?id=" + data,
    crossdomain: true,
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const insertComment = data => {
  const config = {
    method: "POST",
    url: "http://localhost:8080/api/comment",
    crossdomain: true,
    data: data,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export {
  insert,
  update,
  deleteYik,
  selectAll,
  selectById,
  selectByPostId,
  insertComment,
  deleteComment
};
