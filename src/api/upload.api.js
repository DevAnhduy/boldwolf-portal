import { API_URL } from "../utils/constant";
const axios = require("axios");

export class UploadApi {
  uploadImg = async ({ token, data }) => {
    const formData = new FormData();
    formData.append("image", data);

    return axios
      .post(`${API_URL}/portal/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {});
  };

  uploadMultiImg = async ({ token, data }) => {
    const formData = new FormData();
    Object.keys(data).map((item) => {
      // multi img
      if (item !== "length") {
        formData.append("image", data[item]);
      }
      return null;
    });

    return axios
      .post(`${API_URL}/portal/upload/multi`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {});
  };

  uploadMultiTeamBuildingImg = async ({ token, data }) => {
    const formData = new FormData();
    Object.keys(data).map((item) => {
      // multi img
      if (item !== "length") {
        formData.append("image", data[item]);
      }
      return null;
    });

    return axios
      .post(`${API_URL}/portal/upload/team-building/multi`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {});
  };

  updateImg = async ({ token, data, id }) => {
    const formData = new FormData();
    formData.append("image", data);

    return axios
      .put(`${API_URL}/portal/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {});
  };
  deleteImg = async ({ token, id }) => {
    return axios
      .delete(`${API_URL}/portal/upload/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {});
  };

  deleteTeamBuildingImg = async ({ token, id }) => {
    return axios
      .delete(`${API_URL}/portal/upload/team-building/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {});
  };

  deleteTourImg = async ({ token, id }) => {
    return axios
      .delete(`${API_URL}/portal/upload/tour/${id}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {});
  };
}
