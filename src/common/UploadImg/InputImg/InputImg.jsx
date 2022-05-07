import React, { useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux';
import { MESSAGE_ERROR, MODE, UPLOAD_TYPE } from '../../../utils/constant';
import { message } from 'antd';
import api from '../../../api/index.api';
import { getLinkImg } from '../../../utils/function.utils';
import './InputImg.scss';
import { LoadingImgCommon } from '../../LoadingCommon/LoadingCommon';

const InputImg = ({ token, id, main, onChange, onDelete, type, mode, isAllowDelete = false }) => {
    const [loading, setLoading] = useState(false)
    const [imgLink, setImgLink] = useState("")

    useEffect(() => {
        if (main) {
            setImgLink(getLinkImg(main))
        }
    }, [main])

    const onUpdateImg = async (e) => {
        try {
            setLoading(true)
            const value = e.target.files[0]
            const rs = await api.uploadApi.updateImg({ token, data: value, id })
            // console.log("update img:  ", rs)
            setImgLink(getLinkImg(rs.main))
            onChange(rs)
            setLoading(false)
            // setImg(rs)
        } catch (err) {
            // console.log("img err:  ", err)
            message.error(MESSAGE_ERROR)
        }
    }

    const handleDelete = async (e) => {
        e.stopPropagation()
        setLoading(true)

        try {
            if (mode === MODE.CREATE) {
                setLoading(true)
                await api.uploadApi.deleteImg({ token, id })
            } else { // mode update
                if (type === UPLOAD_TYPE.TEAM_BUILDING) {
                    await api.uploadApi.deleteTeamBuildingImg({ token, id })
                } else if (type === UPLOAD_TYPE.TOUR) {
                    await api.uploadApi.deleteTourImg({ token, id })
                }
            }
            onDelete(id)
        } catch (err) {
            // console.log("img err:  ", err)
            message.error(MESSAGE_ERROR)
        }
    }


    return (
        <div className="input-img">
            <LoadingImgCommon isLoading={loading}>
                <div className="wrap-input">
                    <input
                        accept="image/*"
                        type="file"
                        name="files"
                        onChange={onUpdateImg}
                        alt="image"
                        style={{ "background-image": `url("${imgLink}")` }}
                    />
                    {

                        isAllowDelete &&
                        <div className="icon" onClick={handleDelete}>
                            <DeleteOutlined />
                        </div>
                    }
                </div>
            </LoadingImgCommon>
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.token
});

export default connect(mapStateToProps)(InputImg)
