import { message } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ActionWithOpenModalInTableCommon, ButtonAddCommon, ModalConfirm, TableCommon } from '../../../../common';
import { onDeleteAdventureByType } from '../../../../redux/adventure/adventure.actions';
import { ADVENTURE_TYPE, MESSAGE_DELETE_SUCCESS, MESSAGE_ERROR, MODAL_CONFIRM_MSG_DELETE } from '../../../../utils/constant';
import { filterDataByType } from '../../../../utils/function.utils';
import ModalAdventure from '../ModalAdventure/ModalAdventure';


const AdventureSafety = ({ data, token, onDeleteAdventureByType }) => {
    const [visible, setVisible] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) // loading update
    const [modalDelete, setModalDelete] = useState({ id: null, visible: false }) // loading update

    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (_id, _row, index) => index + 1
        },
        {
            title: "Thứ tự",
            dataIndex: "order",
            key: "order",
            align: "center",
        },
        {
            title: "Nội dung",
            dataIndex: "heading",
            key: "heading"
        },
        {
            title: "Nội dung (English)",
            dataIndex: "heading_en",
            key: "heading_en"
        },
        {
            title: "",
            key: "id",
            dataIndex: "id",
            align: "center",
            render: (id) => <ActionWithOpenModalInTableCommon idRow={id} onClickDetail={showDetail} onClickDelete={openModalDelete}/>
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
        onDeleteAdventureByType({ token, data: modalDelete.id, fCallBack: onDeleteCallBack }, ADVENTURE_TYPE.SAFETY)
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
        <div className="safety-member u-page-data">
            <div className="add-btn">
                <ButtonAddCommon onClick={handleAdd} />
            </div>
            <div className="content">
                <TableCommon
                    columns={columns}
                    dataSource={data && filterDataByType(data, ADVENTURE_TYPE.SAFETY)}
                    bordered
                    pagination={false}
                />
            </div>
            {
                visible && 
                <ModalAdventure 
                    titleModal="Thám hiểm an toàn" 
                    type = {ADVENTURE_TYPE.SAFETY} 
                    isOnlyText
                    isOnlyHeading
                    visible={visible} 
                    handleCancel={handleCancelModal} 
                    idUpdate={idUpdate} />
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
        data: state.adventure.data,
        token: state.user.token
    }
}

export default connect(mapStateToProps, { onDeleteAdventureByType })(AdventureSafety);
