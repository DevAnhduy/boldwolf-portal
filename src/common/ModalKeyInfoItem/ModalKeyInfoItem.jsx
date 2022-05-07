import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalCommon } from '../ModalCommon/ModalCommon';
import { TextAreaCommon } from '../TextAreaCommon/TextAreaCommon';

export const ModalKeyInfoItem = ({ visible, onCancel, onSubmit, initialValue, initialValueEn }) => {
    const [value, setValue] = useState()
    const [valueEn, setValueEn] = useState()

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        setValueEn(initialValueEn)
    }, [initialValueEn])

    const handleSubmit = () => {
        onSubmit(value, valueEn)
    }

    const onChangeValue = (text) => {
        setValue(text)
    }

    const onChangeValueEn = (text) => {
        setValueEn(text)
    }
    const handleCancel = () => {
        onCancel()
        // clear modal
        setValue("")
        setValueEn("")
    }

    return (
        <ModalCommon
            visible={visible}
            handleOk={handleSubmit}
            handleCancel={handleCancel}>
            <TextAreaCommon
                value={value}
                label="Nội dung"
                placeholder="Nhập nội dung"
                onChange={onChangeValue}
            />
            <TextAreaCommon
                value={valueEn}
                label="Nội dung (English)"
                placeholder="Enter content"
                onChange={onChangeValueEn}
            />
        </ModalCommon>
    );
};

ModalKeyInfoItem.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
};
