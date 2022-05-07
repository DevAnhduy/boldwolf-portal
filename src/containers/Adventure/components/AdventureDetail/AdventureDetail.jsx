import React, { Component } from 'react';
import { BackButton, Heading } from '../../../../common';
import '../../../TourDetail/TourDetail.scss';
import { connect } from 'react-redux';
import { onUpdateCurrentStep, onDeleteUnsaveTour } from '../../../../redux/adventure/adventure.actions';
import AdventureTourDetailImg from './components/AdventureTourDetailImg/AdventureTourDetailImg';
import AdventureTourDetailInfo from './components/AdventureTourDetailInfo/AdventureTourDetailInfo';
import AdventureTourDetailItinerary from './components/AdventureTourDetailItinerary/AdventureTourDetailItinerary';
import AdventureTourDetailKeyInfo from './components/AdventureTourDetailKeyInfo/AdventureTourDetailKeyInfo';
import AdventureTourDetailLocation from './components/AdventureTourDetailLocation/AdventureTourDetailLocation';
import AdventureTourDetailReview from './components/AdventureTourDetailReview/AdventureTourDetailReview';
import AdventureTourDetailServices from './components/AdventureTourDetailServices/AdventureTourDetailServices';
import AdventureTourDetailStep from './components/AdventureTourDetailStep/AdventureTourDetailStep';
class AdventureDetailComponent extends Component {
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
                return <AdventureTourDetailInfo />
            case 1:
                return <AdventureTourDetailKeyInfo />
            case 2:
                return <AdventureTourDetailItinerary />
            case 3:
                return <AdventureTourDetailImg />
            case 4:
                return <AdventureTourDetailLocation />
            case 5:
                return <AdventureTourDetailServices />
            case 6:
                return <AdventureTourDetailReview />
            default:
                return <AdventureTourDetailInfo />
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

                <AdventureTourDetailStep lastedStep={lastedStep} currentStep={currentStep} onChange={this.onChangeStep} />
                {
                    this.getCurrentComponent()
                }
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    currentTour: state.adventure.currentTour,
    currentStep: state.adventure.currentStep,

});

export const AdventureDetail = connect(mapStateToProps, { onUpdateCurrentStep, onDeleteUnsaveTour })(AdventureDetailComponent);


