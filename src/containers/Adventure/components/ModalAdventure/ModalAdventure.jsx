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
      message.error("Vui l??ng t???i h??nh");
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
        label = "T??n thi???t b???";
        label_en = "T??n thi???t b??? (English)";
        break;
      case ADVENTURE_TYPE.SAFETY:
        label = "N???i dung";
        label_en = "N???i dung (English)";
        break;
      case ADVENTURE_TYPE.EXPLORER:
        label = "N???i dung";
        label_en = "N???i dung (English)";
        break;
      default:
        label = "Ti??u ?????";
        label_en = "Ti??u ????? (English)";
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
                  label="Th??? t???"
                  name="order"
                  rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                >
                  <Input placeholder="Nh???p s??? th??? t???" type="number" />
                </Form.Item>

                <Form.Item
                  label={getLabelHeading(type) || "Ti??u ?????"}
                  name="heading"
                  className="heading"
                  rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                >
                  <TextArea
                    placeholder={`Nh???p ${getLabelHeading(type) || "ti??u ?????"}`}
                  ></TextArea>
                </Form.Item>

                <Form.Item
                  label={getLabelHeading(type, true) || "Ti??u ????? (English)"}
                  name="heading_en"
                  className="heading"
                  rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                >
                  <TextArea
                    placeholder={`Nh???p ${
                      getLabelHeading(type, true) || "ti??u ????? (English)"
                    }`}
                  />
                </Form.Item>
                {!isOnlyHeading ? (
                  <>
                    <Form.Item
                      label="N???i dung"
                      name="content"
                      className="content"
                      rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                    >
                      <TextArea
                        placeholder={`Nh???p ${
                          getLabelHeading(type) || "n???i dung"
                        }`}
                      />
                    </Form.Item>

                    <Form.Item
                      label="N???i dung (English)"
                      name="content_en"
                      className="content_en"
                      rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                    >
                      <TextArea
                        placeholder={`Nh???p ${
                          getLabelHeading(type) || "n???i dung (English)"
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
                    X??a t???t c???
                  </ButtonCommon>
                  <ButtonCommon
                    type="primary"
                    onClick={onSubmit}
                    loading={isActionLoading}
                  >
                    L??u
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
                    label={getLabelHeading(type) || "Ti??u ?????"}
                    name="heading"
                    className="heading"
                    rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                  >
                    <TextArea
                      placeholder={`Nh???p ${getLabelHeading(type) || "ti??u ?????"}`}
                    ></TextArea>
                  </Form.Item>

                  <Form.Item
                    label={getLabelHeading(type, true) || "Ti??u ????? (English)"}
                    name="heading_en"
                    className="heading"
                    rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                  >
                    <TextArea
                      placeholder={`Nh???p ${
                        getLabelHeading(type, true) || "ti??u ????? (English)"
                      }`}
                    />
                  </Form.Item>
                </>
              )}

              <Form.Item
                label="Th??? t???"
                name="order"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nh???p s??? th??? t???" type="number" />
              </Form.Item>

              {/* <Form.Item
                                    label={getLabelHeading(type) || 'Ti??u ?????' }
                                    name="heading"
                                    className="heading"
                                    rules={[
                                        { required: true, message: MESSAGE_REQUIRED }
                                    ]}
                                >
                                    <TextArea placeholder={`Nh???p ${getLabelHeading(type) || 'ti??u ?????' }`}></TextArea>
                                </Form.Item>

                                <Form.Item
                                    label={getLabelHeading(type, true) || 'Ti??u ????? (English)'}
                                    name="heading_en"
                                    className="heading"
                                    rules={[
                                        { required: true, message: MESSAGE_REQUIRED}
                                    ]}                     
                                >
                                    <TextArea placeholder={`Nh???p ${getLabelHeading(type, true) || 'ti??u ????? (English)' }`} />
                                </Form.Item> */}

              {!isOnlyHeading ? (
                <>
                  <Form.Item
                    label="N???i dung"
                    name="content"
                    className="content"
                    rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                  >
                    <TextArea
                      placeholder={`Nh???p ${
                        getLabelHeading(type) || "n???i dung"
                      }`}
                    />
                  </Form.Item>

                  <Form.Item
                    label="N???i dung (English)"
                    name="content_en"
                    className="content_en"
                    rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                  >
                    <TextArea
                      placeholder={`Nh???p ${
                        getLabelHeading(type) || "n???i dung (English)"
                      }`}
                    />
                  </Form.Item>
                </>
              ) : (
                ""
              )}

              <UploadSingleImg
                label="H??nh ???nh"
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
                  X??a t???t c???
                </ButtonCommon>
                <ButtonCommon
                  type="primary"
                  onClick={onSubmit}
                  loading={isActionLoading}
                >
                  L??u
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
