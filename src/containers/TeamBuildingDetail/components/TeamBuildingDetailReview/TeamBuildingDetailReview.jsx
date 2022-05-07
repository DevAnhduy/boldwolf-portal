import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  DeleteOutlined } from '@ant-design/icons';
import { ButtonAddCommon, ButtonPrevCommon } from '../../../../common';
import { onCreateTeamBuilding, onUpdateCurrentStep, onUpdateTeamBuilding, onUpdateUnsaveTeamBuilding } from '../../../../redux/teamBuilding/teamBuilding.actions';
import { onDeleteReviewInTeamBuilding, onDeleteReview } from '../../../../redux/review/review.actions';
import ButtonCompleteTeamBuildingDetail from '../ButtonCompleteTeamBuildingDetail/ButtonCompleteTeamBuildingDetail';
import ModalTeamBuildingDetailReview from '../ModalTeamBuildingDetailReview/ModalTeamBuildingDetailReview';
import './TeamBuildingDetailReview.scss';
import { Tooltip, message } from 'antd';
import { MESSAGE_ERROR } from '../../../../utils/constant';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

class TeamBuildingDetailReview extends Component {
    state = {
        reviews: [],
        visibleModal: false,
        dataUpdate: null,
    }

    componentDidMount() {
        const { currentTeamBuilding } = this.props;

        if (currentTeamBuilding && currentTeamBuilding.team_building_review) {
            this.setState({ reviews: [...currentTeamBuilding.team_building_review.map(item => item.review)] })
            this.props.onUpdateUnsaveTeamBuilding({ reviews: currentTeamBuilding.team_building_review })
        } 
    }


    openModal = (id) => {
        if (id) {
            const dataUpdate = this.state.reviews.find(item => item.id === id)
            this.setState({ visibleModal: true, dataUpdate })
        } else {
            this.setState({ visibleModal: true, dataUpdate: null })
        }
    }

    handleOk = (value) => {
        // todo
        const { dataUpdate, reviews } = this.state
        let newReviews;
        if (dataUpdate) {
            newReviews = reviews.map(item => item.id === dataUpdate.id ? value : item)
        } else {
            newReviews = [...reviews, value]
        }
        this.setState((prevState) => ({
            reviews: newReviews
        }), () => {
            this.props.onUpdateUnsaveTeamBuilding({ reviews: this.state.reviews })
        });

        this.handleCancel()

    }

    handleCancel = () => {
        // clear input in modal
        this.setState({ visibleModal: false })
    }

    onGotoPrev = () => {
        this.props.onUpdateCurrentStep(this.props.currentStep - 1)
    }

    onDeleteReviewCallBack = (isSuccess, id) => {
        if (isSuccess) {
            const newReviews = this.state.reviews.filter(item => item.id !==id)
            this.setState({reviews: newReviews})
            this.props.onUpdateUnsaveTeamBuilding({ reviews: newReviews })
            message.success('Delete reivew success')
        } else {
            message.error(MESSAGE_ERROR)
        }
    }

    onDeleteReview = (e, id) => {
        e.stopPropagation()
        const {token, match} = this.props;
        // get tourId
        const teamBuildingId = match.params.id

        if (teamBuildingId) {
            this.props.onDeleteReviewInTeamBuilding({ data: id, token, fCallBack: this.onDeleteReviewCallBack })
        } else {
            this.props.onDeleteReview({ isNotHome: true, data: id, token, fCallBack: this.onDeleteReviewCallBack})
            // message.warning("Vui lòng xóa sau khi tạo tour!")
        }
    }


    render() {
        const { match } = this.props;
        const { dataUpdate, reviews, visibleModal } = this.state
        return (
            <div className="teamBuilding-detail-review" >
                <ButtonAddCommon onClick={this.openModal} />
                <div className="content">
                    <div className="u-description">
                        Đánh giá từ khách hàng
               </div>
                    <ul className="list">
                        {
                            reviews.map(item => (
                                <li key={item.id} className="item" onClick={() => this.openModal(item.id)}>
                                    <div className="author">{item && item.author}</div>
                                    <div className="review-content">{item && item.content }</div>
                                    <div className="review-content-en">English: {item && item.content_en }</div>
                                    <Tooltip placement="right" title={"Xóa"}>
                                        <span className="icon-delete" onClick={(e) => this.onDeleteReview(e,item.id)}>
                                            <DeleteOutlined />
                                        </span>
                                    </Tooltip>

                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="btn-group">
                    <ButtonPrevCommon type="default" onClick={this.onGotoPrev}>Trở về</ButtonPrevCommon>
                    <ButtonCompleteTeamBuildingDetail/>
                </div>

                {
                    visibleModal &&
                    <ModalTeamBuildingDetailReview
                        teamBuildingId={match.params.id}
                        data={dataUpdate}
                        visible={visibleModal}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                    />
                }
            </div>
        );
    }
};


TeamBuildingDetailReview.propTypes = {

};

const mapStateToProps = (state) => ({
    token: state.user.token,
    currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
    currentStep: state.teamBuilding.currentStep,
});

export default compose(connect(mapStateToProps, 
    { onUpdateUnsaveTeamBuilding, 
        onCreateTeamBuilding, 
        onUpdateTeamBuilding, 
        onUpdateCurrentStep, 
        onDeleteReview,
        onDeleteReviewInTeamBuilding
     }), withRouter)
    (TeamBuildingDetailReview)

