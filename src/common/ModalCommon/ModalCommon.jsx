import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import './ModalCommon.scss'



export const ModalCommon = ({ title, visible, handleOk, handleCancel, footer, children, okText, cancelText }) => {
    return (
        <Modal
            title={title || ""}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={footer}
            okText={okText}
            cancelText={cancelText}
        >
            { children }
        </Modal>
    );
};

ModalCommon.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.node,
    handleOK: PropTypes.func,
    handleCancel: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
};