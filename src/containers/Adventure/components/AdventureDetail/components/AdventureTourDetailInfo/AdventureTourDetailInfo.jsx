import { Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ButtonCommon, LoadingCommon, SelectionCommon, ButtonNextCommon } from '../../../../../../common';
import { onGetAdventureTourDetail, onUpdateCurrentStep, onUpdateUnsaveTour } from '../../../../../../redux/adventure/adventure.actions';
import { MESSAGE_ERROR, MESSAGE_REQUIRED, MODE, OPTIONS_LEVEL } from '../../../../../../utils/constant';
import './AdventureTourDetailInfo.scss';

class AdventureTourDetailInfo extends Component {
    form = React.createRef();

    state = {
        isLoading: false,
        data: null,
        idUpdate: null,
        level: 'Easy',
    }

    onGetDetailCallBack = (isSuccess, rs) => {
        if (!isSuccess) {
            this.setState({ isLoading: false })
            message.error(MESSAGE_ERROR)
        } else {
            this.setState({data: { ...rs }, level: rs.level || 'Easy' }, () => {
                this.setState({ isLoading: false })
            })
        }
    }

    componentDidMount() {
        const { match, token, onGetAdventureTourDetail, currentTour } = this.props;
        const idUpdate = match.params.id

        if (match.url.includes(MODE.UPDATE) && idUpdate !== undefined) {
            this.setState({isLoading: true})
            if (!currentTour || !currentTour.id || (idUpdate.toString() !== currentTour.id.toString())) {
                this.setState({isLoading: true}, () => {
                    onGetAdventureTourDetail({ data: idUpdate, token, fCallBack: this.onGetDetailCallBack })
                })
            } else {
                this.setState({ isLoading: true }, () => {
                    this.onGetDetailCallBack(true, currentTour || {})
                })
            }
        } else {
            this.setState({ isLoading: true }, () => {
                this.onGetDetailCallBack(true, currentTour || {})
            })
        }

    }

    async componentWillUnmount(){
        await this.onSubmit()
    }


    onClear = () => {
        this.form.current.resetFields()
    }

    /**
    * return success or failure
    */
    onSubmit = async () => {
        const {level } = this.state
        try {
            const values = await this.form.current.validateFields();
            // validate more attribute
            if (!level) {
                message.error("Vui lòng chọn mức độ")
                return false
            }
            if (values.day < 1) {
                message.error("Vui lòng nhập số ngày hợp lệ")
                return false
            }

            values.level = level;

            this.props.onUpdateUnsaveTour(values)
            return true
        } catch (err) {
            // message.error('Thông tin chung chưa được lưu do không hợp lệ')
            return false
        }
    }

    onGotoNext = async () => {
        const rs = await this.onSubmit()
        if (rs) {
            this.props.onUpdateCurrentStep(this.props.currentStep + 1)
        }
    }


    handleLevelChange = (value) => {
        this.setState({ isActionLoading: true, level: value }, () => {
            this.setState({ isActionLoading: false })
        })
    }

    render() {
        const { isLoading, isActionLoading, data, level } = this.state
        const { match} = this.props
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
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Tiêu đề" />
                            </Form.Item>

                            <Form.Item
                                label="Tiêu đề (English)"
                                name="title_en"
                                className="title"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả (SEO)"
                                name="description"
                                className="title"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
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
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Nhập giá" type="number" />
                            </Form.Item>

                            {/* Level */}
                            <SelectionCommon onChange={this.handleLevelChange} value={level} defaultValue="Easy" label="Mức độ" options={OPTIONS_LEVEL} />

                            <Form.Item className="btn-group">
                                <ButtonCommon type="default" onClick={this.onClear} loading={isActionLoading}>
                                    Xóa tất cả
                        </ButtonCommon>
                                <ButtonNextCommon type="primary" onClick={this.onGotoNext} loading={isActionLoading}>
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
    currentTour: state.adventure.currentTour,
    currentStep: state.adventure.currentStep,
});

export default compose(
    connect(mapStateToProps,
        { onGetAdventureTourDetail, onUpdateUnsaveTour, onUpdateCurrentStep }),
    withRouter)(AdventureTourDetailInfo)