import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
// import './RateCustom.scss'

export const RateCustom = ({ value, disabled, allowHalf}) => {
    return (
            <Rate disabled={disabled} value={value} allowHalf={allowHalf} />
    );
};

RateCustom.propTypes = {
    value: PropTypes.number,
    disabled: PropTypes.bool,
    allowHalf: PropTypes.bool
};