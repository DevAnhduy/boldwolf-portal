import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { BackButton, Heading, UploadSingleImg } from '../../../../common';
import { addBanner, updateBanner } from '../../../../redux/banner/banner.actions';
import { MESSAGE_ERROR, MESSAGE_UPDATE_SUCCESS, MODE } from '../../../../utils/constant';
import ContentBanner from '../ContentBanner/ContentBanner';
import './BannerPage.scss';

const BannerHomePage = ({ banner, addBanner, updateBanner, token, match, history }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [img, setImg] = useState(null);
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        if (banner) {
            const bannerHomeByType = banner.find(item => item.type === match.params.type)
            if (bannerHomeByType) {
                setImg(bannerHomeByType.banner_img)
                setBannerData(bannerHomeByType)
            } else {
                setBannerData({}) // stop loading
            }
        }
    }, [banner, match.params.type])

    const onImgChanged = async (value) => {
        const valueBody = {
            ...bannerData,
            banner_img: value.id,
            type: match.params.type,
        }
        if (!img) {
            updateBanner({ token, data: valueBody })
        }
    }

    const submitContentCallBack = (isSuccess, rs) => {
        setIsLoading(false)
        if (!isSuccess) {
            message.error(MESSAGE_ERROR)
        } else {
            message.success(MESSAGE_UPDATE_SUCCESS)
            setBannerData(rs)
            history.goBack()
        }
    }

    const submitContent = (values) => {
        setIsLoading(true)
        if (bannerData.id) {
            updateBanner({ token, data: { ...values, id: bannerData.id, type: match.params.type}, fCallBack: submitContentCallBack})
        } else {
            addBanner({ token, data: { ...values, type: match.params.type }, fCallBack: submitContentCallBack })
        }
    }

    return (
        <div className="banner-homepage u-banner-page">
            <div className="top">
                <BackButton />
                <Heading>Banner {match.params.title}</Heading>
            </div>

            <div className="banner-body">
                <div className="text-in-banner">
                    <ContentBanner onSubmit={submitContent} isLoading={isLoading} data = {bannerData}/>
                </div>
                <div className='upload-image-banner-homepage'>
                    <UploadSingleImg
                        label='Chọn ảnh banner'
                        required
                        prevImg={img}
                        onChange={onImgChanged}
                        mode={img ? MODE.UPDATE : MODE.ADD} />
                </div>
            </div>
           
        </div>
    );
};

const mapStateToProps = (state) => ({
    banner: state.banner.data,
    token: state.user.token
});

export default compose(connect(mapStateToProps, { updateBanner, addBanner }), withRouter)(BannerHomePage);