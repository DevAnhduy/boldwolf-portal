import { message } from "antd";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  BackButton,
  ButtonCommon,
  Heading,
  InputWithLabelCommon,
  LoadingCommon,
  ModalCommon,
  UploadSingleImg,
} from "../../common";
import {
  onGetAllGlamping,
  onGetInfoGlamping,
  onUpdateGlamping,
  onUpdateInfoGlamping,
} from "../../redux/glamping/glamping.actions";
import { MESSAGE_UPDATE_SUCCESS, MODE } from "../../utils/constant";
import { getLinkImg } from "../../utils/function.utils";
import "./Glamping.scss";
const GlampingComponent = ({
  onGetAllGlamping,
  token,
  glampings,
  onUpdateGlamping,
  onGetInfoGlamping,
  onUpdateInfoGlamping,
  info,
}) => {
  const [visible, setVisible] = useState(false);
  const [editGlamping, setEditGlamping] = useState(null);
  const [editInfo, setEditInfo] = useState(info);
  const [loading, setLoading] = useState(true);
  const onImageClick = (value) => {
    setVisible(true);
    setEditGlamping(value);
  };
  useEffect(() => {
    onGetAllGlamping({ token, fCallBack: onGetAllGlampingCallBack });
    onGetInfoGlamping({ token });
  }, [onGetAllGlamping, token, onGetInfoGlamping]);

  useEffect(() => {
    setEditInfo(info);
  }, [info]);

  const closeModal = () => {
    setVisible(false);
  };

  const onGetAllGlampingCallBack = (isSuccess, rs) => {
    if (isSuccess) {
      setLoading(false);
    }
  };
  const onImageChange = (value) => {
    setEditGlamping({ ...editGlamping, image: value });
  };

  const handleDescriptionChange = (value) => {
    setEditGlamping({ ...editGlamping, description: value });
  };
  const handleDescriptionENChange = (value) => {
    setEditGlamping({ ...editGlamping, description_en: value });
  };

  const onOK = () => {
    onUpdateGlamping({
      token,
      data: {
        description: editGlamping.description,
        description_en: editGlamping.description_en,
        id: editGlamping.id,
        image: editGlamping.image.id,
      },
      fCallBack: onUpdateGlampingCallBack,
    });
  };
  const onUpdateGlampingCallBack = (isSuccess, rs) => {
    if (isSuccess) {
      setVisible(false);
    }
  };

  const onHeadingChange = (value) => {
    setEditInfo({ ...editInfo, heading: value });
  };
  const onHeadingENChange = (value) => {
    setEditInfo({ ...editInfo, heading_en: value });
  };
  const onDescriptionChange = (value) => {
    setEditInfo({ ...editInfo, description: value });
  };
  const onDescriptionENChange = (value) => {
    setEditInfo({ ...editInfo, description_en: value });
  };
  const onSaveClick = () => {
    onUpdateInfoGlamping({
      token,
      data: editInfo,
      fCallBack: onUpdateInfoGlampingCallBack,
    });
  };

  const onUpdateInfoGlampingCallBack = (isSuccess, rs) => {
    if (isSuccess) {
      message.success(MESSAGE_UPDATE_SUCCESS);
    }
  };

  return (
    <div className="glamping u-page-detail">
      <div className="top">
        <BackButton />
        <Heading>Glamping detail</Heading>
      </div>
      {editInfo ? (
        <>
          <InputWithLabelCommon
            onChange={onHeadingChange}
            label="Heading"
            value={editInfo.heading}
          ></InputWithLabelCommon>
          <InputWithLabelCommon
            onChange={onHeadingENChange}
            label="Heading (English)"
            value={editInfo.heading_en}
          ></InputWithLabelCommon>
          <InputWithLabelCommon
            onChange={onDescriptionChange}
            label="Description"
            value={editInfo.description}
          ></InputWithLabelCommon>
          <InputWithLabelCommon
            onChange={onDescriptionENChange}
            label="Description (English)"
            value={editInfo.description_en}
          ></InputWithLabelCommon>
          <div className="save">
            <ButtonCommon onClick={onSaveClick} type="primary">
              Lưu
            </ButtonCommon>
          </div>
        </>
      ) : null}

      <div className="content">
        <LoadingCommon isLoading={loading}>
          <div className="imageWarp">
            <div className={"image"}>
              {glampings &&
                glampings.map((glamping, imdex) => {
                  if (glamping.id === 5) {
                    return (
                      <div className={`square_5 square`}>
                        <img
                          alt="glamping"
                          className={`zoom`}
                          src={getLinkImg(glamping.image.main)}
                          onClick={() => onImageClick(glamping)}
                        />
                      </div>
                    );
                  } else if (glamping.id === 6) {
                    return (
                      <div className={`rectangle_1`}>
                        <img
                          alt="glamping"
                          className={`zoom`}
                          src={getLinkImg(glamping.image.main)}
                          onClick={() => onImageClick(glamping)}
                        />
                      </div>
                    );
                  } else if (glamping.id === 7) {
                    return (
                      <div className={`rectangle_2`}>
                        <img
                          alt="glamping"
                          className={`zoom`}
                          src={getLinkImg(glamping.image.main)}
                          onClick={() => onImageClick(glamping)}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className={`square_${glamping.id} square`}>
                        <img
                          alt="glamping"
                          className={`zoom`}
                          src={getLinkImg(glamping.image.main)}
                          onClick={() => onImageClick(glamping)}
                        />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </LoadingCommon>
      </div>
      <ModalCommon
        visible={visible}
        handleCancel={closeModal}
        handleOk={onOK}
        okText={"Cập Nhật Hình"}
      >
        <InputWithLabelCommon
          value={editGlamping ? editGlamping.description : ""}
          label="Description"
          onChange={handleDescriptionChange}
        ></InputWithLabelCommon>
        <InputWithLabelCommon
          value={editGlamping ? editGlamping.description_en : ""}
          label="Description (English)"
          onChange={handleDescriptionENChange}
        ></InputWithLabelCommon>
        <UploadSingleImg
          onChange={onImageChange}
          prevImg={editGlamping ? editGlamping.image : null}
          label={`Image`}
          mode={MODE.UPDATE}
        ></UploadSingleImg>
      </ModalCommon>
    </div>
  );
};
const mapStateToProps = (state) => ({
  token: state.user.token,
  glampings: state.glamping.data,
  info: state.glamping.info,
});

const mapDispatchToProps = {
  onGetAllGlamping,
  onUpdateGlamping,
  onGetInfoGlamping,
  onUpdateInfoGlamping,
};

export const Glamping = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlampingComponent);
