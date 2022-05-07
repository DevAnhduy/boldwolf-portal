import { Form, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ButtonCommon, LoadingCommon, ModalCommon } from "../../../../common";
import {
  onCreateSafeByType,
  onGetSafeDetailByType,
  onUpdateSafeByType,
} from "../../../../redux/safety/safety.actions";
import {
  SAFE_TYPE,
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
} from "../../../../utils/constant";

const ModalSafeRule = ({
  visible,
  handleCancel,
  idUpdate,
  token,
  history,
  onCreateSafeByType,
  onUpdateSafeByType,
  onGetSafeDetailByType,
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
          // console.debug("rs detail : ", rs)
          setData({ ...rs });
        }
      };

      setIsLoading(true);
      onGetSafeDetailByType(
        { data: idUpdate, token, fCallBack: onGetDetailCallBack },
        SAFE_TYPE.RULE
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

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (idUpdate) {
        onUpdateSafeByType(
          { token, data: { ...values, id: idUpdate }, fCallBack: null },
          SAFE_TYPE.RULE
        );
        handleCancel();
      } else {
        onCreateSafeByType(
          { token, data: values, fCallBack: null },
          SAFE_TYPE.RULE
        );
        handleCancel();
      }
    } catch (err) {}
  };

  return (
    <ModalCommon
      title="Chi Tiết Quy Tắc An Toàn"
      visible={visible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      footer={null}
    >
      <div className="modal-safe-rule u-page-detail-modal u-page-detail">
        <div className="content-modal content">
          <LoadingCommon isLoading={isLoading || (idUpdate && !data)}>
            <Form
              form={form}
              name="safe-rule-form"
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

// export default ModalSafeRule;

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, {
  onCreateSafeByType,
  onGetSafeDetailByType,
  onUpdateSafeByType,
})(ModalSafeRule);
