import { Form, Input, message, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { connect } from "react-redux";
import { ButtonCommon, ModalCommon } from "../../../../../../common";
import {
  onCreateReview,
  onUpdateReview,
  onCreateReviewInAdventureTour,
} from "../../../../../../redux/review/review.actions";
import {
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
} from "../../../../../../utils/constant";
import "./ModalAdventureTourDetailReview.scss";

const ModalAdventureTourDetailReview = ({
  visible,
  data,
  handleOk,
  handleCancel,
  onCreateReview,
  onUpdateReview,
  onCreateReviewInAdventureTour,
  token,
  tourId,
}) => {
  const [form] = Form.useForm();

  const onClear = () => {
    form.resetFields();
  };

  const onSubmitCallBack = (isSuccess, rs) => {
    if (isSuccess) {
      handleOk(rs);
      onClear();
      handleCancel();
    } else {
      message.error(MESSAGE_ERROR);
    }
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (data && data.id) {
        values.id = data.id;
        onUpdateReview({ data: values, token, fCallBack: onSubmitCallBack });
      } else if (tourId) {
        // create review in tour and save to db
        onCreateReviewInAdventureTour({
          data: { ...values, tourId },
          token,
          fCallBack: onSubmitCallBack,
        });
      } else {
        // create review but not save relationship to table tour_review
        onCreateReview({ data: values, token, fCallBack: onSubmitCallBack });
      }
    } catch (err) {}
  };

  return (
    <ModalCommon
      visible={visible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      footer={null}
    >
      <div className="tour-detail-keyinfo u-page-detail">
        <div className="content">
          <Form
            form={form}
            name="dynamic_rule"
            className="content-form"
            initialValues={data}
          >
            <Form.Item
              label="Tác giả"
              name="author"
              className=""
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <Input placeholder="Nhập tên tác giả" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              className="rating"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <Rate allowHalf={true} />
            </Form.Item>

            <Form.Item
              label="Nội dung"
              name="content"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Nhập nội dung" />
            </Form.Item>

            <Form.Item
              label="Nội dung (English)"
              name="content_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Enter content" />
            </Form.Item>
            <Form.Item className="btn-group">
              <ButtonCommon type="default" onClick={onClear}>
                Xóa tất cả
              </ButtonCommon>
              <ButtonCommon type="primary" onClick={onSubmit}>
                Lưu
              </ButtonCommon>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ModalCommon>
  );
};

ModalAdventureTourDetailReview.propTypes = {};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, {
  onCreateReview,
  onUpdateReview,
  onCreateReviewInAdventureTour,
})(ModalAdventureTourDetailReview);
