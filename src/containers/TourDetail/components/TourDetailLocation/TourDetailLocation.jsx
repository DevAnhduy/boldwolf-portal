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
  onUpdateUnsaveTour,
} from "../../../../redux/tour/tour.actions";
import { MESSAGE_REQUIRED } from "../../../../utils/constant";
import "./TourDetailLocation.scss";
import Geocode from "react-geocode";
import TextEditor from "../../../../common/TextEditor/TextEditor";

Geocode.setApiKey("AIzaSyC0S2EQ_aXfwEbSv51C42kGplebx9zJICI");
Geocode.setLanguage("en");
Geocode.setRegion("vn");

// location: (4) [description, description_en, longitude, latitude]
class TourDetailLocation extends Component {
  form = React.createRef();
  state = {
    isLoading: false,
    location: {},
  };

  async componentDidMount() {
    const { currentTour } = this.props;
    this.setState({
      location: currentTour.location ? currentTour.location : {},
    });
    if (currentTour && currentTour.location) {
      await this.form.current.setFieldsValue({ ...currentTour.location });
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

      // await Geocode.fromAddress(values.address).then(
      //     response => {
      //         const { lat, lng } = response.results[0].geometry.location;
      //         console.debug(lat, lng);
      //     },
      //     error => {
      //         console.error(error);
      //     }
      // );
      this.props.onUpdateUnsaveTour({ location: { ...values } });
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

  onTextChange = (value) => {
    //console.debug(value)
  };

  render() {
    return (
      <div className="tour-location u-page-detail">
        <div className="content">
          <Form
            ref={this.form}
            name="tour-detail-form"
            className="content-form"
          >
            <Form.Item
              label="Mô tả"
              name="description"
              className="description"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextEditor
                initialValues={this.state.location.description}
                placeholder="Mô tả"
              />
            </Form.Item>

            <Form.Item
              label="Mô tả (English)"
              name="description_en"
              className="description"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextEditor
                initialValues={this.state.location.description_en}
                placeholder="Enter description"
              />
            </Form.Item>

            <Form.Item
              label="Kinh độ"
              name="lng"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextAreaCommon placeholder="Kinh độ" />
            </Form.Item>

            <Form.Item
              label="Vĩ độ"
              name="lat"
              rules={[{ required: true, message: MESSAGE_REQUIRED }]}
            >
              <TextAreaCommon placeholder="Vĩ độ" />
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
  currentTour: state.tour.currentTour,
  currentStep: state.tour.currentStep,
});

export default compose(
  connect(mapStateToProps, { onUpdateUnsaveTour, onUpdateCurrentStep }),
  withRouter
)(TourDetailLocation);
