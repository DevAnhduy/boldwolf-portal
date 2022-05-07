import api from "../../api/index.api";
import BlogTypes from "./blog.types";

export const onGetAllBlog = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack } = payload;
    try {
      const result = await api.blogApi.getAll({ token });
      dispatch({
        type: BlogTypes.GET_ALL,
        payload: result,
      });
      if (fCallBack) {
        fCallBack(true);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

export const onGetBlogDetail = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.blogApi.getDetail({ token, data });

      if (fCallBack) {
        fCallBack(true, result.data);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

export const onCreateBlog = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.blogApi.add({ token, data });
      // console.debug("rs: ", result)
      dispatch({
        type: BlogTypes.ADD,
        payload: result.data,
      });

      if (fCallBack) {
        fCallBack(true);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

export const onUpdateBlog = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.blogApi.update({ token, data });
      dispatch({
        type: BlogTypes.UPDATE,
        payload: result.data,
      });

      if (fCallBack) {
        fCallBack(true);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

export const onDeleteBlog = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      await api.blogApi.remove({ token, data });
      dispatch({
        type: BlogTypes.DELETE,
        payload: { id: data },
      });

      if (fCallBack) {
        fCallBack(true);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};
