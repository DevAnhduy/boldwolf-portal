import { Form, Input, message, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  BackButton,
  ButtonCommon,
  Heading,
  LoadingCommon,
  UploadSingleImg,
} from "../../common";
import {
  onCreateReview,
  onGetReviewDetail,
  onUpdateReview,
} from "../../redux/review/review.actions";
import {
  ACTIVE_KEY,
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
  MESSAGE_SUCCESS,
  MODE,
} from "../../utils/constant";
import "./ReviewDetail.scss";
export const ReviewDetailComponent = ({
  token,
  match,
  onGetReviewDetail,
  onCreateReview,
  onUpdateReview,
  history,
}) => {
  const [isLoading, setIsLoading] = useState(false); // get data
  const [isActionLoading, setIsActionLoading] = useState(false); // save or load img
  const [reviewData, setReviewData] = useState();
  const [idUpdate, setIdUpdate] = useState(); // get from params, when mode is UPDATE
  const [img, setImg] = useState(); // author_img: {isLoading, isSave, main, id}

  const [form] = Form.useForm();

  useEffect(() => {
    if (match.url.includes(MODE.UPDATE)) {
      setIdUpdate(match.params.id);
    }
  }, [match]);

  useEffect(() => {
    if (idUpdate) {
      setIsLoading(true);
      onGetReviewDetail({
        data: idUpdate,
        token,
        fCallBack: onGetDetailCallBack,
      });
    }
  }, [token, idUpdate, onGetReviewDetail]);

  const onGetDetailCallBack = (isSuccess, rs) => {
    setIsLoading(false);
    if (!isSuccess) {
      message.error(MESSAGE_ERROR);
    } else {
      setReviewData(rs);
      setImg(rs.author_image);
    }
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
      history.push(`/?${ACTIVE_KEY}=Review`);
    }
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!isImgValid()) {
        return;
      }

      if (img) {
        values["author_image"] = img.id;
      }

      setIsActionLoading(true);
      if (idUpdate) {
        onUpdateReview({
          token,
          data: { ...values, id: reviewData.id },
          fCallBack: onSubmitCallBack,
        });
      } else {
        onCreateReview({
          token,
          data: { ...values, is_home: true },
          fCallBack: onSubmitCallBack,
        });
      }
    } catch (err) {}
  };

  const isImgValid = () => {
    if (!img) {
      message.error("Vui l??ng t???i h??nh t??c gi???");
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
    <div className="blog-detail u-page-detail">
      <div className="top">
        <BackButton backPath={`/?${ACTIVE_KEY}=Review`} />
        <Heading>{idUpdate ? "C???p nh???t ????nh gi??" : "Th??m ????nh gi??"}</Heading>
      </div>

      <div className="content">
        <LoadingCommon isLoading={isLoading || (idUpdate && !reviewData)}>
          <Form
            form={form}
            name="dynamic_rule"
            className="content-form"
            initialValues={reviewData}
          >
            <Form.Item
              label="T??c gi???"
              name="author"
              className=""
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <Input placeholder="Nh???p t??n t??c gi???" />
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

            <UploadSingleImg
              required
              label="H??nh t??c gi???"
              onChange={onImgChanged}
              prevImg={img}
              mode={idUpdate ? MODE.UPDATE : MODE.ADD}
            />

            <Form.Item className="btn-group">
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
  );
};

ReviewDetailComponent.propTypes = {};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export const ReviewDetail = compose(
  connect(mapStateToProps, {
    onGetReviewDetail,
    onCreateReview,
    onUpdateReview,
  }),
  withRouter
)(ReviewDetailComponent);
