import { message } from 'antd'
import React from 'react'
import { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { ActionWithOpenModalInTableCommon, ButtonAddCommon, Heading, InputWithLabelCommon, LoadingCommon, LogoCommon, ModalCommon, ModalConfirm, TableCommon, UploadSingleImg } from '../../common'
import { onAddCustomer, onDeleteCustomer, onGetAllCustomer, onUpdateCustomer} from '../../redux/customer/customer.actions'
import { MODAL_CONFIRM_MSG_DELETE, MODE } from '../../utils/constant'

export const CustomerMode={
    ADD:"ADD",
    EDIT:"EDIT"
}

const CustomerCompoment = ({customerData,token,onGetAllCustomer,onAddCustomer,onDeleteCustomer,onUpdateCustomer}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);
    const [mode, setMode] = useState(MODE.ADD);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [deleteId, setDeleteID] = useState(null);
    useEffect(() => {
        if (!customerData) {
            setIsLoading(true)
            onGetAllCustomer({ fCallBack: onGetAllCustomerCallBack, token })
        }
    }, [onGetAllCustomer, token, customerData])

    const onGetAllCustomerCallBack=()=>{
        setIsLoading(false)
    }

    const handleAdd = ()=>{
        setVisibleAdd(true)
        setEditCustomer(null)
        setMode(MODE.ADD)
    }
    const handleEdit = (id,row)=>{
        setVisibleAdd(true)
        setEditCustomer(row)
        setMode(MODE.UPDATE)
    }
    const handleDelete = (id,row)=>{
        setVisibleConfirm(true)
        setDeleteID(id)
    }

    const onDelete =()=>{
        onDeleteCustomer({data:deleteId,token,fCallBack:onDeleteCustomerCallBack})
    }

    const onDeleteCustomerCallBack = (isSuccess)=>{
        if(isSuccess){
            setVisibleConfirm(false)
        }else{
            message.error("Xóa Thất Bại")
        }
    }

    const closeModalDelete =()=>{
        setVisibleConfirm(false)

    }

    const closeModalAdd =()=>{
        setVisibleAdd(false)

    }
    const onImageChange = (value) =>{
        setEditCustomer({...editCustomer,image_id:value.id,image:value})
    }

    const handleNameChange = (value)=>{
        setEditCustomer({...editCustomer,name:value})
    }

    const onOK = async () =>{
        let err = await validate()
        if(!err){
            if(mode===MODE.ADD){
                onAddCustomer({data:{name:editCustomer.name,image_id:editCustomer.image_id},token,fCallBack:onAddCustomerCallBack})
            }if(mode===MODE.UPDATE){
                onUpdateCustomer({data:{id:editCustomer.id,name:editCustomer.name,image_id:editCustomer.image_id},token,fCallBack:onUpdateCustomerCallBack})
            }
        }
        
    }

    const onUpdateCustomerCallBack = (isSuccess,result)=>{
        if(isSuccess){
            setVisibleAdd(false)
        }else{
            message.error("Sữa Thất Bại")
        }
    }

    const validate = () =>{
        if(!editCustomer){
            message.error("Nhập Tên")
            return true
        }else if(!editCustomer.name){
            message.error("Nhập Tên")
            return true
        }else if (!editCustomer.image_id){
            message.error("Nhập Ảnh")
            return true
        }
        else return false
    }

    const onAddCustomerCallBack =(isSuccess,result)=>{
        if(isSuccess){
            setVisibleAdd(false)
        }else{
            message.error("Thêm Thất Bại")
        }
    }

    const columns = [
        {
            title: "",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (_id, _row, index) => index + 1,
            width:100,
        },
        {
            title: "Logo",
            dataIndex: "image",
            key: "image",
            align:"center",
            width: 200,
            render:(image) =>   <LogoCommon src={image.main}></LogoCommon>
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
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
                    onClickDelete={handleDelete} />
            ),
        },
    ];
    return (
        <div className="customer u-page-data">
            <Heading>Khách Hàng</Heading>
            <div className="add-btn">
                <ButtonAddCommon onClick={handleAdd}/>
                {/* <ButtonAddCommon onClick={handleAdd} disabled={currentTour !== null}/> */}
            </div>
            <div className="content">
                <LoadingCommon isLoading={isLoading || !customerData}>
                    <TableCommon
                        columns={columns}
                        dataSource={customerData}
                        bordered
                        pagination={false}
                    />
                </LoadingCommon>
            </div>
            <ModalConfirm
                visible={visibleConfirm}
                handleCancel={closeModalDelete}
                handleOk={onDelete}
            >
                {MODAL_CONFIRM_MSG_DELETE}
            </ModalConfirm>
            <ModalCommon visible={visibleAdd} handleCancel={closeModalAdd} handleOk={onOK} okText={mode===MODE.ADD?"Thêm":"Lưu"} >
                <InputWithLabelCommon value={editCustomer?editCustomer.name:''} label="Tên Khách Hàng" onChange={handleNameChange}></InputWithLabelCommon>
                <UploadSingleImg onChange={onImageChange} prevImg={editCustomer?editCustomer.image:null} label={`Logo`} mode={mode}></UploadSingleImg>
            </ModalCommon>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    customerData: state.customer.data
})

const mapDispatchToProps = {
	onGetAllCustomer,
	onAddCustomer,
	onDeleteCustomer,
	onUpdateCustomer,
};

export const Customer = connect(mapStateToProps, mapDispatchToProps)(CustomerCompoment)
