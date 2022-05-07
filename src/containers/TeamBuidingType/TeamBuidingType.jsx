import { message } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	ActionWithOpenModalInTableCommon,
	BackButton,
	ButtonAddCommon,
	Heading,
	InputWithLabelCommon,
	ModalCommon,
	ModalConfirm,
	TableCommon,
    TextAreaCommon,
} from "../../common";
import {
	onGetAllTeamBuildingType,
	onUpdateTeamBuildingType,
	onAddTeamBuildingType,
	onDeleteTeamBuildingType,
} from "../../redux/teamBuildingType/teamBuildingType.action";
import {
	MESSAGE_ADD_SUCCESS,
	MESSAGE_DELETE_SUCCESS,
	MESSAGE_UPDATE_SUCCESS,
	MODAL_CONFIRM_MSG_DELETE,
	MODE,
} from "../../utils/constant";
import "./TeamBuildingType.scss";
const TeamBuidingTypeComponent = ({
	token,
	onGetAllTeamBuildingType,
	teamBuidingType,
	onUpdateTeamBuildingType,
	onAddTeamBuildingType,
	onDeleteTeamBuildingType,
}) => {
	const [editType, setEditType] = useState({});
	const [visibleAdd, setVisibleAdd] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);
	const [deleteID, setDeleteID] = useState(null);
	const [mode, setMode] = useState(MODE.ADD);
	useEffect(() => {
		onGetAllTeamBuildingType({ token });
	}, [onGetAllTeamBuildingType, token]);

	const handleEdit = (id, row) => {
		setMode(MODE.UPDATE);
		setEditType(row);
		setVisibleAdd(true);
	};
	const handleDelete = (id, row) => {
		setVisibleDelete(true);
		setDeleteID(id);
	};
	const closeModalAdd = () => {
		setVisibleAdd(false);
	};

	const turnLinkToEmbed = (rawLink) => {
		let tmp = rawLink.split("/");
		if (tmp.includes("embed")) {
			return rawLink;
		} else if (tmp.includes("youtu.be")) {
			return `https://www.youtube.com/embed/${tmp[tmp.length - 1]}`;
		} else {
            var url = new URL(rawLink);
            var id = url.searchParams.get("v");
            return `https://www.youtube.com/embed/${id}`
		}
	};

	const onOK = () => {
		if (mode === MODE.UPDATE) {
			onUpdateTeamBuildingType({
				token,
				data: {...editType,link:turnLinkToEmbed(editType.link)},
				fCallBack: onUpdateTeamBuildingTypeCallBack,
			});
		} else {
			onAddTeamBuildingType({
				token,
                data: {...editType,link:turnLinkToEmbed(editType.link)},
				fCallBack: onAddTeamBuildingTypeCallBack,
			});
		}
	};

	const onUpdateTeamBuildingTypeCallBack = (isSuccess, rs) => {
		if (isSuccess) {
			setVisibleAdd(false);
			message.success(MESSAGE_UPDATE_SUCCESS);
		} else {
			message.error(rs);
		}
	};

	const onAddTeamBuildingTypeCallBack = (isSuccess, rs) => {
		if (isSuccess) {
			setVisibleAdd(false);
			message.success(MESSAGE_ADD_SUCCESS);
		} else {
			message.error(rs);
		}
	};

	const onDeleteTeamBuildingTypeCallBack = (isSuccess, rs) => {
		if (isSuccess) {
			setVisibleDelete(false);
			message.success(MESSAGE_DELETE_SUCCESS);
		} else {
			message.error(rs);
		}
	};

	const handleNameChange = (value) => {
		setEditType({ ...editType, name: value });
	};

	const handleNameENChange = (value) => {
		setEditType({ ...editType, name_en: value });
	};

	const handleDescriptionChange = (value) => {
		setEditType({ ...editType, description: value });
	};

	const handleDescriptionENChange = (value) => {
		setEditType({ ...editType, description_en: value });
	};

	const handleLinkChange = (value) => {
		setEditType({ ...editType, link: value });
	};

	const handleAdd = () => {
		setEditType({});
		setVisibleAdd(true);
		setMode(MODE.ADD);
	};

	const handleDeleteCancle = () => {
		setVisibleDelete(false);
	};

	const handleDeleteOK = () => {
		onDeleteTeamBuildingType({
			token,
			data: deleteID,
			fCallBack: onDeleteTeamBuildingTypeCallBack,
		});
	};

	const columns = [
		{
			title: "",
			dataIndex: "index",
			key: "index",
			align: "center",
			render: (_id, _row, index) => index + 1,
			width: 100,
		},
		{
			title: "Tên Loại",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Tên Loại (English)",
			dataIndex: "name_en",
			key: "name_en",
		},
		{
			title: "Mô Tả",
			dataIndex: "description",
			key: "name",
		},
		{
			title: "Mô Tả (English)",
			dataIndex: "description_en",
			key: "description_en",
		},
		{
			title: "Link Youtube ",
			dataIndex: "link",
			key: "link",
		},
		{
			title: "",
			key: "id",
			dataIndex: "id",
			align: "center",
			render: (id, row) => (
				<ActionWithOpenModalInTableCommon
					row={row}
					idRow={id}
					onClickDetail={handleEdit}
					onClickDelete={handleDelete}
				/>
			),
		},
	];
	return (
		<div className="teambuilding-type u-page-detail">
			<div className="top">
				<BackButton />
				<Heading>TeamBuilding Type</Heading>
			</div>
			<div className="add-btn">
				<ButtonAddCommon onClick={handleAdd}>Thêm</ButtonAddCommon>
			</div>
			<div className="content">
				<TableCommon columns={columns} dataSource={teamBuidingType} />
			</div>
			<ModalConfirm
				visible={visibleDelete}
				title="Xóa Type"
				handleOk={handleDeleteOK}
				handleCancel={handleDeleteCancle}
			>
				{MODAL_CONFIRM_MSG_DELETE}
			</ModalConfirm>
			<ModalCommon
				visible={visibleAdd}
				handleCancel={closeModalAdd}
				handleOk={onOK}
				okText={mode === MODE.ADD ? "Thêm" : "Lưu"}
			>
				<InputWithLabelCommon
					value={editType ? editType.name : ""}
					label="Tên Loại"
					onChange={handleNameChange}
				></InputWithLabelCommon>
				<InputWithLabelCommon
					value={editType ? editType.name_en : ""}
					label="Tên Loại (English)"
					onChange={handleNameENChange}
				></InputWithLabelCommon>
				<TextAreaCommon
					value={editType ? editType.description : ""}
					label="Mô Tả"
					onChange={handleDescriptionChange}
				></TextAreaCommon>
				<TextAreaCommon
					value={editType ? editType.description_en : ""}
					label="Mô Tả (English)"
					onChange={handleDescriptionENChange}
				></TextAreaCommon>
				<InputWithLabelCommon
					value={editType ? editType.link : ""}
					label="Link Youtube"
					onChange={handleLinkChange}
				></InputWithLabelCommon>
			</ModalCommon>
		</div>
	);
};

const mapStateToProps = (state) => ({
	token: state.user.token,
	teamBuidingType: state.teamBuildingtype.data,
});

const mapDispatchToProps = {
	onGetAllTeamBuildingType,
	onUpdateTeamBuildingType,
	onAddTeamBuildingType,
	onDeleteTeamBuildingType,
};

export const TeamBuidingType = connect(
	mapStateToProps,
	mapDispatchToProps
)(TeamBuidingTypeComponent);
