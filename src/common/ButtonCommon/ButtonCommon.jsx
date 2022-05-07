import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRightOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import './ButtonCommon.scss'

export const ButtonCommon = ({ onClick, type, loading, children, containerStyle, icon, iconColor, ghost,htmlType }) => {
    const handleClick = (e) => {
        e.stopPropagation()
        onClick && onClick()
    }

    return (
        <Button className="custom-btn" htmlType={htmlType}
            ghost={ghost}
            containerstyle={containerStyle}
            icon={icon}
            iconcolor={iconColor}
            type={type} loading={loading} onClick={handleClick}>{children}</Button>
    );
};

ButtonCommon.propTypes = {
    onClick: PropTypes.func
};

export const ButtonNextCommon = (props) => {
    return (
        <ButtonCommon className="custom-btn" {...props} icon={<ArrowRightOutlined />} />
    );
};

export const ButtonPrevCommon = (props) => {
    return (
        <ButtonCommon className="custom-btn" {...props} icon={<ArrowLeftOutlined />} />
    );
};


export const ButtonAddCommon = ({ onClick, type, loading, children="Thêm", containerStyle, disabled}) => {
    const handleClick = (e) => {
        e.stopPropagation()
        onClick && onClick()
    }

    return (
        <div className="btn-add">
            <Button className="custom-btn"
                containerstyle={containerStyle}
                icon={<PlusOutlined />}
                disabled ={disabled}
                type="primary" loading={loading} onClick={handleClick}>{children}</Button>
        </div>
    );
};