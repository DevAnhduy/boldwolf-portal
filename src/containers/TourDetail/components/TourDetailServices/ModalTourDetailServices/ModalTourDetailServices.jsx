import { Form } from 'antd';
import React from 'react'
import { ButtonCommon, ModalCommon } from '../../../../../common';
import TextEditor from '../../../../../common/TextEditor/TextEditor';
import { MESSAGE_REQUIRED } from '../../../../../utils/constant';
import './ModalTourDetailServices.scss'
export default function ModalTourDetailServices({visible,handleCancel,handleFinish,data}) {
    const [form] = Form.useForm();
    const onFinish = async () =>{
        const values = await form.validateFields();
        form.resetFields()
        handleFinish(values)
        
    }
    return (
        <ModalCommon
                    visible={visible}
                    handleCancel={handleCancel}
                    footer={[]}
                    >
                    <div className="modal-tour-detail-services">
                        <Form  form={form} className="modal-tour-detail-form">
                                <Form.Item 
                                    label="Khách Chuẩn Bị" 
                                    name="customer"
                                    className="modal-tour-detail-item"
                                    rules={[
                                        { required: true, message: MESSAGE_REQUIRED },
                                    ]}>
                                    <TextEditor
                                    initialValues={data&&data[0]&&data[0].customer}
                                    placeholder="Khách Chuẩn Bị"
                                    />
                                </Form.Item>
                                <Form.Item label="Khách Chuẩn Bị (English)" name="customer_en"
                                    className="modal-tour-detail-item"
                                    rules={[
                                        { required: true, message: MESSAGE_REQUIRED },
                                    ]}>
                                    <TextEditor
                                        initialValues={data&&data[0]&&data[0].customer_en}
                                        placeholder="Enter content"
                                    />
                                </Form.Item>
                                <Form.Item label="BoldWolf Chuẩn Bị" name="boldwolf"
                                    className="modal-tour-detail-item"
                                    rules={[
                                        { required: true, message: MESSAGE_REQUIRED },
                                    ]}>
                                    <TextEditor
                                        initialValues={data&&data[0]&&data[0].boldwolf}
                                        placeholder="Nhập nội dung"
                                    />
                                </Form.Item>
    
                                <Form.Item label="BoldWolf Chuẩn Bị (English)" name="boldwolf_en"
                                    className="modal-tour-detail-item"
                                    rules={[
                                        { required: true, message: MESSAGE_REQUIRED },
                                    ]}>
                                    <TextEditor
                                    initialValues={data&&data[0]&&data[0].boldwolf_en}
                                    placeholder="Enter content"
                                />
                                </Form.Item>
                            <Form.Item className='tourSubmit'>
                                    <div className='flex'>
                                    <ButtonCommon type="primary" onClick = {onFinish}>
                                    Submit
                                    </ButtonCommon>
                                    </div>
                            </Form.Item>
                        </Form>
                    </div>
                </ModalCommon>
    )
}
