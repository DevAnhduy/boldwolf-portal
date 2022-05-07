import React, { useEffect, useState } from 'react';
import { ActionInTableCommon, Heading, LoadingCommon, ModalConfirm, TableCommon, ButtonAddCommon } from '../../common';
import { onDeleteBlog, onGetAllBlog } from '../../redux/blog/blog.actions';
import { MESSAGE_DELETE_SUCCESS, MESSAGE_ERROR, MODAL_CONFIRM_MSG_DELETE, ROUTE } from '../../utils/constant';
import { connect } from 'react-redux';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import './Blog.scss';


const Blog = ({ history, onGetAllBlog, token, onDeleteBlog, blogData }) => {
    const [isLoading, setIsLoading] = useState(false) // loading get data
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) // loading update
    const [modalDelete, setModalDelete] = useState({ id: null, visible: false }) // loading update

    useEffect(() => {
        if (!blogData) {
            setIsLoading(true)
            onGetAllBlog({ fCallBack: fCallBackGetAllTour, token })
        }
    }, [onGetAllBlog, token, blogData])

    const fCallBackGetAllTour = (isSuccess, rs) => {
        setIsLoading(false)
        // todo
        if (!isSuccess) {
            message.error(MESSAGE_ERROR)
        }
    }

    const columns = [
        {
            title: "Thứ tự",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (_id, _row, index) => index + 1
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            render: value => `${value}`
        },
        {
            title: "Tiêu đề (English)",
            dataIndex: "title_en",
            key: "title_en",
            render: value => `${value}`
        },
        {
            title: "",
            key: "id",
            dataIndex: "id",
            align: "center",
            render: (id, row) => (
                <ActionInTableCommon
                    idRow={id}
                    linkToDetail={`${ROUTE.BLOG}/update/${id}`} onClickDelete={openModalDelete} />
            ),
        },
    ];

    const handleAdd = () => {
        history.push(`${ROUTE.BLOG}/add`)
    }

    const openModalDelete = (id) => {
        setModalDelete({ visible: true, id })
    }

    const closeModalDelete = (id) => {
        setModalDelete({ visible: false, id })
    }

    const onDelete = () => {
        setIsDeleteLoading(true)
        onDeleteBlog({ token, data: modalDelete.id, fCallBack: onDeleteCallBack })
    }

    const onDeleteCallBack = (isSuccess, rs) => {
        setIsDeleteLoading(false)
        setModalDelete({ ...modalDelete, visible: false })
        if (!isSuccess) {
            message.error(MESSAGE_ERROR)
        } else {
            message.success(MESSAGE_DELETE_SUCCESS)
        }
    }

    return (
        <div className="blog u-page-data">
            <Heading>Blog</Heading>
            <div className="add-btn">
                <ButtonAddCommon onClick={handleAdd} />
            </div>
            <div className="content">
                <LoadingCommon isLoading={isLoading || !blogData}>
                    <TableCommon
                        columns={columns}
                        dataSource={blogData}
                        bordered
                        pagination={false}
                    />
                </LoadingCommon>
                <ModalConfirm
                    visible={modalDelete.visible}
                    handleCancel={closeModalDelete}
                    handleOk={onDelete}
                    isLoading={isDeleteLoading}
                >
                    {MODAL_CONFIRM_MSG_DELETE}
                </ModalConfirm>
            </div>
        </div>
    );
};

Blog.propTypes = {

};

const mapStateToProps = (state) => ({ blogData: state.blog.data, token: state.user.token });

export const BlogContainer = compose(connect(mapStateToProps, { onGetAllBlog, onDeleteBlog }), withRouter)(Blog)