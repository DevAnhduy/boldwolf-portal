import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, message, Input } from "antd";
import {
  ModalCommon,
  LoadingCommon,
  ButtonCommon,
  UploadSingleImg,
} from "../../../../common";
import {
  MESSAGE_REQUIRED,
  MESSAGE_ERROR,
  SAFE_TYPE,
  MESSAGE_SUCCESS,
  MODE,
} from "../../../../utils/constant";
import {
  onCreateSafeByType,
  onGetSafeDetailByType,
  onUpdateSafeByType,
} from "../../../../redux/safety/safety.actions";
import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";

ModalSafeProcess.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
};

function ModalSafeProcess({
  visible,
  handleCancel,
  idUpdate,
  token,
  history,
  onCreateSafeByType,
  onUpdateSafeByType,
  onGetSafeDetailByType,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [img, setImg] = useState();
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if (idUpdate) {
      const onGetDetailCallBack = (isSuccess, rs) => {
        setIsLoading(false);
        if (!isSuccess) {
          message.error(MESSAGE_ERROR);
        } else {
          // console.log("rs detail : ", rs)
          setData({ ...rs });
          setImg(rs.image);
        }
      };

      setIsLoading(true);

      onGetSafeDetailByType(
        { data: idUpdate, token, fCallBack: onGetDetailCallBack },
        SAFE_TYPE.PROGRESS
      );
    }
  }, [token, idUpdate, onGetSafeDetailByType]);

  const handleOk = () => {
    // todo

    handleCancel();
  };

  const onClear = () => {
    form.resetFields();
  };

  const isImgValid = () => {
    if (!img) {
      message.error("Vui lòng tải hình");
      return false;
    }
    return true;
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
        onUpdateSafeByType(
          {
            token,
            data: { ...values, id: idUpdate },
            fCallBack: onSubmitCallBack,
          },
          SAFE_TYPE.PROGRESS
        );
        handleCancel();
      } else {
        onCreateSafeByType(
          { token, data: values, fCallBack: onSubmitCallBack },
          SAFE_TYPE.PROGRESS
        );
        handleCancel();
      }
    } catch (err) {}
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
      title="Chi tiết quy trình an toàn"
      visible={visible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      footer={null}
    >
      <div className="modal-safe-process u-page-detail-modal u-page-detail">
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
                className="order"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nhập thứ tự" type="number" />
              </Form.Item>

              <Form.Item
                label="Nội dung"
                name="content"
                className="content"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <TextArea placeholder="Nhập nội dung" />
              </Form.Item>

              <Form.Item
                label="Nội dung (English)"
                name="content_en"
                className="content_en"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <TextArea placeholder="Nhập nội dung tiếng Anh" />
              </Form.Item>

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
  onCreateSafeByType,
  onGetSafeDetailByType,
  onUpdateSafeByType,
})(ModalSafeProcess);
