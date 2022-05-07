import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './KeyInfoItem.scss';

export const KeyInfoItem = ({ content, contentEn, onDelete, onUpdate }) => {
    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(content, contentEn)
    }

    const handleUpdate = (e) => {
        e.stopPropagation()
        onUpdate(content, contentEn)
    }
    return (
        <li className="key-info-item" onClick={handleUpdate}>
            <span className="icon">
                <CheckSquareOutlined />
            </span>
            <div className="item-content">
                <div className="">{content}</div>
                <div className="en">English: {contentEn}</div>
            </div>
            <Tooltip placement="right" title={"Xóa"}>
                <div className="icon-delete" onClick={handleDelete}>
                    <DeleteOutlined />
                </div>
            </Tooltip>
        </li>
    );
};

KeyInfoItem.propTypes = {
    content: PropTypes.string,
    contentEn: PropTypes.string,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
};
