import { Form, Input, message } from "antd";
import React, { useState, useEffect } from "react";
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
  onCreateBlog,
  onGetBlogDetail,
  onUpdateBlog,
} from "../../redux/blog/blog.actions";
import {
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
  MESSAGE_SUCCESS,
  MODE,
  ROUTE,
} from "../../utils/constant";
import "./BlogDetail.scss";
import { MarkdownEditor } from "../../common/MarkdownEditor/MarkdownEditor";

const BlogDetailComponent = ({
  token,
  match,
  history,
  onGetBlogDetail,
  onCreateBlog,
  onUpdateBlog,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false); // save or load img
  const [data, setData] = useState("");
  const [idUpdate, setIdUpdate] = useState(); // get from params, when mode is UPDATE
  const [img, setImg] = useState();

  useEffect(() => {
    if (match.url.includes(MODE.UPDATE)) {
      setIdUpdate(match.params.id);
    }
  }, [match]);

  useEffect(() => {
    if (idUpdate) {
      const onGetDetailCallBack = (isSuccess, rs) => {
        setIsLoading(false);
        if (!isSuccess) {
          message.error(MESSAGE_ERROR);
        } else {
          setData(rs);
          setImg(rs.blog_image);
        }
      };

      setIsLoading(true);
      onGetBlogDetail({
        data: idUpdate,
        token,
        fCallBack: onGetDetailCallBack,
      });
    }
  }, [token, idUpdate, onGetBlogDetail]);

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
      history.push(`${ROUTE.BLOG}`);
    }
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      // validate more attribute
      if (!isImgValid()) {
        return;
      }

      if (img) {
        values["blog_image"] = img.id;
      }

      setIsActionLoading(true);
      if (idUpdate) {
        onUpdateBlog({
          token,
          data: { ...values, id: idUpdate },
          fCallBack: onSubmitCallBack,
        });
      } else {
        onCreateBlog({ token, data: values, fCallBack: onSubmitCallBack });
      }
    } catch (err) {}
  };

  const isImgValid = () => {
    if (!img) {
      message.error("Vui lòng tải hình blog");
      return false;
    }
    return true;
  };

  // IMG
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
        <BackButton />
        <Heading>Blog detail</Heading>
      </div>

      <div className="content">
        <LoadingCommon isLoading={isLoading || (idUpdate && !data)}>
          <Form
            initialValues={data}
            form={form}
            name="blog-detail-form"
            className="content-form"
          >
            <Form.Item
              label="Tiêu đề"
              name="title"
              className="title"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <Input placeholder="Tiêu đề" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề (English)"
              name="title_en"
              className="title"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <Input placeholder="Tiêu đề (English)" />
            </Form.Item>

            <Form.Item
              label="Mô tả (SEO)"
              name="description"
              className="title"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <Input placeholder="Mô tả" />
            </Form.Item>

            <Form.Item
              label="Nội dung"
              name="content"
              className="content"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <MarkdownEditor token={token} initValue={data && data.content} />
            </Form.Item>

            <Form.Item
              label="Nội dung (English)"
              name="content_en"
              className="content_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <MarkdownEditor
                token={token}
                initValue={data && data.content_en}
              />
            </Form.Item>

            <UploadSingleImg
              required
              label="Hình blog"
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
  );
};

BlogDetailComponent.propTypes = {};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export const BlogDetail = compose(
  connect(mapStateToProps, { onGetBlogDetail, onCreateBlog, onUpdateBlog }),
  withRouter
)(BlogDetailComponent);
