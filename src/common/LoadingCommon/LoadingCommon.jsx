import React from 'react';
import PropTypes from 'prop-types';
import { message, Skeleton } from 'antd';
import { ModalCommon } from '../ModalCommon/ModalCommon';
import './LoadingCommon.scss'


export const LoadingCommon = ({isLoading, children}) => {
    if (isLoading){
        return (
            <div className="loading-common">
                <div id="triangle3">
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    }
    return (
        <>
            { children}
        </>
    )
};

LoadingCommon.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node,
};


export const LoadingImgCommon = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <div className="loading-img-common">
                <Skeleton active paragraph={{ rows: 5}}/>
            </div>
        );
    }
    return (
        <>
            {children}
        </>
    )
};

LoadingImgCommon.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node,
};



export const ModalLoading = ({ isLoading }) => {
    const handleCancel = () => {
        message.warning("Đang tải hình, vui lòng chờ.")
    }
    if (isLoading) {
        return (
            <ModalCommon visible={isLoading} footer={null} handleCancel={handleCancel}>
                <div className="modal-loading-content">
                    <div className="description">Đang tải hình, vui lòng chờ ...</div>
                    <LoadingCommon isLoading={true}/>

                </div>
            </ModalCommon>
        );
    }
    return <></>
};

ModalLoading.propTypes = {
    isLoading: PropTypes.bool,
};