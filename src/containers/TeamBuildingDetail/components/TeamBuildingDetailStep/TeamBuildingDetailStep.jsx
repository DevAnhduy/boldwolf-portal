import React from 'react'
import PropTypes from 'prop-types'
import './TeamBuildingDetailStep.scss';
import { StepCommon } from '../../../../common';

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
    // {
    //     id: 5,
    //     title: 'Địa điểm'
    // },
    // {
    //     id: 6,
    //     title: 'Dịch vụ'
    // },
    {
        id: 5,
        title: 'Đánh giá'
    }
]
const TeamBuildingDetailStep = ({ currentStep, onChange, lastedStep}) => {
   return (
       <StepCommon steps={steps} current={currentStep} onChange={onChange} lastedStep={lastedStep}/>
   )
};

TeamBuildingDetailStep.propTypes = {
    currentStep: PropTypes.number,
    lastedStep: PropTypes.number,
    onChange: PropTypes.func,

};

export default TeamBuildingDetailStep