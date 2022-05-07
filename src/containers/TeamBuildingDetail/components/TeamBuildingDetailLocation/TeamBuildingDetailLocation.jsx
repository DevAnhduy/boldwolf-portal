import { Form } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  ButtonCommon,
  ButtonNextCommon,
  ButtonPrevCommon,
  TextAreaCommon,
} from "../../../../common";
import {
  onUpdateCurrentStep,
  onUpdateUnsaveTeamBuilding,
} from "../../../../redux/teamBuilding/teamBuilding.actions";
import { MESSAGE_REQUIRED } from "../../../../utils/constant";
import "./TeamBuildingDetailLocation.scss";

// location: (4) [description, description_en, longitude, latitude]
class TeamBuildingDetailLocation extends Component {
  form = React.createRef();
  state = {
    isLoading: false,
  };

  async componentDidMount() {
    const { currentTeamBuilding } = this.props;
    if (currentTeamBuilding && currentTeamBuilding.location) {
      await this.form.current.setFieldsValue({
        ...currentTeamBuilding.location,
      });
    }
  }

  async componentWillUnmount() {
    await this.onSubmit();
  }

  onClear = () => {
    this.form.current.resetFields();
  };

  onSubmit = async () => {
    try {
      const values = await this.form.current.validateFields();
      this.props.onUpdateUnsaveTeamBuilding({ location: { ...values } });
      return true;
    } catch (err) {
      // message.error("Dữ liệu địa điểm chưa được lưu do không hợp lệ!")
      return false;
    }
  };

  // STEP: data will be save when change step by func componentWillUnmount
  onChangeStep = async (step) => {
    if (await this.onSubmit()) {
      this.props.onUpdateCurrentStep(this.props.currentStep + step);
    }
  };

  onGotoNext = async () => {
    await this.onChangeStep(1);
  };

  onGotoPrev = async () => {
    await this.onChangeStep(-1);
  };

  render() {
    return (
      <div className="teamBuilding-location u-page-detail">
        <div className="content">
          <Form
            ref={this.form}
            name="teamBuilding-detail-form"
            className="content-form"
          >
            <Form.Item
              label="Mô tả"
              name="description"
              className="description"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextAreaCommon placeholder="Mô tả" />
            </Form.Item>

            <Form.Item
              label="Mô tả (English)"
              name="description_en"
              className="description"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextAreaCommon placeholder="Enter description" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              className="address"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextAreaCommon placeholder="Địa chỉ" />
            </Form.Item>

            <ButtonCommon type="default" onClick={this.onClear}>
              Xóa tất cả
            </ButtonCommon>
            <Form.Item className="btn-group">
              <div className="btn-group">
                <ButtonPrevCommon type="default" onClick={this.onGotoPrev}>
                  Trở về
                </ButtonPrevCommon>
                <ButtonNextCommon type="primary" onClick={this.onGotoNext}>
                  Tiếp theo
                </ButtonNextCommon>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
  currentStep: state.teamBuilding.currentStep,
});

export default compose(
  connect(mapStateToProps, { onUpdateUnsaveTeamBuilding, onUpdateCurrentStep }),
  withRouter
)(TeamBuildingDetailLocation);
