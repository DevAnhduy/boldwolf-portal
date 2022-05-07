import { METHOD_AXIOS } from "../utils/constant";
import { API_URL } from "../utils/constant";
const axios = require("axios");

export class BaseApi {
  constructor(pathUrl) {
    this.URL = `${API_URL}/portal/${pathUrl}`;
  }
  abstract = async (path, data, token, method = METHOD_AXIOS.GET) => {
    const config = {
      method,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          }
        : {
            "Content-Type": "application/json;charset=UTF-8",
          },
      url: `${this.URL}${path}`,
      data,
    };
    return axios(config)
      .then(function (response) {
        //handle success
        return response.data;
      })
      .catch(function (response) {
        // handle error
        throw response;
      });
  };

  get = async (path, data, token) =>
    await this.abstract(path, data, token, METHOD_AXIOS.GET);
  post = async (path, data, token) =>
    await this.abstract(path, data, token, METHOD_AXIOS.POST);
  put = async (path, data, token) =>
    await this.abstract(path, data, token, METHOD_AXIOS.PUT);
  delete = async (path, data, token) =>
    await this.abstract(path, data, token, METHOD_AXIOS.DELETE);

  getAll = async ({ token }) => {
    const rs = await this.get("/", undefined, token);
    return rs.data;
  };
  getDetail = async ({ data: id, token }) => {
    const rs = await this.get(`/${id}`, undefined, token);
    return rs;
  };
  add = async ({ data, token }) => {
    const rs = await this.post("/", data, token);
    return rs;
  };
  update = async ({ data, token }) => {
    const { id, ...otherData } = data;
    const rs = await this.put(`/${id}`, { ...otherData }, token);
    return rs;
  };
  remove = async ({ data: id, token }) => {
    const rs = await this.delete(`/${id}`, undefined, token);
    return rs;
  };
}
