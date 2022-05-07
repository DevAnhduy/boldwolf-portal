import { Form, Input } from "antd";
import React from "react";
import { ButtonCommon, LoadingCommon } from "../../../../common";
import { MESSAGE_REQUIRED } from "../../../../utils/constant";
import "./ContentBanner.scss";

const { TextArea } = Input;
const ContentBanner = ({ onSubmit, isLoading, data }) => {
  const [form] = Form.useForm();

  const onClear = () => {
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit && onSubmit(values);
    } catch (err) {}
  };

  return (
    <div className="content-banner u-page-detail">
      <div className="content">
        <LoadingCommon isLoading={!data}>
          <Form
            form={form}
            name="dynamic_rule"
            className="content-form"
            initialValues={data}
          >
            <Form.Item
              label="Tiêu đề"
              name="heading"
              className="content"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Nhập nội dung" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề (English)"
              name="heading_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề phụ"
              name="sub_heading"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Nhập tiêu đề phụ" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề phụ (English)"
              name="sub_heading_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Enter sub title" />
            </Form.Item>

            <Form.Item className="btn-group">
              <ButtonCommon
                type="default"
                onClick={onClear}
                loading={isLoading}
              >
                Xóa tất cả
              </ButtonCommon>
              <ButtonCommon
                type="primary"
                onClick={handleSubmit}
                loading={isLoading}
              >
                Lưu
              </ButtonCommon>
            </Form.Item>
          </Form>
        </LoadingCommon>
      </div>
    </div>
  );
};

export default ContentBanner;
