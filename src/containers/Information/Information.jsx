import { Form, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ButtonCommon, LoadingCommon } from "../../common";
import { onGetHomeInfo, onUpdateHomeInfo } from "../../redux/home/home.actions";
import {
  MESSAGE_REQUIRED,
  MESSAGE_UPDATE_SUCCESS,
  MESSAGE_ERROR,
} from "../../utils/constant";
import "./Information.scss";

const InformationComponent = ({
  home,
  token,
  onGetHomeInfo,
  onUpdateHomeInfo,
}) => {
  const [isLoading, setIsLoading] = useState(false); // loading update
  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true);
    if (!home.data) {
      onGetHomeInfo({ token, fCallBack: fCallBackGetInfo });
    } else {
      fCallBackGetInfo(true, home.data);
    }
  }, [onGetHomeInfo, token, home.data]);

  const fCallBackGetInfo = (isSuccess, rs) => {
    if (!isSuccess) {
      message.error(MESSAGE_ERROR);
    } else {
    }
    setIsLoading(false);
  };

  const onClear = () => {
    form.resetFields();
  };

  const onSubmitCallBack = (isSuccess, rs) => {
    if (!isSuccess) {
      message.error(MESSAGE_ERROR);
    } else {
      message.success(MESSAGE_UPDATE_SUCCESS);
    }

    setIsLoading(false);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      // console.log("value: ", values)
      // setIsLoading(true)
      onUpdateHomeInfo({ data: values, fCallBack: onSubmitCallBack, token });
    } catch (err) {}
  };

  return (
    <div className="u-page-detail">
      {/* <LoadingCommon /> */}
      <div className="content">
        <LoadingCommon isLoading={isLoading}>
          <Form
            form={form}
            name="dynamic_rule"
            className="content-form"
            initialValues={home.data}
          >
            <Form.Item
              label="Tiêu đề giới thiệu"
              name="title_introduction"
              className="introduction"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề giới thiệu" />
            </Form.Item>

            <Form.Item
              label="Giới thiệu"
              name="introduction"
              className="introduction"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Introduction"}
                autoSize={{ minRows: 3 }}
              />
            </Form.Item>

            <Form.Item
              label="Tiêu đề giới thiệu (English)"
              name="title_introduction_en"
              className="introduction"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề giới thiệu (English)" />
            </Form.Item>

            <Form.Item
              label="Giới thiệu (English)"
              name="introduction_en"
              className="introduction_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Introduction (English)"}
                autoSize={{ minRows: 3 }}
              />
            </Form.Item>

            <Form.Item
              label="Tiêu đề Adventure"
              name="title_best_seller"
              className="best_seller"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề Adventure" />
            </Form.Item>

            <Form.Item
              label="Mô tả Adventure"
              name="best_seller"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Mô tả Adventure" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề Adventure (English)"
              name="title_best_seller_en"
              className="best_seller"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề Adventure (English)" />
            </Form.Item>

            <Form.Item
              label="Mô tả Adventure (English)"
              name="best_seller_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Mô tả Adventure (English)" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề Team Building"
              name="title_team_building"
              className="team_building"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề Team Building" />
            </Form.Item>

            <Form.Item
              label="Mô tả Team Building"
              name="team_building"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Team Buiding" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề Team Building (English)"
              name="title_team_building_en"
              className="team_building"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề Team Building (English)" />
            </Form.Item>

            <Form.Item
              label="Mô tả Team Building (English)"
              name="team_building_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Team Buiding (English)" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề Value"
              name="title_value"
              className="value"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề Value" />
            </Form.Item>

            <Form.Item
              label="Mô tả Value"
              name="value"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Mô tả Value" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề Value (English)"
              name="title_value_en"
              className="value"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề Value (English)" />
            </Form.Item>

            <Form.Item
              label="Mô tả Value (English)"
              name="value_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Mô tả Value (English)" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề Blog"
              name="title_blog"
              className="blog"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề Blog" />
            </Form.Item>

            <Form.Item
              label="Mô tả Blog"
              name="blog"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Mô tả Blog" />
            </Form.Item>

            <Form.Item
              label="Tiêu đề Blog (English)"
              name="title_blog_en"
              className="value"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Tiêu đề Value" />
            </Form.Item>

            <Form.Item
              label="Mô tả Blog (English)"
              name="blog_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Mô tả Blog (English)" />
            </Form.Item>

            <Form.Item
              label="Câu châm ngôn"
              name="maxim"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Châm ngôn" />
            </Form.Item>

            <Form.Item
              label="Câu châm ngôn (English)"
              name="maxim_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea placeholder="Châm ngôn (English)" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              className="phone"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              className="email"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item label="Facebook fanpage link" name="facebook_link">
              <Input placeholder="Facebook fanpage" />
            </Form.Item>

            <Form.Item label="Instagram link" name="instagram_link">
              <Input placeholder="Instagram link" />
            </Form.Item>

            <Form.Item label="LinkedIn link" name="twitter_link">
              <Input placeholder="LinkedIn link" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              className="address"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Địa chỉ"}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ (English)"
              name="address_en"
              className="address_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Địa chỉ (English)"}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>

            <Form.Item className="btn-group">
              <ButtonCommon type="default" onClick={onClear}>
                Xóa tất cả
              </ButtonCommon>
              <ButtonCommon
                type="primary"
                onClick={onSubmit}
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

// InformationComponent.propTypes = {
// };

const mapStateToProps = (state) => ({
  home: state.home,
  token: state.user.token,
});

export const Information = connect(mapStateToProps, {
  onGetHomeInfo,
  onUpdateHomeInfo,
})(InformationComponent);
