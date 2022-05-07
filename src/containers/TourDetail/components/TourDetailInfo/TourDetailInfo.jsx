import { Form, Input, message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  ButtonCommon,
  LoadingCommon,
  SelectionCommon,
  ButtonNextCommon,
} from "../../../../common";
import {
  onGetTourDetail,
  onUpdateCurrentStep,
  onUpdateUnsaveTour,
} from "../../../../redux/tour/tour.actions";
import {
  MESSAGE_ERROR,
  MESSAGE_REQUIRED,
  MODE,
  OPTIONS_LEVEL,
  OPTIONS_TYPE,
} from "../../../../utils/constant";
import "./TourDetailInfo.scss";

class TourDetailInfo extends Component {
  form = React.createRef();

  state = {
    isLoading: false,
    data: null,
    idUpdate: null,
    level: "Easy",
    type: null,
  };

  onGetDetailCallBack = (isSuccess, rs) => {
    if (!isSuccess) {
      this.setState({ isLoading: false });
      message.error(MESSAGE_ERROR);
    } else {
      this.setState(
        {
          data: { ...rs },
          level: rs.level || "Easy",
          type: rs.type || "Glamping",
        },
        () => {
          this.setState({ isLoading: false });
        }
      );
    }
  };

  componentDidMount() {
    const { match, token, onGetTourDetail, currentTour } = this.props;
    const idUpdate = match.params.id;

    if (match.url.includes(MODE.UPDATE) && idUpdate !== undefined) {
      this.setState({ isLoading: true });
      if (
        !currentTour ||
        !currentTour.id ||
        idUpdate.toString() !== currentTour.id.toString()
      ) {
        this.setState({ isLoading: true }, () => {
          onGetTourDetail({
            data: idUpdate,
            token,
            fCallBack: this.onGetDetailCallBack,
          });
        });
      } else {
        this.setState({ isLoading: true }, () => {
          this.onGetDetailCallBack(true, currentTour || {});
        });
      }
    } else {
      this.setState({ isLoading: true }, () => {
        this.onGetDetailCallBack(true, currentTour || {});
      });
    }
  }

  async componentWillUnmount() {
    await this.onSubmit();
  }

  onClear = () => {
    this.form.current.resetFields();
  };

  /**
   * return success or failure
   */
  onSubmit = async () => {
    const { level } = this.state;
    const { type } = this.state;
    try {
      const values = await this.form.current.validateFields();
      // validate more attribute
      if (!level) {
        message.error("Vui lòng chọn mức độ");
        return false;
      }
      if (values.day < 1) {
        message.error("Vui lòng nhập số ngày hợp lệ");
        return false;
      }

      values.level = level;
      values.type = type;

      this.props.onUpdateUnsaveTour(values);
      return true;
    } catch (err) {
      // message.error('Thông tin chung chưa được lưu do không hợp lệ')
      return false;
    }
  };

  onGotoNext = async () => {
    const rs = await this.onSubmit();
    if (rs) {
      this.props.onUpdateCurrentStep(this.props.currentStep + 1);
    }
  };

  handleLevelChange = (value) => {
    this.setState({ isActionLoading: true, level: value }, () => {
      this.setState({ isActionLoading: false });
    });
  };

  handleTypeChange = (value) => {
    this.setState({ isActionLoading: true, type: value }, () => {
      this.setState({ isActionLoading: false });
    });
  };

  render() {
    const { isLoading, isActionLoading, data, level, type } = this.state;
    const { match } = this.props;
    return (
      <div className="tour--info u-page-detail">
        <div className="content">
          <LoadingCommon isLoading={isLoading || (match.params.id && !data)}>
            <Form
              ref={this.form}
              initialValues={data}
              name="tour-detail-form"
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
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item
                label="Mô tả (SEO)"
                name="description"
                className="title"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Mô tả" />
              </Form.Item>

              {/* <Form.Item
                                label="Nội dung"
                                name="content"
                                className="content"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Nội dung" />
                            </Form.Item> */}

              <Form.Item
                label="Số ngày"
                name="day"
                className="day"
                rules={[
                  { required: true, message: MESSAGE_REQUIRED },
                  // { min: 1, message: "Ngày phải lớn hơn 0" },
                  // { max: 20, message: "Ngày phải nhỏ hơn 20" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Giá"
                name="price"
                className="price"
                rules={[{ required: true, message: MESSAGE_REQUIRED }]}
              >
                <Input placeholder="Nhập giá" type="number" />
              </Form.Item>

              {/* Level */}
              <SelectionCommon
                onChange={this.handleLevelChange}
                value={level}
                defaultValue="Easy"
                label="Mức độ"
                options={OPTIONS_LEVEL}
              />
              <SelectionCommon
                onChange={this.handleTypeChange}
                value={type}
                defaultValue="Glamping"
                label="Loại"
                options={OPTIONS_TYPE}
              />

              <Form.Item className="btn-group">
                <ButtonCommon
                  type="default"
                  onClick={this.onClear}
                  loading={isActionLoading}
                >
                  Xóa tất cả
                </ButtonCommon>
                <ButtonNextCommon
                  type="primary"
                  onClick={this.onGotoNext}
                  loading={isActionLoading}
                >
                  Tiếp theo
                </ButtonNextCommon>
              </Form.Item>
            </Form>
          </LoadingCommon>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  currentTour: state.tour.currentTour,
  currentStep: state.tour.currentStep,
});

export default compose(
  connect(mapStateToProps, {
    onGetTourDetail,
    onUpdateUnsaveTour,
    onUpdateCurrentStep,
  }),
  withRouter
)(TourDetailInfo);
