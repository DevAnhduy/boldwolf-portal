// import PropTypes from 'prop-types';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ActionInTableCommon, ActionUpdateBannerInTableCommon, ButtonAddCommon, Heading, LoadingCommon, ModalConfirm, TableCommon, OverviewForList, ButtonCommon } from '../../common';
import { onDeleteTour, onGetAllTour } from '../../redux/tour/tour.actions';
import { MESSAGE_DELETE_SUCCESS, MESSAGE_ERROR, MODAL_CONFIRM_MSG_DELETE, OVERVIEW_TYPE, ROUTE } from '../../utils/constant';
import { formatPrice } from '../../utils/function.utils';
import './TourContainer.scss'
const Tour = ({ history, token, onGetAllTour, onDeleteTour, tourData, currentTour }) => {
    const [isLoading, setIsLoading] = useState(false) // loading get data
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) // loading update
    const [modalDelete, setModalDelete] = useState({ id: null, visible: false }) // loading update
    
    
    useEffect(() => {
        if (!tourData) {
            setIsLoading(true)
            onGetAllTour({ fCallBack: fCallBackGetAllTour, token})
        }
    }, [onGetAllTour, token, tourData])

    const fCallBackGetAllTour = (isSuccess, rs) => {
        setIsLoading(false)
        // todo
        if (!isSuccess) {
            message.error(MESSAGE_ERROR)
        } 
    }

    const columns = [
        {
            title: "",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (_id, _row, index) => index + 1
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Thời gian",
            dataIndex: "day",
            key: "day",
            render: value => `${value} ngày`
        },
        {
            title: "Mức độ",
            dataIndex: "level",
            key: "level",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: value => formatPrice(value)

        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Banner",
            key: 'banner',
            align: "center",
            render: (_key, row) => (<ActionUpdateBannerInTableCommon linkToDetail={`${ROUTE.BANNER}${ROUTE.TOURS}/${row.id}`}/>)
        },
        {
            title: "",
            key: "id",
            dataIndex: "id",
            align: "center",
            render: (id, row) => (
                <ActionInTableCommon
                    idRow={id}
                    linkToDetail={`${ROUTE.TOURS}/update/${id}`} onClickDelete={openModalDelete} />
            ),
        },
    ];

    const handleAdd = () => {
        history.push(`${ROUTE.TOURS}/add`)
    }
    const handleGlamping = ()=>{
        history.push(`${ROUTE.TOURS}/glamping`)
    }

    const openModalDelete = (id) => {
        setModalDelete({ visible: true, id })
    }

    const closeModalDelete = (id) => {
        setModalDelete({ visible: false, id })
    }

    const onDelete = () => {
        setIsDeleteLoading(true)
        onDeleteTour({ token, data: modalDelete.id, fCallBack: onDeleteCallBack })
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
        <div className="tours u-page-data">
            <Heading>Aventure</Heading>
            <div className="add-btn">
                <div className="button-flex">
                    <OverviewForList titleModal="Phần tổng quan list tour" type = {OVERVIEW_TYPE.TOUR}/>
                    <div className='button-glamping'>
                        <ButtonCommon onClick={handleGlamping}>Chỉnh Sửa Glamping</ButtonCommon>
                    </div>
                </div>
                <ButtonAddCommon onClick={handleAdd} disabled={currentTour !== null}/>
            </div>
            <div className="content">
                <LoadingCommon isLoading={isLoading || !tourData}>
                    <TableCommon
                        columns={columns}
                        dataSource={tourData}
                        bordered
                        pagination={false}
                    />
                </LoadingCommon>
            </div>
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

// TourContainer.propTypes = {
// };

const mapStateToProps = (state) => ({ 
    tourData: state.tour.data, 
    token: state.user.token,
    currentTour: state.tour.currentTour
});

export const TourContainer = connect(mapStateToProps, { onGetAllTour, onDeleteTour})(Tour)
