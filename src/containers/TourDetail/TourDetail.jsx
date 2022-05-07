import React, { Component } from 'react';
import { BackButton, Heading } from '../../common';
import TourDetailInfo from './components/TourDetailInfo/TourDetailInfo';
import TourDetailKeyInfo from './components/TourDetailKeyInfo/TourDetailKeyInfo';
import TourDetailStep from './components/TourDetailStep/TourDetailStep';
import './TourDetail.scss';
import TourDetailItinerary from './components/TourDetailItinerary/TourDetailItinerary';
import TourDetailImg from './components/TourDetailImg/TourDetailImg';
import TourDetailLocation from './components/TourDetailLocation/TourDetailLocation';
import TourDetailServices from './components/TourDetailServices/TourDetailServices';
import { connect } from 'react-redux';
import { onUpdateCurrentStep, onDeleteUnsaveTour } from '../../redux/tour/tour.actions';
class TourDetailComponent extends Component {
    state = {
        lastedStep: 0
    }

    componentWillUnmount() {
        setTimeout (()=>{ // wating for last update in func will unmount
            const { currentTour, token, onDeleteUnsaveTour } = this.props;
            if (currentTour) { // mode create
                onDeleteUnsaveTour({ currentTour, token })
            }
        }, 1000)
    }

    onChangeStep = (value) => {
        const { currentStep, onUpdateCurrentStep } = this.props;
        if (value > currentStep) {
            this.setState({ lastedStep: value })
        }
        onUpdateCurrentStep(value)
    }

    getCurrentComponent = () => {
        const { currentStep } = this.props;

        switch (currentStep) {
            case 0:
                return <TourDetailInfo />
            case 1:
                return <TourDetailKeyInfo />
            case 2:
                return <TourDetailItinerary />
            case 3:
                return <TourDetailImg />
            case 4:
                return <TourDetailLocation />
            case 5:
                return <TourDetailServices />
            default:
                return <TourDetailInfo />
        }
    }

    render() {
        const { lastedStep } = this.state
        const { currentStep } = this.props
        return (
            <div className="blog-detail u-page-detail" >
                <div className="top">
                    <BackButton />
                    <Heading>Tour detail</Heading>
                </div>

                <TourDetailStep lastedStep={lastedStep} currentStep={currentStep} onChange={this.onChangeStep} />
                {
                    this.getCurrentComponent()
                }
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    currentTour: state.tour.currentTour,
    currentStep: state.tour.currentStep,

});

export const TourDetail = connect(mapStateToProps, { onUpdateCurrentStep, onDeleteUnsaveTour })(TourDetailComponent);


