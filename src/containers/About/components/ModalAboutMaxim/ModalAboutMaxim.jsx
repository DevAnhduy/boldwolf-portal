import { Form, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ButtonCommon, LoadingCommon, ModalCommon } from "../../../../common";
import {
  onCreateAboutByType,
  onGetAboutDetailByType,
  onUpdateAboutByType,
} from "../../../../redux/about/about.actions";
import {
  ABOUT_TYPE,
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
} from "../../../../utils/constant";

const ModalAboutMaxim = ({
  visible,
  handleCancel,
  idUpdate,
  token,
  history,
  onCreateAboutByType,
  onUpdateAboutByType,
  onGetAboutDetailByType,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (idUpdate) {
      const onGetDetailCallBack = (isSuccess, rs) => {
        setIsLoading(false);
        if (!isSuccess) {
          message.error(MESSAGE_ERROR);
        } else {
          // console.log("rs detail : ", rs)
          setData({ ...rs });
        }
      };

      setIsLoading(true);
      onGetAboutDetailByType(
        { data: idUpdate, token, fCallBack: onGetDetailCallBack },
        ABOUT_TYPE.MAXIM
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

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (idUpdate) {
        onUpdateAboutByType(
          { token, data: { ...values, id: idUpdate }, fCallBack: null },
          ABOUT_TYPE.MAXIM
        );
        handleCancel();
      } else {
        onCreateAboutByType(
          { token, data: values, fCallBack: null },
          ABOUT_TYPE.MAXIM
        );
        handleCancel();
      }
    } catch (err) {}
  };

  return (
    <ModalCommon
      title="Câu Châm Ngôn"
      visible={visible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      footer={null}
    >
      <div className="modal-about-maxim u-page-detail-modal u-page-detail">
        <div className="content-modal content">
          <LoadingCommon isLoading={isLoading || (idUpdate && !data)}>
            <Form
              form={form}
              name="about-maxim-form"
              className="content-form"
              initialValues={data}
            >
              {/* <Form.Item
                                label="Tiêu đề"
                                name="title"
                                className="title"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Nhập tiêu đề" />
                            </Form.Item> */}

              {/* <Form.Item
                                label="Thứ tự"
                                name="order"
                                className="order"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Nhập thứ tự" type="number" />
                            </Form.Item> */}

              <Form.Item
                label="Câu châm ngôn"
                name="content"
                className="content"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <TextArea placeholder="Nhập câu châm ngôn" />
              </Form.Item>

              <Form.Item
                label="Câu châm ngôn (English)"
                name="content_en"
                className="content_en"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <TextArea placeholder="Nhập câu châm ngôn (English)" />
              </Form.Item>

              <Form.Item className="btn-group-modal">
                <ButtonCommon type="default" onClick={onClear}>
                  Xóa tất cả
                </ButtonCommon>
                <ButtonCommon type="primary" onClick={onSubmit}>
                  Lưu
                </ButtonCommon>
              </Form.Item>
            </Form>
          </LoadingCommon>
        </div>
      </div>
    </ModalCommon>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, {
  onCreateAboutByType,
  onGetAboutDetailByType,
  onUpdateAboutByType,
})(ModalAboutMaxim);
