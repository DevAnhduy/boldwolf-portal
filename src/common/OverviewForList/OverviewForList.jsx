import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";
import { LoadingCommon } from "../LoadingCommon/LoadingCommon";
import { ModalCommon } from "../ModalCommon/ModalCommon";
import {
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
  MESSAGE_SUCCESS,
  OVERVIEW_TYPE,
} from "../../utils/constant";
import { Form, Input, message } from "antd";
import { connect } from "react-redux";
import {
  onAddOverview,
  onGetAllOverview,
  onUpdateOverview,
} from "../../redux/overview/overview.actions";
const { TextArea } = Input;

const OverviewForListComponent = ({
  titleModal,
  type,
  token,
  overview,
  onGetAllOverview,
  onUpdateOverview,
  onAddOverview,
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const onGetAllCallBack = (isSuccess, rs) => {
      setIsLoading(false);
      if (isSuccess) {
        const dataByType = rs.find((item) => item.type === type) || null;
        setData(dataByType);
      } else {
        message.error(MESSAGE_ERROR);
      }
    };

    if (!overview) {
      setIsLoading(true);
      onGetAllOverview({ token, fCallBack: onGetAllCallBack });
    } else {
      const dataByType = overview.find((item) => item.type === type) || null;
      setData(dataByType);
    }
  }, [token, onGetAllOverview, overview, type]);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onClear = () => {
    form.resetFields();
  };

  const onSubmitCallBack = (isSuccess, rs) => {
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
      setIsActionLoading(true);
      if (data) {
        onUpdateOverview({
          token,
          data: { ...values, type, id: data.id },
          fCallBack: onSubmitCallBack,
        });
      } else {
        onAddOverview({
          token,
          data: { ...values, type },
          fCallBack: onSubmitCallBack,
        });
      }
    } catch (err) {}
  };

  return (
    <div className="overview-for-list">
      <ButtonCommon onClick={handleOpenModal} icon={<EditOutlined />}>
        Chỉnh sửa nội dung tổng quan
      </ButtonCommon>
      <ModalCommon
        title={titleModal}
        visible={visible}
        handleCancel={handleCancel}
        footer={null}
      >
        <div className="modal-about-team-member u-page-detail-modal u-page-detail">
          <div className="content-modal content">
            <LoadingCommon isLoading={isLoading}>
              <Form
                form={form}
                name="dynamic_rule"
                className="content-form"
                initialValues={data}
              >
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
                  <TextArea placeholder="Nhập nội dung (English)" />
                </Form.Item>
                {type === OVERVIEW_TYPE.TEAM_BUILDING ? (
                  <>
                    <Form.Item
                      label="Nội dung phụ"
                      name="sub_content"
                      className="content"
                      rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                    >
                      <TextArea placeholder="Nhập nội dung phụ" />
                    </Form.Item>

                    <Form.Item
                      label="Nội dung phụ (English)"
                      name="sub_content_en"
                      className="content_en"
                      rules={[{ required: true, message: MESSAGE_REQUIRED }]}
                    >
                      <TextArea placeholder="Nhập nội dung phụ(English)" />
                    </Form.Item>
                  </>
                ) : null}
                {/* {
                                    type !== OVERVIEW_TYPE.TEAM_BUILDING ? (
                                        <>
                                        <Form.Item
                                            label="Châm ngôn"
                                            name="maxim"
                                            className="maxim"
                                        >
                                            <TextArea placeholder="Nhập châm ngôn" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Châm ngôn (English)"
                                            name="maxim_en"
                                            className="maxim_en"
                                        >
                                            <TextArea placeholder="Nhập châm ngôn (English)" />
                                        </Form.Item>
                                        </>
                                    ): null
                                } */}

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
    </div>
  );
};

OverviewForListComponent.propTypes = {
  titleModal: PropTypes.string,
  type: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  overview: state.overview.data,
});

export const OverviewForList = connect(mapStateToProps, {
  onGetAllOverview,
  onUpdateOverview,
  onAddOverview,
})(OverviewForListComponent);
