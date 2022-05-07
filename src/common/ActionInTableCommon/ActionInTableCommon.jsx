import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './ActionInTableCommon.scss';


export const ActionInTableCommon = ({ linkToDetail, onClickDelete, idRow }) => {
    const handleDelete = () => {
        onClickDelete(idRow)
    }
    return (
        <div className="action">
            <div className="icon">
                <Tooltip
                    placement="right"
                    title='Chi tiết'
                >
                    <Link to={linkToDetail}>
                        <EditOutlined />
                    </Link>
                </Tooltip>
            </div>
            <div className="icon">
                <Tooltip
                    placement="right"
                    title='Xóa'
                >
                    <DeleteOutlined onClick={handleDelete}/>
                </Tooltip>
            </div>
        </div>
    );
};

export const ActionWithOpenModalInTableCommon = ({ onClickDetail, onClickDelete, idRow ,row}) => {
    const handleDelete = () => {
        onClickDelete(idRow,row)
    }

    const handleClickDetail = () => {
        onClickDetail(idRow,row)
    }

    return (
        <div className="action">
            <div className="icon">
                <Tooltip
                    placement="right"
                    title='Chi tiết'
                >
                   
                    <EditOutlined onClick={handleClickDetail}/>
                </Tooltip>
            </div>
            <div className="icon">
                <Tooltip
                    placement="right"
                    title='Xóa'
                >
                    <DeleteOutlined onClick={handleDelete} />
                </Tooltip>
            </div>
        </div>
    );
};

ActionInTableCommon.propTypes = {
    linkToDetail: PropTypes.string,
    onClickDelete: PropTypes.string,
    idRow: PropTypes.string || PropTypes.number
};

export const ActionUpdateBannerInTableCommon = ({ linkToDetail }) => {
    return (
        <div className="action">
            <div className="icon">
                <Tooltip
                    placement="top"
                    title='Chỉnh sửa'
                >
                    <Link to={linkToDetail}>
                        <EditOutlined />
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
};
