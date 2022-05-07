import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
// import PropTypes from 'prop-types'
import { ButtonPrevCommon, UploadImg, ButtonNextCommon } from '../../../../common';
import { onUpdateCurrentStep, onUpdateUnsaveTeamBuilding } from '../../../../redux/teamBuilding/teamBuilding.actions';
import { MAX_IMG_TEAM_BUILDING, MODE, UPLOAD_TYPE } from '../../../../utils/constant';
import './TeamBuildingDetailImg.scss';


class TeamBuildingDetailImg extends Component {
   state = {
      images: { value: [] },
      value: undefined,  // value input
      visibleModal: false
   }

   componentDidMount() {
      const { currentTeamBuilding } = this.props;
      if (currentTeamBuilding && currentTeamBuilding.images) {
         this.setState({ images: { value: [...currentTeamBuilding.images] } })
      }
   }

   handleChangeImg = (value) => {
      this.setState({ images: { value } })
      this.props.onUpdateUnsaveTeamBuilding({ images: [...value] })
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
      const { match: { params: { id } } } = this.props
      const { images } = this.state
      return (
         <div className="teamBuilding-detail-img">
            <UploadImg 
               required 
               prevImg={images} 
               id = {id}
               mode={id ? MODE.UPDATE: MODE.ADD} 
               type={UPLOAD_TYPE.TEAM_BUILDING}
               label={`Hình ảnh (Tối đa ${MAX_IMG_TEAM_BUILDING} hình)`}
               onChange={this.handleChangeImg} 
               max = {MAX_IMG_TEAM_BUILDING}
               />

            <div className="btn-group">
               <ButtonPrevCommon type="default" onClick={this.onGotoPrev}>Trở về</ButtonPrevCommon>
               <ButtonNextCommon type="primary" onClick={this.onGotoNext}>
                  Tiếp theo
               </ButtonNextCommon>
            </div>
         </div>
      );
   }
}

TeamBuildingDetailImg.propTypes = {


};

const mapStateToProps = (state) => ({
   currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
   currentStep: state.teamBuilding.currentStep,
});


export default compose(connect(mapStateToProps,
   { onUpdateUnsaveTeamBuilding, onUpdateCurrentStep }), withRouter)(TeamBuildingDetailImg)