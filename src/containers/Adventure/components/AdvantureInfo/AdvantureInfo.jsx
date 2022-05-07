import { Form, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  onGetInfoAdventure,
  onUpdateInfoAdventure,
} from "../../../../redux/adventure/adventure.actions";
import { ButtonCommon, LoadingCommon } from "../../../../common";
import {
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
  MESSAGE_UPDATE_SUCCESS,
} from "../../../../utils/constant";
import "./AdvantureInfo.scss";

const AdventureInfoComponent = ({
  data,
  token,
  onGetInfoAdventure,
  onUpdateInfoAdventure,
}) => {
  const [isLoading, setIsLoading] = useState(false); // loading update
  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true);
    if (!data) {
      onGetInfoAdventure({ token, fCallBack: fCallBackGetInfo });
    } else {
      fCallBackGetInfo(true, data);
    }
  }, [onGetInfoAdventure, token, data]);

  const fCallBackGetInfo = (isSuccess, rs) => {
    setIsLoading(false);
    if (!isSuccess) {
      message.error(MESSAGE_ERROR);
    }
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
      onUpdateInfoAdventure({
        data: { experience: "none", experience_en: "none", ...values },
        fCallBack: onSubmitCallBack,
        token,
      });
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
            initialValues={data}
          >
            <Form.Item
              label="Giới thiệu"
              name="introduction"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Giới thiệu"}
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              label="Giới thiệu (English)"
              name="introduction_en"
              className="introduction_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Introduction"}
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>

            <Form.Item
              label="Thiết bị thám hiểm"
              name="device"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Thiết bị thám hiểm"}
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              label="Thiết bị thám hiểm (English)"
              name="device_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Device"}
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>

            <Form.Item
              label="Thám hiểm an toàn"
              name="safety"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Thám hiểm an toàn"}
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              label="Thám hiểm an toàn (English)"
              name="safety_en"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextArea
                className="text-area-common"
                placeholder={"Safety"}
                autoSize={{ minRows: 5 }}
              />
            </Form.Item>

            {/* 
                        <Form.Item
                            label="Trải nghiệm"
                            name="experience"
                            rules={[
                                { required: true, message: MESSAGE_REQUIRED },
                            ]}
                        >
                            <TextArea
                                className="text-area-common"
                                placeholder={"Trải nghiệm"}
                                autoSize={{ minRows: 5 }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Trải nghiệm (English)"
                            name="experience_en"
                            rules={[
                                { required: true, message: MESSAGE_REQUIRED },
                            ]}
                        >
                            <TextArea
                                className="text-area-common"
                                placeholder={"Experiences"}
                                autoSize={{ minRows: 5 }}
                            />
                        </Form.Item> */}

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

// AdventureInfo.propTypes = {
// };

const mapStateToProps = (state) => ({
  data: state.adventure.info,
  token: state.user.token,
});

export const AdventureInfo = connect(mapStateToProps, {
  onGetInfoAdventure,
  onUpdateInfoAdventure,
})(AdventureInfoComponent);
