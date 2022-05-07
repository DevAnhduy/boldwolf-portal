import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import './SelectionCommon.scss'

const { Option } = Select;
export const SelectionCommon = ({ onChange, options, label, defaultValue, value }) => {
    const handleChange = (value) => {
        // console.log(value)
        onChange && onChange(value)
    }

    return (
        <div className="select-common">
            {
                label &&
                <div className="label u-title">
                    {label}
                </div>
            }
            <Select defaultValue={defaultValue}
                value={value}
                className="select" onChange={handleChange}>
                {
                    options.map(item => (
                        <Option key={item.key} value={item.key}>{item.value}</Option>
                    ))
                }
            </Select>
        </div>
    );
};

SelectionCommon.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array,
    value: PropTypes.any
};