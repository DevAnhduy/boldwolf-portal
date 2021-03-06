import { Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ButtonCommon, LoadingCommon, SelectionCommon, ButtonNextCommon } from '../../../../common';
import { onGetTeamBuildingDetail, onUpdateCurrentStep, onUpdateUnsaveTeamBuilding } from '../../../../redux/teamBuilding/teamBuilding.actions';
import { MESSAGE_ERROR, MESSAGE_REQUIRED, MODE, OPTIONS_LEVEL } from '../../../../utils/constant';
import './TeamBuildingDetailInfo.scss';

class TeamBuildingDetailInfo extends Component {
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
        const { match, token, onGetTeamBuildingDetail, currentTeamBuilding } = this.props;
        const idUpdate = match.params.id

        if (match.url.includes(MODE.UPDATE) && idUpdate !== undefined) {
            this.setState({isLoading: true})
            if (!currentTeamBuilding || !currentTeamBuilding.id || (idUpdate.toString() !== currentTeamBuilding.id.toString())) {
                this.setState({isLoading: true}, () => {
                    onGetTeamBuildingDetail({ data: idUpdate, token, fCallBack: this.onGetDetailCallBack })
                })
            } else {
                this.setState({ isLoading: true }, () => {
                    this.onGetDetailCallBack(true, currentTeamBuilding || {})
                })
            }
        } else {
            this.setState({ isLoading: true }, () => {
                this.onGetDetailCallBack(true, currentTeamBuilding || {})
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
                message.error("Vui l??ng ch???n m???c ?????")
                return false
            }
            if (values.day < 1) {
                message.error("Vui l??ng nh???p s??? ng??y h???p l???")
                return false
            }

            values.level = level;

            this.props.onUpdateUnsaveTeamBuilding(values)
            return true
        } catch (err) {
            // message.error('Th??ng tin chung ch??a ???????c l??u do kh??ng h???p l???')
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
            <div className="teamBuilding--info u-page-detail">
                <div className="content">
                    <LoadingCommon isLoading={isLoading || (match.params.id && !data)}>
                        <Form
                            ref={this.form}
                            initialValues={data}
                            name="teamBuilding-detail-form"
                            className="content-form"
                        >
                            <Form.Item
                                label="Ti??u ?????"
                                name="title"
                                className="title"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Ti??u ?????" />
                            </Form.Item>

                            <Form.Item
                                label="Ti??u ????? (English)"
                                name="title_en"
                                className="title"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>

                            <Form.Item
                                label="M?? t??? (SEO)"
                                name="description"
                                className="title"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>

                            {/* <Form.Item
                                label="N???i dung"
                                name="content"
                                className="content"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="N???i dung" />
                            </Form.Item> */}

                            <Form.Item
                                label="S??? ng??y"
                                name="day"
                                className="day"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                    // { min: 1, message: "Ng??y ph???i l???n h??n 0" },
                                    // { max: 20, message: "Ng??y ph???i nh??? h??n 20" },
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>

                            {/* <Form.Item
                                label="Gi??"
                                name="price"
                                className="price"
                                rules={[
                                    { required: true, message: MESSAGE_REQUIRED },
                                ]}
                            >
                                <Input placeholder="Nh???p gi??" type="number" />
                            </Form.Item> */}

                            {/* Level */}
                            <SelectionCommon onChange={this.handleLevelChange} value={level} defaultValue="Easy" label="M???c ?????" options={OPTIONS_LEVEL} />

                            <Form.Item className="btn-group">
                                <ButtonCommon type="default" onClick={this.onClear} loading={isActionLoading}>
                                    X??a t???t c???
                        </ButtonCommon>
                                <ButtonNextCommon type="primary" onClick={this.onGotoNext} loading={isActionLoading}>
                                    Ti???p theo
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
    currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
    currentStep: state.teamBuilding.currentStep,
});

export default compose(
    connect(mapStateToProps,
        { onGetTeamBuildingDetail, onUpdateUnsaveTeamBuilding, onUpdateCurrentStep }),
    withRouter)(TeamBuildingDetailInfo)