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
  onCreateAdventureTour,
  onUpdateAdventureTour,
  onGetAdventureTourDetail,
} from "../../../../redux/adventure/adventure.actions";
import {
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
  MESSAGE_SUCCESS,
  MODE,
} from "../../../../utils/constant";

ModalAdventureList.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
};

function ModalAdventureList({
  titleModal,
  visible,
  idUpdate,
  token,
  handleCancel,
  onCreateAdventureTour,
  onUpdateAdventureTour,
  onGetAdventureTourDetail,
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
      onGetAdventureTourDetail({
        data: idUpdate,
        token,
        fCallBack: onGetDetailCallBack,
      });
    }
  }, [token, idUpdate, onGetAdventureTourDetail]);

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

      if (!isImgValid()) {
        return;
      }

      if (img) {
        values["image"] = img.id;
      }

      setIsActionLoading(true);
      if (idUpdate) {
        onUpdateAdventureTour({
          token,
          data: { ...values, id: idUpdate },
          fCallBack: onSubmitCallBack,
        });
        handleCancel();
      } else {
        onCreateAdventureTour({
          token,
          data: values,
          fCallBack: onSubmitCallBack,
        });
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

  useEffect(() => {
    // only save data after img has been uploaded
    setIsActionLoading(false);
  }, [img]);

  return (
    <ModalCommon
      title={titleModal}
      visible={visible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      footer={null}
    >
      <div className="modal-adventure-list u-page-detail-modal u-page-detail">
        <div className="content-modal content">
          <LoadingCommon isLoading={isLoading || (idUpdate && !data)}>
            <Form
              form={form}
              name="dynamic_rule"
              className="content-form"
              initialValues={data}
            >
              <Form.Item
                label="Ti??u ?????/T??n"
                name="title"
                className="title"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nh???p ti??u ?????" />
              </Form.Item>

              <Form.Item
                label="Ti??u ?????/T??n (English)"
                name="title_en"
                className="title_en"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nh???p ti??u ????? (English)" />
              </Form.Item>

              <Form.Item
                label="N???i dung"
                name="content"
                className="content"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <TextArea placeholder="Nh???p n???i dung" />
              </Form.Item>

              <Form.Item
                label="N???i dung (English)"
                name="content_en"
                className="content_en"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <TextArea placeholder="Nh???p n???i dung (English)" />
              </Form.Item>

              <Form.Item
                label="Ng??y"
                name="day"
                className="day"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nh???p s??? ng??y" type="number" />
              </Form.Item>

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
  onCreateAdventureTour,
  onGetAdventureTourDetail,
  onUpdateAdventureTour,
})(ModalAdventureList);
