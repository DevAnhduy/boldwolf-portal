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
  onCreateAboutByType,
  onGetAboutDetailByType,
  onUpdateAboutByType,
} from "../../../../redux/about/about.actions";
import {
  ABOUT_TYPE,
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
  MESSAGE_REQUIRED,
  MODE,
} from "../../../../utils/constant";

ModalAboutTeamMember.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
};

function ModalAboutTeamMember({
  visible,
  handleCancel,
  idUpdate,
  token,
  history,
  onCreateAboutByType,
  onUpdateAboutByType,
  onGetAboutDetailByType,
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
      onGetAboutDetailByType(
        { data: idUpdate, token, fCallBack: onGetDetailCallBack },
        ABOUT_TYPE.MEMBER
      );
    }
  }, [token, idUpdate, onGetAboutDetailByType]);

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
        values["image"] = img.id;
      }

      setIsActionLoading(true);
      if (idUpdate) {
        onUpdateAboutByType(
          {
            token,
            data: { ...values, id: idUpdate },
            fCallBack: onSubmitCallBack,
          },
          ABOUT_TYPE.MEMBER
        );
        handleCancel();
      } else {
        onCreateAboutByType(
          { token, data: values, fCallBack: onSubmitCallBack },
          ABOUT_TYPE.MEMBER
        );
        handleCancel();
      }
    } catch (err) {}
  };

  const isImgValid = () => {
    if (!img) {
      message.error("Vui l??ng t???i h??nh th??nh vi??n");
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
      title="Th??nh Vi??n"
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
                label="Ti??u ?????"
                name="heading"
                className="heading"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nh???p ti??u ?????" />
              </Form.Item>

              <Form.Item
                label="Ti??u ????? (English)"
                name="heading_en"
                className="heading_en"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nh???p ti??u ????? (English)" />
              </Form.Item>

              <UploadSingleImg
                label="H??nh ???nh th??nh vi??n"
                required
                prevImg={img}
                onChange={onImgChanged}
                mode={idUpdate ? MODE.UPDATE : MODE.ADD}
              />

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
  onCreateAboutByType,
  onGetAboutDetailByType,
  onUpdateAboutByType,
})(ModalAboutTeamMember);
