import { Form, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ButtonCommon,
  LoadingCommon,
  ModalCommon,
  UploadSingleImg,
} from "../../../../common";
import {
  onCreateAdventureByType,
  onGetAdventureDetailByType,
  onUpdateAdventureByType,
} from "../../../../redux/adventure/adventure.actions";
import {
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
  MESSAGE_SUCCESS,
  MODE,
} from "../../../../utils/constant";
import { ADVENTURE_TYPE } from "../../../../utils/constant";

ModalAdventure.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
};

function ModalAdventure({
  titleModal,
  type,
  isOnlyImg = true,
  isOnlyText = false,
  isOnlyHeading = false,
  visible,
  idUpdate,
  token,
  handleCancel,
  onCreateAdventureByType,
  onUpdateAdventureByType,
  onGetAdventureDetailByType,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [data, setData] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    if (idUpdate) {
      const onGetDetailCallBack = (isSuccess, rs) => {
        setIsLoading(false);
        if (!isSuccess) {
          message.error(MESSAGE_ERROR);
        } else {
          setData({ ...rs });
          setImg(rs.image);
        }
      };

      setIsLoading(true);
      onGetAdventureDetailByType(
        { data: idUpdate, token, fCallBack: onGetDetailCallBack },
        type
      );
    } else {
    }
  }, [token, idUpdate, onGetAdventureDetailByType, type]);

  const handleOk = () => {
    form.resetFields();
    handleCancel();
  };

  const onClear = () => {
    form.resetFields();
  };

  const onSubmitCallBack = (isSuccess, rs) => {
    if (img) {
      setImg({ ...img, isSave: true });
    }
    setIsActionLoading(false);
    if (!isSuccess) {
      message.error(MESSAGE_ERROR);
    } else {
      message.success(MESSAGE_SUCCESS);
      // close modal
      handleCancel();
    }
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!isOnlyText) {
        if (!isImgValid()) {
          return;
        }

        if (img) {
          values["image"] = img.id;
        }
      }

      setIsActionLoading(true);
      if (idUpdate) {
        onUpdateAdventureByType(
          {
            token,
            data: { ...values, id: idUpdate },
            fCallBack: onSubmitCallBack,
          },
          type
        );
        handleCancel();
      } else {
        onCreateAdventureByType(
          { token, data: values, fCallBack: onSubmitCallBack },
          type
        );
        handleCancel();
      }
    } catch (err) {}
  };

  const isImgValid = () => {
    if (!img) {
      message.error("Vui lòng tải hình");
      return false;
    }
    return true;
  };

  useEffect(() => {
    // only save data after img has been uploaded
    setIsActionLoading(false);
  }, [img]);

  const onImgChanged = async (value) => {
    setIsActionLoading(true);
    setImg({ ...value, isSave: false });
  };

  const getLabelHeading = (type, en) => {
    let label = "";
    let label_en = "";
    switch (type) {
      case ADVENTURE_TYPE.DEVICE:
        label = "Tên thiết bị";
        label_en = "Tên thiết bị (English)";
        break;
      case ADVENTURE_TYPE.SAFETY:
        label = "Nội dung";
        label_en = "Nội dung (English)";
        break;
      case ADVENTURE_TYPE.EXPLORER:
        label = "Nội dung";
        label_en = "Nội dung (English)";
        break;
      default:
        label = "Tiêu đề";
        label_en = "Tiêu đề (English)";
    }

    return en ? label_en : label;
  };

  if (isOnlyText) {
    return (
      <ModalCommon
        title={titleModal}
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        footer={null}
      >
        <div className="modal-about-team-member u-page-detail-modal u-page-detail">
          <div className="content-modal content">
            <LoadingCommon isLoading={isLoading || (idUpdate && !data)}>
              <Form
                form={form}
                name="dynamic_rule"
                className="content-form"
                initialValues={data}
              >
                <Form.Item
                  label="Thứ tự"
                  name="order"
                  rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                >
                  <Input placeholder="Nhập số thứ tự" type="number" />
                </Form.Item>

                <Form.Item
                  label={getLabelHeading(type) || "Tiêu đề"}
                  name="heading"
                  className="heading"
                  rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                >
                  <TextArea
                    placeholder={`Nhập ${getLabelHeading(type) || "tiêu đề"}`}
                  ></TextArea>
                </Form.Item>

                <Form.Item
                  label={getLabelHeading(type, true) || "Tiêu đề (English)"}
                  name="heading_en"
                  className="heading"
                  rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                >
                  <TextArea
                    placeholder={`Nhập ${
                      getLabelHeading(type, true) || "tiêu đề (English)"
                    }`}
                  />
                </Form.Item>
                {!isOnlyHeading ? (
                  <>
                    <Form.Item
                      label="Nội dung"
                      name="content"
                      className="content"
                      rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                    >
                      <TextArea
                        placeholder={`Nhập ${
                          getLabelHeading(type) || "nội dung"
                        }`}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Nội dung (English)"
                      name="content_en"
                      className="content_en"
                      rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                    >
                      <TextArea
                        placeholder={`Nhập ${
                          getLabelHeading(type) || "nội dung (English)"
                        }`}
                      />
                    </Form.Item>
                  </>
                ) : (
                  ""
                )}

                <Form.Item className="btn-group-modal">
                  <ButtonCommon
                    type="default"
                    onClick={onClear}
                    loading={isActionLoading}
                  >
                    Xóa tất cả
                  </ButtonCommon>
                  <ButtonCommon
                    type="primary"
                    onClick={onSubmit}
                    loading={isActionLoading}
                  >
                    Lưu
                  </ButtonCommon>
                </Form.Item>
              </Form>
            </LoadingCommon>
          </div>
        </div>
      </ModalCommon>
    );
  }

  return (
    <ModalCommon
      title={titleModal}
      visible={visible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      footer={null}
    >
      <div className="modal-about-team-member u-page-detail-modal u-page-detail">
        <div className="content-modal content">
          <LoadingCommon isLoading={isLoading || (idUpdate && !data)}>
            <Form
              form={form}
              name="dynamic_rule"
              className="content-form"
              initialValues={data}
            >
              {!isOnlyImg && (
                <>
                  <Form.Item
                    label={getLabelHeading(type) || "Tiêu đề"}
                    name="heading"
                    className="heading"
                    rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                  >
                    <TextArea
                      placeholder={`Nhập ${getLabelHeading(type) || "tiêu đề"}`}
                    ></TextArea>
                  </Form.Item>

                  <Form.Item
                    label={getLabelHeading(type, true) || "Tiêu đề (English)"}
                    name="heading_en"
                    className="heading"
                    rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                  >
                    <TextArea
                      placeholder={`Nhập ${
                        getLabelHeading(type, true) || "tiêu đề (English)"
                      }`}
                    />
                  </Form.Item>
                </>
              )}

              <Form.Item
                label="Thứ tự"
                name="order"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nhập số thứ tự" type="number" />
              </Form.Item>

              {/* <Form.Item
                                    label={getLabelHeading(type) || 'Tiêu đề' }
                                    name="heading"
                                    className="heading"
                                    rules={[
                                        { required: true, message: MESSAGE_REQUIRED }
                                    ]}
                                >
                                    <TextArea placeholder={`Nhập ${getLabelHeading(type) || 'tiêu đề' }`}></TextArea>
                                </Form.Item>

                                <Form.Item
                                    label={getLabelHeading(type, true) || 'Tiêu đề (English)'}
                                    name="heading_en"
                                    className="heading"
                                    rules={[
                                        { required: true, message: MESSAGE_REQUIRED}
                                    ]}                     
                                >
                                    <TextArea placeholder={`Nhập ${getLabelHeading(type, true) || 'tiêu đề (English)' }`} />
                                </Form.Item> */}

              {!isOnlyHeading ? (
                <>
                  <Form.Item
                    label="Nội dung"
                    name="content"
                    className="content"
                    rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                  >
                    <TextArea
                      placeholder={`Nhập ${
                        getLabelHeading(type) || "nội dung"
                      }`}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Nội dung (English)"
                    name="content_en"
                    className="content_en"
                    rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                  >
                    <TextArea
                      placeholder={`Nhập ${
                        getLabelHeading(type) || "nội dung (English)"
                      }`}
                    />
                  </Form.Item>
                </>
              ) : (
                ""
              )}

              <UploadSingleImg
                label="Hình ảnh"
                required
                prevImg={img}
                onChange={onImgChanged}
                mode={idUpdate ? MODE.UPDATE : MODE.ADD}
              />

              <Form.Item className="btn-group-modal">
                <ButtonCommon
                  type="default"
                  onClick={onClear}
                  loading={isActionLoading}
                >
                  Xóa tất cả
                </ButtonCommon>
                <ButtonCommon
                  type="primary"
                  onClick={onSubmit}
                  loading={isActionLoading}
                >
                  Lưu
                </ButtonCommon>
              </Form.Item>
            </Form>
          </LoadingCommon>
        </div>
      </div>
    </ModalCommon>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, {
  onCreateAdventureByType,
  onGetAdventureDetailByType,
  onUpdateAdventureByType,
})(ModalAdventure);
