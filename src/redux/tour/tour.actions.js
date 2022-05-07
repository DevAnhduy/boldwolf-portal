import api from "../../api/index.api";
import TourTypes from "./tour.types";

export const onGetAllTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack } = payload;
    try {
      const result = await api.tourApi.getAll({ token });
      dispatch({
        type: TourTypes.GET_ALL,
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

export const onGetTourDetail = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.tourApi.getDetail({ token, data });
      // console.debug("img rs: ", result)

      if (fCallBack) {
        fCallBack(true, result.data);
      }
      // get images
      const images = result.data.tour_image.map((item) => item.image);
      const reviews = result.data.tour_review.map((item) => {
        const temp = item.review;
        delete item.review;
        return { ...item, ...temp };
      });

      delete result.data.tour_review;

      dispatch({
        type: TourTypes.GET_DETAIL_SUCCESS,
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
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

export const onCreateTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.tourApi.add({ token, data });
      // console.debug("rs: ", result)
      dispatch({
        type: TourTypes.ADD,
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

export const onUpdateTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.tourApi.update({ token, data });
      // console.debug("rs: ", result)

      dispatch({
        type: TourTypes.UPDATE,
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

export const onDeleteTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      await api.tourApi.remove({ token, data });

      dispatch({
        type: TourTypes.DELETE,
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
  type: TourTypes.UPDATE_UNSAVE,
  payload,
});

export const onUpdateCurrentStep = (payload) => ({
  type: TourTypes.UPDATE_CURRENT_STEP,
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
        type: TourTypes.DELETE_UNSAVE,
      });
    } catch (err) {}
  };
};
