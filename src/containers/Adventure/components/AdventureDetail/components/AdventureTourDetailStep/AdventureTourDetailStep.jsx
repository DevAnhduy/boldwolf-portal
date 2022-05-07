import React from 'react'
import PropTypes from 'prop-types'
import './AdventureTourDetailStep.scss';
import { StepCommon } from '../../../../../../common';

const steps = [
    {
        id: 1, 
        title: 'Thông tin chung'
    },
    {
        id: 2,
        title: 'Chi tiết'
    },
    {
        id: 3,
        title: 'Lịch trình'
    },
    {
        id: 4,
        title: 'Hình ảnh'
    },
    {
        id: 5,
        title: 'Địa điểm'
    },
    {
        id: 6,
        title: 'Chuẩn Bị'
    },
    {
        id: 7,
        title: 'Đánh giá'
    }
]
const AdventureTourDetailStep = ({ currentStep, onChange, lastedStep}) => {
   return (
       <StepCommon steps={steps} current={currentStep} onChange={onChange} lastedStep={lastedStep}/>
   )
};

AdventureTourDetailStep.propTypes = {
    currentStep: PropTypes.number,
    lastedStep: PropTypes.number,
    onChange: PropTypes.func,

};

export default AdventureTourDetailStep