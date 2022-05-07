import React from 'react';
import './ModalConfirm.scss'
import PropTypes from 'prop-types';
import { Modal } from 'antd';


export const ModalConfirm = ({ title, visible, handleOk, handleCancel, footer, children, isLoading }) => {
    return (
        <Modal
            title={title || "Xác nhận"}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Đồng ý"
            cancelText="Hủy"
            confirmLoading ={isLoading}
        >
            {children}
        </Modal>
    )
};

ModalConfirm.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node,
};