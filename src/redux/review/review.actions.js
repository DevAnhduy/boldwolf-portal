import api from "../../api/index.api";
import ReviewTypes from "./review.types";

export const onGetAllReview = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack } = payload;
    try {
      const result = await api.reviewApi.getHomeReview({ token });
      dispatch({
        type: ReviewTypes.GET_ALL,
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

export const onGetReviewDetail = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.reviewApi.getDetail({ token, data });

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

export const onCreateReview = (payload) => {
  return async (dispatch) => {
    let { token, fCallBack, data } = payload;
    try {
      const result = await api.reviewApi.add({ token, data });
      if (result.data.is_home) {
        // update reducer if this is home's review
        dispatch({
          type: ReviewTypes.ADD,
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

export const onUpdateReview = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.reviewApi.update({ token, data });
      if (result.data.is_home) {
        // update reducer if this is home's review
        dispatch({
          type: ReviewTypes.UPDATE,
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

export const onDeleteReview = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data, isNotHome } = payload;
    try {
      await api.reviewApi.remove({ token, data });
      if (!isNotHome) {
        dispatch({
          type: ReviewTypes.DELETE,
          payload: { id: data },
        });
      }

      if (fCallBack) {
        fCallBack(true, data);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

// tour
export const onCreateReviewInTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.reviewApi.createTourReview({ token, data });

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

export const onDeleteReviewInTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      await api.reviewApi.deleteTourReview({ token, data });

      if (fCallBack) {
        fCallBack(true, data);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

// team building
export const onCreateReviewInTeamBuilding = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.reviewApi.createTeamBuildingReview({
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

export const onDeleteReviewInTeamBuilding = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      await api.reviewApi.deleteTeamBuildingReview({ token, data });

      if (fCallBack) {
        fCallBack(true, data);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};

// adventure
export const onCreateReviewInAdventureTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      const result = await api.reviewApi.createAdventureTourReview({
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

export const onDeleteReviewInAdventureTour = (payload) => {
  return async (dispatch) => {
    const { token, fCallBack, data } = payload;
    try {
      await api.reviewApi.deleteAdventureTourReview({ token, data });

      if (fCallBack) {
        fCallBack(true, data);
      }
    } catch (err) {
      if (fCallBack) {
        fCallBack(false, err.message);
      }
    }
  };
};
