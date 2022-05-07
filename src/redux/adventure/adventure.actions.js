// eslint-disable-next-line no-unused-vars
import AdventureTypes from "./adventure.types";
import api from "../../api/index.api";

export const onGetInfoAdventure = (payload) => {
  return async (dispatch) => {
    const { fCallBack, token } = payload;
    try {
      const rs = await api.adventureApi.getInfo({ token });
      dispatch({
        type: AdventureTypes.GET_INFO,
        payload: rs,
      });

      if (fCallBack) {
        fCallBack(true, rs);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

export const onUpdateInfoAdventure = (payload) => {
  return async (dispatch) => {
    const { fCallBack, token, data } = payload;
    try {
      const rs = await api.adventureApi.updateInfo({ data, token });
      dispatch({
        type: AdventureTypes.UPDATE_INFO,
        payload: rs,
      });
      if (fCallBack) {
        fCallBack(true, rs);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

// adventure type
export const onGetAllAdventure = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack } = payload;
    try {
      const result = await api.adventureApi.getAll({ token });
      dispatch({
        type: AdventureTypes.GET_ALL_ADVENTURE_TYPE,
        payload: result,
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

export const onGetAdventureDetailByType = (payload, type) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.adventureApi.getDetail({ token, data }, type);

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

export const onCreateAdventureByType = (payload, type) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.adventureApi.add({ token, data }, type);
      // console.log("rs: ", result)
      dispatch({
        type: AdventureTypes.ADD_ADVENTURE_TYPE,
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

export const onUpdateAdventureByType = (payload, type) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.adventureApi.update({ token, data }, type);
      // console.log("rs: ", result)
      dispatch({
        type: AdventureTypes.UPDATE_ADVENTURE_TYPE,
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

export const onDeleteAdventureByType = (payload, type) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      await api.adventureApi.remove({ token, data }, type);

      dispatch({
        type: AdventureTypes.DELETE_ADVENTURE_TYPE,
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

export const onGetAllAdventureTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack } = payload;
    try {
      const result = await api.adventureApi.getAdventureTour({ token });

      dispatch({
        type: AdventureTypes.GET_ADVENTURE_TOUR,
        payload: result.data,
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

export const onGetAdventureTourDetail = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.adventureApi.getAdventureTourDetail({
        token,
        data,
      });

      const images = result.data.adventure_tour_image.map((item) => item.image);
      const reviews = result.data.adventure_tour_review.map((item) => {
        const temp = item.review;
        delete item.review;
        return { ...item, ...temp };
      });

      delete result.data.tour_review;

      dispatch({
        type: AdventureTypes.GET_DETAIL_SUCCESS,
        payload: {
          ...result.data,
          reviews,
          images,
          // location: (4) [description, description_en, longitude, latitude]
          location: {
            description: result.data.location[0],
            description_en: result.data.location[1],
            lng: result.data.location[2],
            lat: result.data.location[3],
          },
        },
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

export const onCreateAdventureTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.adventureApi.addAdventureTour({ data, token });

      // console.log("rs: ", result)
      dispatch({
        type: AdventureTypes.ADD_ADVENTURE_TOUR,
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

export const onUpdateAdventureTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.adventureApi.updateAdventureTour({
        data,
        token,
      });
      // console.log("rs: ", result)
      dispatch({
        type: AdventureTypes.UPDATE_ADVENTURE_TOUR,
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

export const onDeleteAdventureTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      await api.adventureApi.removeAdventureTour({ data, token });

      dispatch({
        type: AdventureTypes.DELETE_ADVENTURE_TOUR,
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

export const onUpdateUnsaveTour = (payload) => ({
  type: AdventureTypes.UPDATE_UNSAVE,
  payload,
});

export const onUpdateCurrentStep = (payload) => ({
  type: AdventureTypes.UPDATE_CURRENT_STEP,
  payload,
});

export const onDeleteUnsaveTour = ({ currentTour, token }) => {
  return async (dispatch) => {
    try {
      if (!currentTour.id) {
        // mode create
        const { images, reviews } = currentTour;
        let requests = [];
        // delete all images and reviews
        if (images && images.length > 0) {
          images.map((item) =>
            requests.push(api.uploadApi.deleteImg({ token, id: item.id }))
          );
        }
        if (reviews && reviews.length > 0) {
          reviews.map((item) =>
            requests.push(api.reviewApi.remove({ token, data: item.id }))
          );
        }
        if (requests.length > 0) {
          await Promise.all(requests);
        }
      }

      dispatch({
        type: AdventureTypes.DELETE_UNSAVE,
      });
    } catch (err) {}
  };
};
