import React from 'react';
import { Input } from 'antd';
import './CustomInput.scss';

const CustomInput = ({ value,onChange, placeholder, type}) => {
    return ( <Input value={value} placeholder={placeholder} onChange={onChange} type={type}/>);
};

export default CustomInput;