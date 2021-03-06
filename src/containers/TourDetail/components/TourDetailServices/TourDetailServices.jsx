import { message } from "antd";
import React, { Component } from "react";
import htmlParser from "react-html-parser";
import { connect } from "react-redux";
import {
  ButtonAddCommon,
  ButtonPrevCommon,
  TableCommon,
} from "../../../../common";
import {
  onUpdateCurrentStep,
  onUpdateUnsaveTour,
} from "../../../../redux/tour/tour.actions";
import { MESSAGE_REQUIRED } from "../../../../utils/constant";
import ButtonCompleteTourDetail from "../ButtonCompleteTourDetail/ButtonCompleteTourDetail";
import ModalTourDetailServices from "./ModalTourDetailServices/ModalTourDetailServices";
class TourDetailServices extends Component {
  state = {
    service: [],
    service_en: [],
    value: undefined, // value input
    valueEn: undefined, // value input
    visibleModal: false,
    dataSrc: [],
    customer: "",
    customer_en: "",
    boldwolf: "",
    boldwolf_en: "",
  };
  formRef = React.createRef();
  componentDidMount() {
    const { currentTour } = this.props;

    if (currentTour && currentTour.service) {
      this.setState({ service: currentTour.service });
      this.setState({ customer: currentTour.service[0] });
      this.setState({ boldwolf: currentTour.service[1] });
    }

    if (currentTour && currentTour.service_en) {
      this.setState({ service_en: currentTour.service_en });
      this.setState({ customer_en: currentTour.service_en[0] });
      this.setState({ boldwolf_en: currentTour.service_en[1] });
    }
    if (currentTour) {
      let tmp = {};
      let tmp_en = {};
      if (currentTour.service_en && currentTour.service_en.length > 0) {
        tmp_en = {
          customer_en: currentTour.service_en[0],
          boldwolf_en: currentTour.service_en[1],
        };
      }
      if (currentTour.service && currentTour.service.length > 0) {
        tmp = {
          customer: currentTour.service[0],
          boldwolf: currentTour.service[1],
        };
      }
      const rs = { ...tmp, ...tmp_en };

      if (!(Object.keys(rs).length === 0 && rs.constructor === Object)) {
        this.setState({ dataSrc: [rs] });
      } else this.setState({ dataSrc: null });
    }
  }
  componentWillUnmount() {
    this.props.onUpdateUnsaveTour({
      service: this.state.service,
      service_en: this.state.service_en,
    });
  }

  openModal = () => {
    this.setState({ visibleModal: true });
  };

  handleOk = () => {
    const { boldwolf, boldwolf_en, customer, customer_en } = this.state;
    if (
      !boldwolf ||
      !boldwolf_en ||
      !boldwolf.trim() ||
      !boldwolf_en.trim() ||
      !customer ||
      !customer_en ||
      !customer.trim() ||
      !customer_en.trim()
    ) {
      message.error(MESSAGE_REQUIRED);
    } else {
      this.setState((prevState) => ({
        service: [customer, boldwolf],
        service_en: [customer_en, boldwolf_en],
      }));
      const tmp = [
        {
          customer,
          customer_en,
          boldwolf,
          boldwolf_en,
        },
      ];
      this.setState({ dataSrc: tmp });
      this.handleCancel();
    }
  };

  handleCancel = () => {
    // clear input in modal
    this.setState({
      customer: "",
      customer_en: "",
      boldwolf: "",
      boldwolf_en: "",
      dataSrc: [],
    });
    this.setState({ visibleModal: false });
  };

  onClose = () => {
    this.setState({ visibleModal: false });
  };
  onChangeCustomer = (text) => {
    this.setState({ customer: text });
  };

  onChangeCustomerEn = (text) => {
    this.setState({ customer_en: text });
    return text;
  };

  onChangeBoldWolf = (text) => {
    this.setState({ boldwolf: text });
  };

  onChangeBoldWolfEn = (text) => {
    this.setState({ boldwolf_en: text });
  };

  onDeleteValue = (value, valueEn) => {
    let { service, service_en } = this.state;
    const index = service.findIndex(
      (item, index) => item === value && service_en[index] === valueEn
    );
    // console.log("value: ", value, index)
    service.splice(index, 1);
    service_en.splice(index, 1);
    if (index !== -1) {
      this.setState({ service, service_en });
    }
  };

  // STEP: data will be save when change step by func componentWillUnmount
  onChangeStep = (step) => {
    this.props.onUpdateCurrentStep(this.props.currentStep + step);
  };

  onGotoNext = () => {
    this.onChangeStep(1);
  };

  onGotoPrev = () => {
    this.onChangeStep(-1);
  };
  onFinish = (value) => {
    const { boldwolf, boldwolf_en, customer, customer_en } = value;
    if (!boldwolf || !boldwolf_en || !customer || !customer_en) {
      message.error(MESSAGE_REQUIRED);
    } else {
      this.setState((prevState) => ({
        service: [customer, boldwolf],
        service_en: [customer_en, boldwolf_en],
      }));
      this.props.onUpdateUnsaveTour({
        service: [customer, boldwolf],
        service_en: [customer_en, boldwolf_en],
      });
      const tmp = [
        {
          customer,
          customer_en,
          boldwolf,
          boldwolf_en,
        },
      ];
      this.setState({ dataSrc: tmp });
    }
    this.setState({ visibleModal: false });
  };
  column = [
    {
      title: "Kh??ch H??ng Chu???n B???",
      dataIndex: "customer",
      key: "customer",
      render: (data) => {
        return <div>{htmlParser(data)}</div>;
      },
    },
    {
      title: "Kh??ch H??ng Chu???n B??? (English)",
      dataIndex: "customer_en",
      key: "customer_en",
      render: (data) => {
        return <div>{htmlParser(data)}</div>;
      },
    },
    {
      title: "BoldWolf Chu???n B???",
      dataIndex: "boldwolf",
      key: "boldwolf",
      render: (data) => {
        return <div>{htmlParser(data)}</div>;
      },
    },
    {
      title: "BoldWolf Chu???n B??? (English)",
      dataIndex: "boldwolf_en",
      key: "boldwolf_en",
      render: (data) => {
        return <div>{htmlParser(data)}</div>;
      },
    },
  ];

  render() {
    return (
      <div className="tour-detail-services">
        <ButtonAddCommon onClick={this.openModal}>S???a</ButtonAddCommon>
        <div className="content">
          <div className="u-description">Chu???n B???</div>
          <TableCommon
            columns={this.column}
            dataSource={this.state.dataSrc}
          ></TableCommon>
        </div>

        <div className="btn-group">
          <ButtonPrevCommon type="default" onClick={this.onGotoPrev}>
            Tr??? v???
          </ButtonPrevCommon>
          <ButtonCompleteTourDetail />
        </div>
        <ModalTourDetailServices
          handleFinish={this.onFinish}
          visible={this.state.visibleModal}
          handleCancel={this.onClose}
          data={this.state.dataSrc}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTour: state.tour.currentTour,
  currentStep: state.tour.currentStep,
});

export default connect(mapStateToProps, {
  onUpdateUnsaveTour,
  onUpdateCurrentStep,
})(TourDetailServices);
