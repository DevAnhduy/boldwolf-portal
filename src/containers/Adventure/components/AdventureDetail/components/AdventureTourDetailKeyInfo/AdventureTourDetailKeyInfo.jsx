import { message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import { ButtonAddCommon, ButtonNextCommon, ButtonPrevCommon, KeyInfoItem, ModalKeyInfoItem } from '../../../../../../common';
import { onUpdateCurrentStep, onUpdateUnsaveTour } from '../../../../../../redux/adventure/adventure.actions';
import { MESSAGE_REQUIRED } from '../../../../../../utils/constant';
import './AdventureTourDetailKeyInfo.scss';


class AdventureTourDetailKeyInfo extends Component {
   state = {
      keyInfo: [],
      keyInfoEn: [],
      visibleModal: false,
      itemUpdatedValue: {
         vi: "",
         en: "",
      }
   }

   componentDidMount() {
      const { currentTour } = this.props;
      if (currentTour && currentTour.key_info) {
         this.setState({ keyInfo: currentTour.key_info })
      }

      if (currentTour && currentTour.key_info_en) {
         this.setState({ keyInfoEn: currentTour.key_info_en })
      }
   }

   componentWillUnmount() {
      this.props.onUpdateUnsaveTour({ key_info: this.state.keyInfo, key_info_en: this.state.keyInfoEn })
   }

   openModalCreate = () => {
      this.setState({ visibleModal: true, itemUpdatedValue: {}})
   }

   openModalUpdate = (value, valueEn) => {
      this.setState({ visibleModal: true, itemUpdatedValue: { vi: value, en: valueEn } })
   }

   handleSubmitKeyInfo = (value, valueEn) => {
      const { itemUpdatedValue, keyInfo, keyInfoEn } = this.state
      if (!value || !valueEn || !value.trim() || !valueEn.trim()) {
         message.error(MESSAGE_REQUIRED)
      } else if (itemUpdatedValue.vi && itemUpdatedValue.vi) { // update
         const index = keyInfo.findIndex((item, index) => (item === itemUpdatedValue.vi && keyInfoEn[index] === itemUpdatedValue.en))
         if (index !== -1) {
            keyInfo[index] = value
            keyInfoEn[index] = valueEn

            this.setState({ keyInfo, keyInfoEn });
         }
         this.handleCloseModal()
      } else {
         this.setState((prevState) => ({ // create
            keyInfo: [...prevState.keyInfo, value],
            keyInfoEn: [...prevState.keyInfoEn, valueEn]
         }));
         this.handleCloseModal()
      }

   }

   handleCloseModal = () => {
      // clear input in modal
      this.setState({ visibleModal: false })
   }


   onDeleteValue = (value, valueEn) => {
      let { keyInfo, keyInfoEn } = this.state
      const index = keyInfo.findIndex((item, index) => item === value && keyInfoEn[index] === valueEn)
      // console.log("value: ", value, index)
      keyInfo.splice(index, 1)
      keyInfoEn.splice(index, 1)
      if (index !== -1) {
         this.setState({ keyInfo, keyInfoEn })
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
      const { keyInfo, keyInfoEn, visibleModal, itemUpdatedValue } = this.state;
      return (
         <div className="tour-detail-keyinfo">
            <ButtonAddCommon onClick={this.openModalCreate} />
            <div className="content">
               <div className="u-description">
                  Key infomation
               </div>
               <ul className="list">
                  {
                     keyInfo.map((item, index) => <KeyInfoItem
                        key={item}
                        content={item} contentEn={keyInfoEn[index]}
                        onUpdate={this.openModalUpdate}
                        onDelete={this.onDeleteValue}
                     />)
                  }
               </ul>
            </div>

            <div className="btn-group">
               <ButtonPrevCommon type="default" onClick={this.onGotoPrev}>Trở về</ButtonPrevCommon>
               <ButtonNextCommon type="primary" onClick={this.onGotoNext}>Tiếp theo</ButtonNextCommon>
            </div>
            <ModalKeyInfoItem
               initialValue={itemUpdatedValue.vi}
               initialValueEn={itemUpdatedValue.en}
               visible={visibleModal}
               onCancel={this.handleCloseModal}
               onSubmit={this.handleSubmitKeyInfo} />
         </div>
      );
   }
}

AdventureTourDetailKeyInfo.propTypes = {


};

const mapStateToProps = (state) => ({
   currentTour: state.adventure.currentTour,
   currentStep: state.adventure.currentStep,
});


export default connect(mapStateToProps, { onUpdateUnsaveTour, onUpdateCurrentStep })(AdventureTourDetailKeyInfo)