import React from 'react';
import PropTypes from 'prop-types';
import './InputCommon.scss'
import CustomInput from './CustomInput/CustomInput';

export const InputCommon = ({ displayPreviewImage, onChange, placeholder, type = 'string' }) => {
    const handleChange = (e) => {
        onChange && onChange(e.target.value)
    }

    return (
        <div className="input-common">
            <CustomInput placeholder={placeholder} onChange={displayPreviewImage ? displayPreviewImage : handleChange} type={type} />
        </div>
    );
};

InputCommon.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
};

export const InputWithLabelCommon = ({ value,displayPreviewImage, label, onChange, placeholder, type = 'string' }) => {
    const handleChange = (e) => {
        onChange && onChange(e.target.value)
    }
    return (
        <div className="input-common input-with-label-common">
            <div className="label u-title">
                {label}
            </div>
            <CustomInput value={value} type={type} placeholder={placeholder} onChange={displayPreviewImage ? displayPreviewImage : handleChange} />
        </div>
    );
};

InputWithLabelCommon.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};