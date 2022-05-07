// import PropTypes from 'prop-types';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ActionInTableCommon, ButtonAddCommon, LoadingCommon, ModalConfirm, RateCustom, TableCommon } from '../../common';
import { onDeleteReview, onGetAllReview } from '../../redux/review/review.actions';
import { MESSAGE_DELETE_SUCCESS, MESSAGE_ERROR, MODAL_CONFIRM_MSG_DELETE, ROUTE } from '../../utils/constant';
import { getDateFromTimestamp } from '../../utils/function.utils';
import './Review.scss';


const ReviewComponent = ({ history, token, reviewData, onGetAllReview, onDeleteReview}) => {
    const [isLoading, setIsLoading] = useState(false) // loading get data
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) // loading update
    const [ modalDelete, setModalDelete] = useState({id: null, visible: false}) // loading update

    useEffect(() => {
        if (!reviewData) {
            setIsLoading(true)
            onGetAllReview({ token, fCallBack: onGetAllCallBack})
        }
    }, [onGetAllReview, token, reviewData])

    const onGetAllCallBack = (isSuccess, rs) => {
        setIsLoading(false)
        if (!isSuccess) {
            message.error(MESSAGE_ERROR)
        }
    }
    const columns = [
        {
            title: "Thứ tự",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (_id, _row, index) => index + 1
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (data) => getDateFromTimestamp(data)
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            render: (_id, row) => <RateCustom value={row.rating} disabled allowHalf/>
        },
        {
            title: "",
            key: "id",
            dataIndex: "id",
            align: "center",
            render: (id, row) => (
                <ActionInTableCommon 
                    idRow={id}
                    linkToDetail={`${ROUTE.REVIEW}/update/${id}`} onClickDelete={openModalDelete}/>
            ),
        },
    ];

    const handleAdd = () => {
        history.push(`${ROUTE.REVIEW}/add`)
    }

    const openModalDelete = (id) => {
        setModalDelete({visible: true, id})
    }

    const closeModalDelete = (id) => {
        setModalDelete({ visible: false, id })
    }

    const onDelete = () => {
        setIsDeleteLoading(true)
        onDeleteReview({token, data: modalDelete.id, fCallBack: onDeleteCallBack})
    }

    const onDeleteCallBack = (isSuccess, rs) => {
        setIsDeleteLoading(false)
        setModalDelete({...modalDelete, visible: false})
        if (!isSuccess) {
            message.error(MESSAGE_ERROR)
        } else {
            message.success(MESSAGE_DELETE_SUCCESS)
        }
    }


    return (
        <div className="blog u-page-data">
            <div className="content">
                <div className="btn">
                    <ButtonAddCommon onClick={handleAdd}/>
                </div>
                <LoadingCommon isLoading={isLoading || !reviewData}>
                    <TableCommon
                        columns={columns}
                        dataSource={reviewData}
                        bordered
                        pagination={false}
                    />
                </LoadingCommon>
            </div>
            <ModalConfirm 
                visible={modalDelete.visible}
                handleCancel={closeModalDelete}
                handleOk={onDelete}
                isLoading = {isDeleteLoading}
            >
                { MODAL_CONFIRM_MSG_DELETE}
            </ModalConfirm>
        </div>
    );
};

ReviewComponent.propTypes = {
    
};

const mapStateToProps = (state) => ({ 
    reviewData: state.review.data,
    token: state.user.token,
});


export const Review = compose(connect(mapStateToProps, { onGetAllReview, onDeleteReview}), withRouter)(ReviewComponent)