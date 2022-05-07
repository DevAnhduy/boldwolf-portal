import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ButtonAddCommon, Heading, ModalConfirm, TableCommon } from '../../../../common';
import { onDeleteSafeByType } from '../../../../redux/safety/safety.actions';
import { MESSAGE_DELETE_SUCCESS, MESSAGE_ERROR, MODAL_CONFIRM_MSG_DELETE, SAFE_TYPE } from '../../../../utils/constant';
import { filterDataByType } from '../../../../utils/function.utils';
import ModalSafeRule from '../ModalSafeRule/ModalSafeRule';
import './SafeRule.scss';


const SafeRule = ({ safety, token, onDeleteSafeByType }) => {
    const [visible, setVisible] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) // loading update
    const [modalDelete, setModalDelete] = useState({ id: null, visible: false }) // loading update

    const columns = [
        {
            title: "Thứ tự",
            dataIndex: "order",
            key: "order",
            align: "center",
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.order - b.order,
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Nội dung (English)",
            dataIndex: "content_en",
            key: "content_en",
        },
        {
            title: "",
            key: "id",
            dataIndex: "id",
            align: "center",
            render: (id, row) => (
                <div className="safe-rule-container">
                    <Tooltip
                        placement="top"
                        title='Detail'
                    >
                        <EditOutlined onClick={() => { showDetail(id) }} />
                        <DeleteOutlined onClick={() => { openModalDelete(id) }} />
                    </Tooltip>
                </div>
            ),
        },
    ];

    const showDetail = (value) => {
        setIdUpdate(value);
        setVisible(true)
    }

    const handleCancelModal = () => {
        setVisible(false)
    }

    const handleAdd = () => {
        setIdUpdate(null);
        setVisible(true);
    }

    const openModalDelete = (id) => {
        setModalDelete({ visible: true, id })
    }

    const closeModalDelete = (id) => {
        setModalDelete({ visible: false, id })
    }

    const onDelete = () => {
        setIsDeleteLoading(true)
        onDeleteSafeByType({ token, data: modalDelete.id, fCallBack: onDeleteCallBack }, SAFE_TYPE.RULE)
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
        <div className="safe-rule u-page-data">
            <Heading>Quy Tắc An Toàn</Heading>
            <div className="add-btn">
                <ButtonAddCommon onClick={handleAdd} />
            </div>
            <div className="content">
                <TableCommon
                    columns={columns}
                    dataSource={safety && filterDataByType(safety, 'Rule')}
                    bordered
                    pagination={false}

                />
            </div>
            {
                visible &&
                <ModalSafeRule visible={visible} handleCancel={handleCancelModal} idUpdate={idUpdate} />
            }
            <ModalConfirm
                visible={modalDelete.visible}
                handleCancel={closeModalDelete}
                handleOk={onDelete}
                isLoading={isDeleteLoading}
            >
                {MODAL_CONFIRM_MSG_DELETE}
            </ModalConfirm>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        safety: state.safety.data,
        token: state.user.token
    }
}

export default connect(mapStateToProps, { onDeleteSafeByType })(SafeRule);