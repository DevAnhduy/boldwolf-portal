import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import { UploadImg, ButtonPrevCommon, ButtonNextCommon } from '../../../../../../common';
import { onUpdateUnsaveTour, onUpdateCurrentStep } from '../../../../../../redux/adventure/adventure.actions';
import { MODE, MAX_IMG_TOUR, UPLOAD_TYPE } from '../../../../../../utils/constant';
import './AdventureTourDetailImg.scss';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';


class AdventureTourDetailImg extends Component {
   state = {
      images: { value: [] },
      value: undefined,  // value input
      visibleModal: false
   }

   componentDidMount() {
      const { currentTour } = this.props;
      if (currentTour && currentTour.images) {
         this.setState({ images: { value: [...currentTour.images] } })
      }
   }

   componentWillUnmount() {
      // const data = getIdsFromArrObject(this.state.images.value)
      // this.props.onUpdateUnsaveTour({ images: [...this.state.images.value] })

   }

   handleChangeImg = (value) => {
      this.setState({ images: { value } })
      this.props.onUpdateUnsaveTour({ images: [...value] })
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
         <div className="tour-detail-img">
            <UploadImg
               prevImg={images}
               id={id}
               mode={id ? MODE.UPDATE : MODE.ADD}
               type={UPLOAD_TYPE.TOUR}
               label={`Hình ảnh (Tối đa ${MAX_IMG_TOUR} hình)`}
               max={MAX_IMG_TOUR}
               onChange={this.handleChangeImg} />

            <div className="btn-group">
               <ButtonPrevCommon type="default" onClick={this.onGotoPrev}>
                  Trở về
                                </ButtonPrevCommon>
               <ButtonNextCommon type="primary" onClick={this.onGotoNext}>
                  Tiếp theo
                                </ButtonNextCommon>
            </div>
         </div>
      );
   }
}

AdventureTourDetailImg.propTypes = {


};

const mapStateToProps = (state) => ({
   currentTour: state.adventure.currentTour,
   currentStep: state.adventure.currentStep,
});


export default compose(
   connect(mapStateToProps, 
   { onUpdateUnsaveTour, onUpdateCurrentStep }), withRouter)
   (AdventureTourDetailImg)