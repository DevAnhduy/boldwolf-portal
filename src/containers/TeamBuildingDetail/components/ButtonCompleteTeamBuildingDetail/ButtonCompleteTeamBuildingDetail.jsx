import React, { useState } from 'react';
import { ButtonCommon } from '../../../../common';
import { MESSAGE_SUCCESS, MESSAGE_ERROR } from '../../../../utils/constant';
import { message } from 'antd';
import { getIdsFromArrObject } from '../../../../utils/function.utils';
import { onUpdateTeamBuilding, onCreateTeamBuilding, onUpdateCurrentStep } from '../../../../redux/teamBuilding/teamBuilding.actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const ButtonCompleteTeamBuildingDetail = ({ token, currentTeamBuilding, history,
    onUpdateTeamBuilding, onCreateTeamBuilding, onUpdateCurrentStep }) => {
    const [isLoading, setIsLoading] = useState(false)

    const validateItinearay = (values, valuesEn) => {
        if (!values || !valuesEn) {
            return false
        }

        const rs = values.findIndex(item => !item)
        if (rs !== -1) {
            message.error(`Vui lòng điền lịch trình trong ngày ${rs + 1}`)
            return false
        }

        const rsEn = valuesEn.findIndex(item => !item)
        if (rsEn !== -1) {
            message.error(`Vui lòng điền lịch trình bằng tiếng Anh trong ngày ${rsEn + 1}`)
            return false
        }

        return true
    }

    // const validateLocation = (value) => {
    //     const { description } = value
    //     // need to check only description (bc other fields are in the same form)
    //     if (!description) {
    //         return false
    //     }

    //     return true
    // }


    const validateData = () => {
        if (currentTeamBuilding) {
            // eslint-disable-next-line no-unused-vars
            const { title, key_info: keyInfo, itinerary, itinerary_en, images, reviews } = currentTeamBuilding
            let error;
            let step = -1;
            // info detail: need to check only title (bc other fields are in the same form)
            if (!title) {
                error = 'Vui lòng điền đầy đủ thông tin chung!'
                step = 0;
            } else if (!keyInfo || keyInfo.length < 1) { // key info
                error = 'Vui lòng điền ít nhất 1 thông tin chi tiết!'
                step = 1;
            } else if (!validateItinearay(itinerary, itinerary_en)) { // itinetary
                // error = 'Vui lòng điền đầy đủ thông tin lịch trình!'
                step = 2;

            } else if (!images || images.length < 1) { // images
                error = 'Vui lòng upload hình!'
                step = 3;

            } 
            // else if (!location || !validateLocation(location)) {
            //     error = 'Vui lòng điền đầy đủ thông tin địa điểm!'
            //     step = 4;

            // } else if (!service || service.length < 1) {
            //     error = 'Vui lòng điền ít nhất 1 dịch vụ!'
            //     step = 5;

            else if (!reviews || reviews.length < 1) {
                error = 'Vui lòng điền ít nhất 1 đánh giá!'
                step = 4;
            }

            if (error || step !== -1) {
                error && message.error(error)
                onUpdateCurrentStep(step)
                return false
            } else {
                return true
            }
        } else {
            message.error('Vui lòng điền đầy đủ thông tin!')
            onUpdateCurrentStep(0)
            return false;
        }
    }

    const formatTeamBuildingData = () => {
        // currentTeamBuilding.team_building_review = currentTeamBuilding.reviews
        const rs = {
            ...currentTeamBuilding,
            images: getIdsFromArrObject(currentTeamBuilding.images),
            reviews: getIdsFromArrObject(currentTeamBuilding.reviews)
            // location: [currentTeamBuilding.location.description, currentTeamBuilding.location.description_en, currentTeamBuilding.location.address]
        }

        delete rs.team_building_image;
        delete rs.team_building_review;
        //delete rs.reviews;
        delete rs.created_at;
        delete rs.updated_at;

        return rs;
    }

    const onFinishCallBack = (isSuccess) => {
        setIsLoading(false)
        if (isSuccess) {
            message.success(MESSAGE_SUCCESS)
            history.goBack()
        } else {
            message.error(MESSAGE_ERROR)
        }
    }

    const onFinish = () => {
        const isValid = validateData()
        if (isValid) {
            const formatData = formatTeamBuildingData(currentTeamBuilding)
            setIsLoading(true)
            if (currentTeamBuilding && currentTeamBuilding.id) { // update
                onUpdateTeamBuilding({ data: formatData, token, fCallBack: onFinishCallBack })
            } else { // add
                onCreateTeamBuilding({ data: formatData, token, fCallBack: onFinishCallBack })
            }
        }
    }

    return (
        <ButtonCommon type="primary" onClick={onFinish} loading={isLoading}>
            Hoàn tất
        </ButtonCommon>
    );
};


const mapStateToProps = (state) => ({
    token: state.user.token,
    currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
    currentStep: state.teamBuilding.currentStep,
});

export default compose(
    connect(mapStateToProps, 
        { onUpdateTeamBuilding, onCreateTeamBuilding, onUpdateCurrentStep }), withRouter)(ButtonCompleteTeamBuildingDetail);