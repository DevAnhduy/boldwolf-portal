import { message } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { BackButton, Heading, UploadSingleImg } from "../../../../common";
import {
  addBanner,
  onGetBannerDetailWithReference,
  updateBanner,
} from "../../../../redux/banner/banner.actions";
import {
  MESSAGE_ERROR,
  MESSAGE_UPDATE_SUCCESS,
  MODE,
} from "../../../../utils/constant";
import ContentBanner from "../ContentBanner/ContentBanner";
import "./BannerTourDetail.scss";

const BannerTourDetail = ({
  updateBanner,
  addBanner,
  token,
  match,
  onGetBannerDetailWithReference,
  history,
}) => {
  const [img, setImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    onGetBannerDetailWithReference({
      token,
      data: { key: "tour_id", id: match.params.id },
      fCallBack: onGetDetailCallBack,
    });
  }, [match.params.id, token, onGetBannerDetailWithReference]);

  const onGetDetailCallBack = (isSuccess, rs) => {
    if (isSuccess) {
      if (rs) {
        setImg(rs.banner_img);
        setBannerData(rs);
      } else {
        setBannerData({}); // stop loading
      }
    } else {
      setBannerData({}); // stop loading
    }
  };

  const onUpdateImgCallBack = (isSuccess, rs) => {
    if (isSuccess) {
      setImg(rs.banner_img);
      setBannerData(rs);
    }
  };

  const onImgChanged = async (value) => {
    const valueBody = {
      ...bannerData,
      banner_img: value.id,
      tour_id: match.params.id,
    };
    if (!img) {
      if (bannerData.id) {
        updateBanner({
          token,
          data: valueBody,
          fCallBack: onUpdateImgCallBack,
        });
      } else {
        addBanner({ token, data: valueBody, fCallBack: onUpdateImgCallBack });
      }
    }
  };

  const submitContentCallBack = (isSuccess, rs) => {
    setIsLoading(false);
    if (!isSuccess) {
      message.error(MESSAGE_ERROR);
    } else {
      message.success(MESSAGE_UPDATE_SUCCESS);
      setBannerData(rs);
      history.goBack();
    }
  };

  const submitContent = (values) => {
    setIsLoading(true);
    if (bannerData.id) {
      updateBanner({
        token,
        data: { ...values, id: bannerData.id, tour_id: match.params.id },
        fCallBack: submitContentCallBack,
      });
    } else {
      addBanner({
        token,
        data: { ...values, tour_id: match.params.id },
        fCallBack: submitContentCallBack,
      });
    }
  };

  return (
    <div className="banner-tour-detail u-banner-page">
      <div className="top">
        <BackButton />
        <Heading>Tour banner</Heading>
      </div>
      <div className="banner-body">
        <div className="text-in-banner">
          <ContentBanner
            onSubmit={submitContent}
            isLoading={isLoading}
            data={bannerData}
          />
        </div>
        <div className="upload-image-banner-tour-detail">
          <UploadSingleImg
            label="Chọn ảnh banner"
            required
            prevImg={img}
            onChange={onImgChanged}
            mode={img ? MODE.UPDATE : MODE.ADD}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default compose(
  connect(mapStateToProps, {
    updateBanner,
    addBanner,
    onGetBannerDetailWithReference,
  }),
  withRouter
)(BannerTourDetail);
