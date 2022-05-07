import React, { useState } from "react";
import { ButtonCommon } from "../../../../../../common";
import {
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from "../../../../../../utils/constant";
import { message } from "antd";
import { getIdsFromArrObject } from "../../../../../../utils/function.utils";
import {
  onUpdateAdventureTour,
  onCreateAdventureTour,
  onUpdateCurrentStep,
} from "../../../../../../redux/adventure/adventure.actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

const ButtonCompleteAventureTourDetail = ({
  history,
  token,
  currentTour,
  onUpdateAdventureTour,
  onCreateAdventureTour,
  onUpdateCurrentStep,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const validateItinearay = (values, valuesEn) => {
    if (!values || !valuesEn) {
      return false;
    }

    const rs = values.findIndex((item) => !item);
    if (rs !== -1) {
      message.error(`Vui lòng điền lịch trình trong ngày ${rs + 1}`);
      return false;
    }

    const rsEn = valuesEn.findIndex((item) => !item);
    if (rsEn !== -1) {
      message.error(
        `Vui lòng điền lịch trình bằng tiếng Anh trong ngày ${rsEn + 1}`
      );
      return false;
    }

    return true;
  };

  const validateLocation = (value) => {
    const { description } = value;
    // need to check only description (bc other fields are in the same form)
    if (!description) {
      return false;
    }

    return true;
  };

  const validateData = () => {
    if (currentTour) {
      const {
        title,
        key_info: keyInfo,
        itinerary,
        itinerary_en,
        images,
        location,
        service,
      } = currentTour;
      let error;
      let step = -1;
      // info detail: need to check only title (bc other fields are in the same form)
      if (!title) {
        error = "Vui lòng điền đầy đủ thông tin chung!";
        step = 0;
      } else if (!keyInfo || keyInfo.length < 1) {
        // key info
        error = "Vui lòng điền ít nhất 1 thông tin chi tiết!";
        step = 1;
      } else if (!validateItinearay(itinerary, itinerary_en)) {
        // itinetary
        // error = 'Vui lòng điền đầy đủ thông tin lịch trình!'
        step = 2;
      } else if (!images || images.length < 1) {
        // images
        error = "Vui lòng upload hình!";
        step = 3;
      } else if (!location || !validateLocation(location)) {
        error = "Vui lòng điền đầy đủ thông tin địa điểm!";
        step = 4;
      } else if (!service || service.length < 1) {
        error = "Vui lòng điền ít nhất 1 dịch vụ!";
        step = 5;
      }

      if (error || step !== -1) {
        error && message.error(error);
        onUpdateCurrentStep(step);
        return false;
      } else {
        return true;
      }
    } else {
      message.error("Vui lòng điền đầy đủ thông tin!");
      onUpdateCurrentStep(0);
      return false;
    }
  };

  const formatTourData = () => {
    const rs = {
      ...currentTour,
      images: getIdsFromArrObject(currentTour.images),
      reviews: getIdsFromArrObject(currentTour.reviews),
      // todo
      // location: (4) [description, description_en, longitude, latitude]
      location: [
        currentTour.location.description,
        currentTour.location.description_en,
        currentTour.location.lng,
        currentTour.location.lat,
      ],
    };

    delete rs.adventure_tour_image;
    delete rs.adventure_tour_review;
    delete rs.created_at;
    delete rs.updated_at;

    return rs;
  };

  const onFinishCallBack = (isSuccess) => {
    setIsLoading(false);
    if (isSuccess) {
      message.success(MESSAGE_SUCCESS);
      history.goBack();
    } else {
      message.error(MESSAGE_ERROR);
    }
  };

  const onFinish = () => {
    const isValid = validateData();
    if (isValid) {
      const formatData = formatTourData(currentTour);

      setIsLoading(true);
      if (currentTour && currentTour.id) {
        // update
        onUpdateAdventureTour({
          data: formatData,
          token,
          fCallBack: onFinishCallBack,
        });
      } else {
        // add
        onCreateAdventureTour({
          data: formatData,
          token,
          fCallBack: onFinishCallBack,
        });
      }
    }
  };

  return (
    <ButtonCommon type="primary" onClick={onFinish} loading={isLoading}>
      Hoàn tất
    </ButtonCommon>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  currentTour: state.adventure.currentTour,
  currentStep: state.adventure.currentStep,
});

export default compose(
  connect(mapStateToProps, {
    onUpdateAdventureTour,
    onCreateAdventureTour,
    onUpdateCurrentStep,
  }),
  withRouter
)(ButtonCompleteAventureTourDetail);
