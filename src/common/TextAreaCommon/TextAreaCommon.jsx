import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './TextAreaCommon.scss'

export const TextAreaCommon = ({ onChange, placeholder, minRows, maxRows, label, value }) => {
    const handleChange = (e) => {
        // console.log(e.target.value)
        onChange && onChange(e.target.value)
    }

    return (
        <div className="text-area-common">
            {
                label &&
                <div className="label u-title">
                    {label}:
                </div>
            }
                <Input.TextArea
                    // className="text-area-common"
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    autoSize={{ minRows: minRows || 3, maxRows: maxRows || 5 }}
                />
        </div>
    );
};

TextAreaCommon.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
    label: PropTypes.string,
};