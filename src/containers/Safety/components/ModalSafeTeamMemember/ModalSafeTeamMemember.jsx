import React, { useState, useEffect } from "react";
import TextArea from "antd/lib/input/TextArea";
import { connect } from "react-redux";
import {
  ButtonCommon,
  LoadingCommon,
  ModalCommon,
  UploadSingleImg,
} from "../../../../common";
import PropTypes from "prop-types";
import { Form, message, Input } from "antd";
import {
  onCreateSafeByType,
  onGetSafeDetailByType,
  onUpdateSafeByType,
} from "../../../../redux/safety/safety.actions";
import {
  SAFE_TYPE,
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
  MESSAGE_REQUIRED,
  MODE,
} from "../../../../utils/constant";

ModalSafeTeamMemember.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
};

function ModalSafeTeamMemember({
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
          setImg(rs.avatar);
        }
      };

      setIsLoading(true);
      onGetSafeDetailByType(
        { data: idUpdate, token, fCallBack: onGetDetailCallBack },
        SAFE_TYPE.TEAM
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
        values["avatar"] = img.id;
      }

      setIsActionLoading(true);
      if (idUpdate) {
        onUpdateSafeByType(
          {
            token,
            data: { ...values, id: idUpdate },
            fCallBack: onSubmitCallBack,
          },
          SAFE_TYPE.TEAM
        );
        handleCancel();
      } else {
        onCreateSafeByType(
          { token, data: values, fCallBack: onSubmitCallBack },
          SAFE_TYPE.TEAM
        );
        handleCancel();
      }
    } catch (err) {}
  };

  const isImgValid = () => {
    if (!img) {
      message.error("Vui lòng tải hình thành viên");
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

  return (
    <ModalCommon
      title="Chi tiết thành viên"
      visible={visible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      footer={null}
    >
      <div className="modal-safe-team-member u-page-detail-modal u-page-detail">
        <div className="content-modal content">
          <LoadingCommon isLoading={isLoading || (idUpdate && !data)}>
            <Form
              form={form}
              name="dynamic_rule"
              className="content-form"
              initialValues={data}
            >
              <Form.Item
                label="Tên"
                name="name"
                className="name"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>

              <Form.Item
                label="Tên (English)"
                name="name_en"
                className="name_en"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nhập tên tiếng anh" />
              </Form.Item>

              <UploadSingleImg
                label="Hình thành viên"
                required
                prevImg={img}
                onChange={onImgChanged}
                mode={idUpdate ? MODE.UPDATE : MODE.ADD}
              />

              <Form.Item
                label="Giới thiệu"
                name="content"
                className="content"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <TextArea placeholder="Nhập giới thiệu" />
              </Form.Item>

              <Form.Item
                label="Giới thiệu (English)"
                name="content_en"
                className="content_en"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <TextArea placeholder="Nhập giới thiệu tiếng Anh" />
              </Form.Item>

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
})(ModalSafeTeamMemember);
