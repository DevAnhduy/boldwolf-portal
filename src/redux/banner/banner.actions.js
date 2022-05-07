import api from "../../api/index.api";
import BannerTypes from "./banner.types";

export const onGetAllBannerWithType = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack } = payload;
    try {
      const result = await api.bannerApi.getAllWithType({ token });
      dispatch({
        type: BannerTypes.GET_ALL,
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

export const onGetAllBanner = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack } = payload;
    try {
      const result = await api.bannerApi.getAllBanner({ token });
      dispatch({
        type: BannerTypes.GET_ALL,
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

export const onGetBannerDetailWithReference = (payload) => {
  return async (dispatch) => {
    const { token, data, fCallBack } = payload;
    try {
      const result = await api.bannerApi.getBannerDetailWithReference({
        token,
        data,
      });
      if (fCallBack) {
        fCallBack(true, result);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};
export const addBanner = (payload) => {
  return async (dispatch) => {
    const { token, data, fCallBack } = payload;
    try {
      const result = await api.bannerApi.add({ token, data });
      if (result.data.type) {
        // common banner
        dispatch({
          type: BannerTypes.UPDATE,
          payload: result.data,
        });
      }

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

export const updateBanner = (payload) => {
  return async (dispatch) => {
    const { token, data, fCallBack } = payload;
    try {
      const result = await api.bannerApi.updateBanner({ token, data });
      dispatch({
        type: BannerTypes.UPDATE,
        payload: result.data,
      });
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
