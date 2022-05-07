import { DeleteOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ButtonAddCommon, ButtonPrevCommon } from '../../../../../../common';
import { onDeleteReviewInAdventureTour } from '../../../../../../redux/review/review.actions';
import { onCreateAdventureTour, onUpdateCurrentStep, onUpdateAdventureTour, onUpdateUnsaveTour } from '../../../../../../redux/adventure/adventure.actions';
import { MESSAGE_ERROR } from '../../../../../../utils/constant';
import ButtonCompleteAventureTourDetail from '../ButtonCompleteAventureTourDetail/ButtonCompleteAventureTourDetail';
import ModalAdventureTourDetailReview from '../ModalAdventureTourDetailReview/ModalAdventureTourDetailReview';
import './AdventureTourDetailReview.scss';

class AdventureTourDetailReview extends Component {
    state = {
        reviews: [],
        visibleModal: false,
        dataUpdate: null,
    }

    componentDidMount() {
        const { currentTour } = this.props;
        if (currentTour && currentTour.reviews) {
            this.setState({ reviews: [...currentTour.reviews] })
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
            this.props.onUpdateUnsaveTour({ reviews: this.state.reviews })
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
            this.props.onUpdateUnsaveTour({ reviews: newReviews })
        } else {
            message.error(MESSAGE_ERROR)
        }
    }

    onDeleteReview = (e, id) => {
        e.stopPropagation()
        const {token, match} = this.props;
        // get tourId
        const tourId = match.params.id
        if (tourId) {
            this.props.onDeleteReviewInAdventureTour({ data: id, token, fCallBack: this.onDeleteReviewCallBack})
        } else {
            this.props.onDeleteReview({ isNotHome: true, data: id, token, fCallBack: this.onDeleteReviewCallBack })
            // message.warning("Vui lòng xóa sau khi tạo tour!")
        }
    }


    render() {
        const { match } = this.props;
        const { dataUpdate, reviews, visibleModal } = this.state
        return (
            <div className="tour-detail-review" >
                <ButtonAddCommon onClick={this.openModal} />
                <div className="content">
                    <div className="u-description">
                        Đánh giá từ khách hàng
               </div>
                    <ul className="list">
                        {
                            reviews.map(item => (
                                <li key={item.id} className="item" onClick={() => this.openModal(item.id)}>
                                    <div className="author">{item.author}</div>
                                    <div className="review-content">{item.content}</div>
                                    <div className="review-content-en">English: {item.content_en}</div>
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
                    <ButtonCompleteAventureTourDetail/>
                </div>

                {
                    visibleModal &&
                    <ModalAdventureTourDetailReview
                        tourId={match.params.id}
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


AdventureTourDetailReview.propTypes = {

};

const mapStateToProps = (state) => ({
    token: state.user.token,
    currentTour: state.adventure.currentTour,
    currentStep: state.adventure.currentStep,
});

export default compose(connect(mapStateToProps, 
    { onUpdateUnsaveTour, onCreateAdventureTour, onUpdateAdventureTour, onUpdateCurrentStep, onDeleteReviewInAdventureTour }), 
    withRouter)
    (AdventureTourDetailReview)

