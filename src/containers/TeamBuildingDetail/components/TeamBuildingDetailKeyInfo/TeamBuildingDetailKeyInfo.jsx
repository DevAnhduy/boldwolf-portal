import { message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import { ButtonAddCommon, ButtonNextCommon, ButtonPrevCommon, KeyInfoItem, ModalKeyInfoItem } from '../../../../common';
import { onUpdateCurrentStep, onUpdateUnsaveTeamBuilding } from '../../../../redux/teamBuilding/teamBuilding.actions';
import { MESSAGE_REQUIRED } from '../../../../utils/constant';
import './TeamBuildingDetailKeyInfo.scss';


class TeamBuildingDetailKeyInfo extends Component {
   state = {
      keyInfo: [],
      keyInfoEn: [],
      itemUpdatedValue: {
         vi: "",
         en: "",
      },
      visibleModal: false
   }

   componentDidMount() {
      const { currentTeamBuilding } = this.props;
      if (currentTeamBuilding && currentTeamBuilding.key_info) {
         this.setState({ keyInfo: currentTeamBuilding.key_info })
      }

      if (currentTeamBuilding && currentTeamBuilding.key_info_en) {
         this.setState({ keyInfoEn: currentTeamBuilding.key_info_en })
      }
   }

   componentWillUnmount() {
      this.props.onUpdateUnsaveTeamBuilding({ key_info: this.state.keyInfo, key_info_en: this.state.keyInfoEn })
   }

   openModalCreate = () => {
      this.setState({ visibleModal: true, itemUpdatedValue: {} })
   }

   openModalUpdate = (value, valueEn) => {
      this.setState({ visibleModal: true, itemUpdatedValue: { vi: value, en: valueEn } })
   }

   handleCloseModal = () => {
      this.setState({ visibleModal: false })
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
         <div className="teamBuilding-detail-keyinfo">
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
                        onDelete={this.onDeleteValue}
                        onUpdate={this.openModalUpdate}
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

TeamBuildingDetailKeyInfo.propTypes = {


};

const mapStateToProps = (state) => ({
   currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
   currentStep: state.teamBuilding.currentStep,
});


export default connect(mapStateToProps, { onUpdateUnsaveTeamBuilding, onUpdateCurrentStep })(TeamBuildingDetailKeyInfo)