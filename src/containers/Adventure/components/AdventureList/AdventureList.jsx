// import PropTypes from 'prop-types';
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ActionInTableCommon,
  ActionUpdateBannerInTableCommon,
  ButtonAddCommon,
  LoadingCommon,
  ModalConfirm,
  TableCommon,
} from "../../../../common";
import {
  onDeleteAdventureTour,
  onGetAllAdventureTour,
} from "../../../../redux/adventure/adventure.actions";
import {
  MESSAGE_DELETE_SUCCESS,
  MESSAGE_ERROR,
  MODAL_CONFIRM_MSG_DELETE,
  ROUTE,
} from "../../../../utils/constant";
import { formatPrice } from "../../../../utils/function.utils";
import "./../../../TourContainer/TourContainer.scss";
const AdventureTourListComponent = ({
  history,
  token,
  onGetAllAdventureTour,
  onDeleteAdventureTour,
  tourData,
  currentTour,
}) => {
  const [isLoading, setIsLoading] = useState(false); // loading get data
  const [isDeleteLoading, setIsDeleteLoading] = useState(false); // loading update
  const [modalDelete, setModalDelete] = useState({ id: null, visible: false }); // loading update
  useEffect(() => {
    if (!tourData) {
      setIsLoading(true);
      onGetAllAdventureTour({ fCallBack: fCallBackGetAllTour, token });
    }
  }, [onGetAllAdventureTour, token, tourData]);

  const fCallBackGetAllTour = (isSuccess, rs) => {
    setIsLoading(false);
    // todo
    if (!isSuccess) {
      message.error(MESSAGE_ERROR);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_id, _row, index) => index + 1,
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
      render: (value) => `${value} ngày`,
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
      render: (value) => formatPrice(value),
    },
    // {
    //     title: "Loại",
    //     dataIndex: "type",
    //     key: "type",
    // },
    {
      title: "Banner",
      key: "banner",
      align: "center",
      render: (_key, row) => (
        <ActionUpdateBannerInTableCommon
          linkToDetail={`${ROUTE.BANNER}${ROUTE.EXPLORER}/${row.id}`}
        />
      ),
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (id, row) => (
        <ActionInTableCommon
          idRow={id}
          linkToDetail={`${ROUTE.EXPLORER}/update/${id}`}
          onClickDelete={openModalDelete}
        />
      ),
    },
  ];

  const handleAdd = () => {
    // const history = useHistory()
    history.push(`${ROUTE.EXPLORER}/add`);
  };

  const openModalDelete = (id) => {
    setModalDelete({ visible: true, id });
  };

  const closeModalDelete = (id) => {
    setModalDelete({ visible: false, id });
  };

  const onDelete = () => {
    setIsDeleteLoading(true);
    onDeleteAdventureTour({
      token,
      data: modalDelete.id,
      fCallBack: onDeleteCallBack,
    });
  };

  const onDeleteCallBack = (isSuccess, rs) => {
    setIsDeleteLoading(false);
    setModalDelete({ ...modalDelete, visible: false });
    if (!isSuccess) {
      message.error(MESSAGE_ERROR);
    } else {
      message.success(MESSAGE_DELETE_SUCCESS);
    }
  };

  return (
    <div className="tours u-page-data">
      <div className="add-btn">
        {/* <div className="button-flex">
                    <OverviewForList titleModal="Phần tổng quan list tour" type = {OVERVIEW_TYPE.TOUR}/>
                    <div className='button-glamping'>
                        <ButtonCommon onClick={handleGlamping}>Chỉnh Sửa Glamping</ButtonCommon>
                    </div>
                </div> */}
        <ButtonAddCommon onClick={handleAdd} disabled={currentTour !== null} />
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
  tourData: state.adventure.adventureTour,
  token: state.user.token,
  currentTour: state.adventure.currentTour,
});

export const AdventureList = connect(mapStateToProps, {
  onGetAllAdventureTour,
  onDeleteAdventureTour,
})(AdventureTourListComponent);
