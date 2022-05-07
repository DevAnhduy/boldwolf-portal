import React, { Component } from 'react';
import { BackButton, Heading } from '../../common';
import TeamBuildingDetailInfo from './components/TeamBuildingDetailInfo/TeamBuildingDetailInfo';
import TeamBuildingDetailKeyInfo from './components/TeamBuildingDetailKeyInfo/TeamBuildingDetailKeyInfo';
import TeamBuildingDetailStep from './components/TeamBuildingDetailStep/TeamBuildingDetailStep';
import './TeamBuildingDetail.scss';
import TeamBuildingDetailItinerary from './components/TeamBuildingDetailItinerary/TeamBuildingDetailItinerary';
import TeamBuildingDetailImg from './components/TeamBuildingDetailImg/TeamBuildingDetailImg';
import { connect } from 'react-redux';
import { onUpdateCurrentStep, onDeleteUnsaveTeamBuilding } from '../../redux/teamBuilding/teamBuilding.actions';
// import TeamBuildingDetailLocation from './components/TeamBuildingDetailLocation/TeamBuildingDetailLocation';
// import TeamBuildingDetailServices from './components/TeamBuildingDetailServices/TeamBuildingDetailServices';
import TeamBuildingDetailReview from './components/TeamBuildingDetailReview/TeamBuildingDetailReview';
class TeamBuildingDetailComponent extends Component {
    state = {
        lastedStep: 0
    }

    componentDidMount(){
        this.props.onUpdateCurrentStep(0)
    }

    componentWillUnmount() {
        setTimeout(() => { // wating for last update in func will unmount
            const { currentTeamBuilding, token, onDeleteUnsaveTeamBuilding } = this.props;
            if (currentTeamBuilding) {
                onDeleteUnsaveTeamBuilding({ currentTeamBuilding, token })
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
                return <TeamBuildingDetailInfo />
            case 1:
                return <TeamBuildingDetailKeyInfo />
            case 2:
                return <TeamBuildingDetailItinerary />
            case 3:
                return <TeamBuildingDetailImg />
            // case 4:
            //     return <TeamBuildingDetailLocation />
            // case 5:
            //     return <TeamBuildingDetailServices />
            case 4:
                return <TeamBuildingDetailReview />
            default:
                return <TeamBuildingDetailInfo />
        }
    }

    render() {
        const { lastedStep } = this.state
        const { currentStep } = this.props

        return (
            <div className="blog-detail u-page-detail" >
                <div className="top">
                    <BackButton />
                    <Heading>TeamBuilding detail</Heading>
                </div>

                <TeamBuildingDetailStep lastedStep={lastedStep} currentStep={currentStep} onChange={this.onChangeStep} />
                {
                    this.getCurrentComponent()
                }
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
    currentStep: state.teamBuilding.currentStep,

});

export const TeamBuildingDetail = connect(mapStateToProps, { onUpdateCurrentStep, onDeleteUnsaveTeamBuilding })(TeamBuildingDetailComponent);


