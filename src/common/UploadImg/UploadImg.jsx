import { message } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import api from '../../api/index.api';
import { MESSAGE_ERROR, MODE, UPLOAD_TYPE } from '../../utils/constant';
import { LoadingCommon, ModalLoading } from '../LoadingCommon/LoadingCommon';
import InputImg from './InputImg/InputImg';
import './UploadImg.scss';

// upload multiple
const UploadImgComponent = ({ onChange, token, prevImg, description, mode, id, label, required, type, max }) => {
    const [loading, setLoading] = useState(false)

    const onUploadImg = async (e) => {
        try {
            setLoading(true)
            const value = e.target.files
            let rs 
            if (mode === MODE.UPDATE) {
                rs = await api.uploadApi.uploadMultiImg({ token, data: value })
                const images = rs.map(item => item.id)
                if (type === UPLOAD_TYPE.TEAM_BUILDING) {
                    await api.teamBuildingApi.insertMoreImg({ token, data: {teamBuildingId: id, images}})
                } else if (type === UPLOAD_TYPE.TOUR) {
                    await api.tourApi.insertMoreImg({ token, data: { tourId: id, images } })
                }
            } else {
                 rs = await api.uploadApi.uploadMultiImg({ token, data: value })
            }
            // add new img to prevImg
            if (onChange) {
                if (prevImg) {
                    onChange([ ...prevImg.value,...rs])
                } else {
                    onChange(rs)
                }
            }
            setLoading(false)
        } catch (err) {
            message.error(MESSAGE_ERROR)
        }
    }

    const onChangePrevImg = (value) => {
        const temp = prevImg.value.map(item => {
            if (item.id === value.id) {
                return value
            }
            return item
        })

        onChange(temp)
    }

    const onDelete = (id) => {
        const temp = prevImg.value.filter(item => item.id !==id)
        onChange(temp)
    }

    return (
        <div className="upload-img">
            <ModalLoading isLoading={loading}/>
            <div className={`label u-title ${required ? 'required' : ''}`}>
                {label}: {prevImg && prevImg.value.length && <span>Tổng cộng <b>{prevImg.value.length}</b> hình</span>}
            </div>
            {/* show prev img */}
            <LoadingCommon isLoading={(mode === MODE.UPDATE && !prevImg)}>
                <div className="prev-img-wrap">
                {
                    prevImg &&
                    prevImg.value.map(item => (
                        <div className="prev-img" key={item.id}>
                            {/* <img src={getLinkImg(item.main)} alt="prev" /> */}
                            <InputImg 
                                type={type} mode={mode} id={item.id} main={item.main} 
                                onChange={onChangePrevImg}
                                onDelete={onDelete}
                                isAllowDelete={prevImg.value.length > 1}
                                />
                        </div>
                    ))

                }
                </div>
            </LoadingCommon>

            {
                description &&
                <div className="description">
                    {description}
                </div>
            }
            {
                (!max || (prevImg &&prevImg.value.length < max )) &&
                <div className="input">
                    <input
                        type="file"
                        name="files"
                        accept="image/*"
                        onChange={onUploadImg}
                        alt="image"
                        multiple
                        placeholder="Add image"
                    />
                </div>
            }
        </div>
    );
};

UploadImgComponent.propTypes = {
    onChange: PropTypes.func,
    prevImg: PropTypes.any,
    description: PropTypes.string,
    mode: PropTypes.string, // add or update
    label: PropTypes.string,
    required: PropTypes.bool,
    isMultiple: PropTypes.bool,
};


const mapStateToProps = (state) => ({
    token: state.user.token
});

export const UploadImg = connect(mapStateToProps)(UploadImgComponent)

///////
const UploadSingleImgComponent = ({ onChange, token, prevImg, description, mode, label, required }) => {
    const [loading, setLoading] = useState(false)
    const onUploadImg = async (e) => {
        try {
            setLoading(true)
            const value = e.target.files[0]
            if (mode === MODE.ADD) {
                const rs = await api.uploadApi.uploadImg({ token, data: value })
                onChange && onChange(rs)
            }

            setLoading(false)
        } catch (err) {
            message.error(MESSAGE_ERROR)
        }
    }

    const onChangePrevImg = (value) => {
        onChange(value)
    }
    return (
        <div className="upload-img">
            <div className={`label u-title ${required ? 'required' : ''}`}>{label}:</div>
            {/* show prev img */}
            <LoadingCommon isLoading={(mode === MODE.UPDATE && !prevImg) || loading}>
                {
                    prevImg && prevImg.main &&
                    <InputImg id={prevImg.id} main={prevImg.main} onChange={onChangePrevImg} />
                }
                {
                    description &&
                    <div className="description">
                        {description}
                    </div>
                }
                {
                    mode === MODE.ADD && !prevImg &&
                    <div className="input">
                        <input
                            type="file"
                            name="files"
                            accept="image/*"
                            onChange={onUploadImg}
                            alt="image"
                        />
                    </div>
                }
            </LoadingCommon>
        </div>
    );
};

UploadSingleImgComponent.propTypes = {
    onChange: PropTypes.func,
    prevImg: PropTypes.any,
    description: PropTypes.string,
    mode: PropTypes.string, // add or update
    label: PropTypes.string,
    required: PropTypes.bool,
};

export const UploadSingleImg = connect(mapStateToProps)(UploadSingleImgComponent)
