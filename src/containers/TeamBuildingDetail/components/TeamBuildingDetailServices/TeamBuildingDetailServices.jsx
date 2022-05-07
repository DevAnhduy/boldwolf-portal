import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import { ButtonAddCommon, ButtonNextCommon, ButtonPrevCommon, ModalCommon, TextAreaCommon } from '../../../../common';
import { onUpdateCurrentStep, onUpdateUnsaveTeamBuilding } from '../../../../redux/teamBuilding/teamBuilding.actions';
import { MESSAGE_REQUIRED } from '../../../../utils/constant';
import './TeamBuildingDetailServices.scss';

class TeamBuildingDetailServices extends Component {
    state = {
        service: [],
        service_en: [],
        value: undefined,  // value input
        valueEn: undefined,  // value input
        visibleModal: false
    }

    componentDidMount() {
        const { currentTeamBuilding } = this.props;
        if (currentTeamBuilding && currentTeamBuilding.service) {
            this.setState({ service: currentTeamBuilding.service })
        }

        if (currentTeamBuilding && currentTeamBuilding.service_en) {
            this.setState({ service_en: currentTeamBuilding.service_en })
        }
    }

    componentWillUnmount() {
        this.props.onUpdateUnsaveTeamBuilding({ service: this.state.service, service_en: this.state.service_en })

    }

    openModal = () => {
        this.setState({ visibleModal: true })
    }

    handleOk = () => {
        const {value, valueEn} = this.state;
        if (!value || !valueEn || !value.trim() || !valueEn.trim()) {
            message.error(MESSAGE_REQUIRED)
        } else {
            this.setState((prevState) => ({
                service: [...prevState.service, prevState.value],
                service_en: [...prevState.service, prevState.valueEn]
            }));
    
            this.handleCancel()
        }
    }

    handleCancel = () => {
        // clear input in modal
        this.setState({ value: '', valueEn: '', visibleModal: false })
    }

    onChangeValue = (text) => {
        this.setState({ value: text })
    }

    onChangeValueEn = (text) => {
        this.setState({ valueEn: text })
    }

    onDeleteValue = (value, valueEn) => {
        let { service, service_en } = this.state
        const index = service.findIndex((item, index) => item === value && service_en[index] === valueEn)
        // console.log("value: ", value, index)
        service.splice(index, 1)
        service_en.splice(index, 1)
        if (index !== -1) {
            this.setState({ service, service_en })
        }
    }

    // STEP: data will be save when change step by func componentWillUnmount
    onChangeStep = (step) => {
        this.props.onUpdateCurrentStep(this.props.currentStep + step)
    }

    onGotoNext = () => {
        this.onChangeStep(1)
    }

    onGotoPrev = () => {
        this.onChangeStep(-1)
    }

    render() {
        const {service, service_en} = this.state;
        return (
            <div className="teamBuilding-detail-services">
                <ButtonAddCommon onClick={this.openModal} />
                <div className="content">
                    <div className="u-description">
                        Dịch vụ đi kèm theo team building
               </div>
                    <ul className="list">
                        {
                            service.map((item, index) => (
                                <li key={item} className="item">
                                    <span className="icon">
                                        <CheckSquareOutlined />
                                    </span>
                                        <div className="item-content">
                                            <div className="">{item}</div>
                                            <div className="en">English: {service_en[index]}</div>
                                    </div>
                                    <Tooltip placement="right" title={"Xóa"}>
                                        <div className="icon-delete" onClick={() => this.onDeleteValue(item, service_en[index])}>
                                            <DeleteOutlined />
                                        </div>
                                    </Tooltip>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="btn-group">
                    <ButtonPrevCommon type="default" onClick={this.onGotoPrev}>Trở về</ButtonPrevCommon>
                    <ButtonNextCommon type="primary" onClick={this.onGotoNext}>Tiếp theo</ButtonNextCommon>
                </div>

                <ModalCommon
                    visible={this.state.visibleModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}>
                    <TextAreaCommon
                        value={this.state.value}
                        label="Nội dung"
                        placeholder="Nhập nội dung"
                        onChange={this.onChangeValue}
                    />
                    <TextAreaCommon
                        value={this.state.valueEn}
                        label="Nội dung (English)"
                        placeholder="Enter content"
                        onChange={this.onChangeValueEn}
                    />
                </ModalCommon>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
    currentStep: state.teamBuilding.currentStep,
});

export default connect(mapStateToProps, { onUpdateUnsaveTeamBuilding, onUpdateCurrentStep })(TeamBuildingDetailServices);