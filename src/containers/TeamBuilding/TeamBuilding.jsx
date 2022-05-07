import { message } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ActionInTableCommon, ActionUpdateBannerInTableCommon, ButtonAddCommon, Heading, LoadingCommon, ModalConfirm, TableCommon, OverviewForList, ButtonCommon } from '../../common';
import { onDeleteTeamBuilding, onGetAllTeamBuilding } from '../../redux/teamBuilding/teamBuilding.actions';
import { MESSAGE_DELETE_SUCCESS, MESSAGE_ERROR, MODAL_CONFIRM_MSG_DELETE, OVERVIEW_TYPE, ROUTE } from '../../utils/constant';
import './TeamBuilding.scss';


export const TeamBuildingComponent = ({ history, token, onGetAllTeamBuilding, onDeleteTeamBuilding, teamBuildingData, currentTeamBuilding  }) => {
    const [isLoading, setIsLoading] = useState(false) // loading get data
    const [isDeleteLoading, setIsDeleteLoading] = useState(false) // loading update
    const [modalDelete, setModalDelete] = useState({ id: null, visible: false }) // loading update


    useEffect(() => {
        if (!teamBuildingData) {
            setIsLoading(true)
            onGetAllTeamBuilding({ fCallBack: fCallBackGetAllTeamBuilding, token })
        }
    }, [onGetAllTeamBuilding, token, teamBuildingData])

    const fCallBackGetAllTeamBuilding = (isSuccess, rs) => {
        setIsLoading(false)
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
        // {
        //     title: "Giá",
        //     dataIndex: "price",
        //     key: "price",
        //     render: value => formatPrice(value)
        // },
        {
            title: "Banner",
            key: 'banner',
            align: "center",
            render: (_key, row) => (<ActionUpdateBannerInTableCommon linkToDetail={`${ROUTE.BANNER}${ROUTE.TEAM_BUILDING}/${row.id}`} />)
        },
        {
            title: "",
            key: "id",
            dataIndex: "id",
            align: "center",
            render: (id, row) => (
                <ActionInTableCommon
                    idRow={id}
                    linkToDetail={`${ROUTE.TEAM_BUILDING}/update/${id}`} 
                    onClickDelete={openModalDelete} 
                />
            ),
        },
    ];


    const handleAdd = () => {
        history.push(`${ROUTE.TEAM_BUILDING}/add`)
    }

    const openModalDelete = (id) => {
        setModalDelete({ visible: true, id })
    }

    const closeModalDelete = (id) => {
        setModalDelete({ visible: false, id })
    }

    const onDelete = () => {
        setIsDeleteLoading(true)
        onDeleteTeamBuilding({ token, data: modalDelete.id, fCallBack: onDeleteCallBack })
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

    const handleTeamBuildingType = () =>{
        history.push(`${ROUTE.TEAM_BUILDING}/type`)
    }

    return (
        <div className="team-building u-page-data">
            <Heading>Team Building</Heading>
            <div className="add-btn">
                <div className="button-flex">
                    <OverviewForList titleModal="Phần tổng quan team building" type={OVERVIEW_TYPE.TEAM_BUILDING} />
                    <div className='button-teambuilding-type'>
                        <ButtonCommon onClick={handleTeamBuildingType}>Chỉnh Sửa Thể Loại</ButtonCommon>
                    </div>
                </div>
                <ButtonAddCommon onClick={handleAdd} disabled={currentTeamBuilding !== null}/>
            </div>
            <div className="content">
                <LoadingCommon isLoading={isLoading || !teamBuildingData}>
                    <TableCommon
                        columns={columns}
                        dataSource={teamBuildingData}
                        bordered
                        pagination={false}
                        // onRowClick={showDetail}
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

TeamBuildingComponent.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func
};

const mapStateToProps = (state) => ({ 
    teamBuildingData: state.teamBuilding.data, 
    token: state.user.token,
    currentTeamBuilding: state.teamBuilding.currentTeamBuilding
 });

export const TeamBuilding = connect(mapStateToProps, { onGetAllTeamBuilding, onDeleteTeamBuilding })(TeamBuildingComponent)
