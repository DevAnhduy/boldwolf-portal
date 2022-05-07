import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ButtonAddCommon, Heading, ModalConfirm, TableCommon } from '../../../../common';
import { onDeleteAboutByType } from '../../../../redux/about/about.actions';
import { MESSAGE_DELETE_SUCCESS, MESSAGE_ERROR, MODAL_CONFIRM_MSG_DELETE, ABOUT_TYPE } from '../../../../utils/constant';
import { filterDataByType } from '../../../../utils/function.utils';
import ModalAboutMaxim from '../ModalAboutMaxim/ModalAboutMaxim';
import './AboutMaxim.scss';

const AboutMaxim = ({ about, token, onDeleteAboutByType }) => {
    const [visible, setVisible] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) // loading update
    const [modalDelete, setModalDelete] = useState({ id: null, visible: false }) // loading update

    // useEffect(() => {
    //     const checkIsHasData = async () => {
    //         let dataMaxim = await filterDataByType(about, 'Maxim');
    //         console.log("Data Maxim: ", dataMaxim)
    //         if (dataMaxim === []) {
    //             setIsHasData(false)
    //         }
    //         else {
    //             setIsHasData(true)
    //         }
    //     }
    //     checkIsHasData()
    // }, [about, isHasData])

    const columns = [
        // {
        //     title: "Thứ tự",
        //     dataIndex: "id",
        //     key: "id",
        //     align: "center",
        //     defaultSortOrder: 'ascend',
        //     sorter: (a, b) => a.order - b.order,
        // },
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
                <div className="about-overview-container">
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
        onDeleteAboutByType({ token, data: modalDelete.id, fCallBack: onDeleteCallBack }, ABOUT_TYPE.MAXIM)
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
        <div className="about-maxim u-page-data">
            <Heading>Câu Châm Ngôn</Heading>

            <div className="add-btn">
                <ButtonAddCommon onClick={handleAdd} />
            </div>


            <div className="content">
                <TableCommon
                    columns={columns}
                    dataSource={about && filterDataByType(about, 'Maxim')}
                    bordered
                    pagination={false}

                />
            </div>
            {
                visible &&
                <ModalAboutMaxim visible={visible} handleCancel={handleCancelModal} idUpdate={idUpdate} />
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
        about: state.about.data,
        token: state.user.token
    }
}

export default connect(mapStateToProps, { onDeleteAboutByType })(AboutMaxim);
