import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionUpdateBannerInTableCommon, Heading, TableCommon } from '../../common';
import { onGetAllBannerWithType } from '../../redux/banner/banner.actions';
import { BANNER_TYPE, ROUTE } from '../../utils/constant';
import './Banner.scss';

const data = [
    {
        id: 1,
        type: BANNER_TYPE.HOME,
        title: 'Trang chủ',
    },
    {
        id: 2,
        type: BANNER_TYPE.ABOUT,
        title: 'Về chúng tôi',
    },
    {
        id: 3,
        type: BANNER_TYPE.SAFETY,
        title: 'An toàn',
    },
    {
        id: 4,
        type: BANNER_TYPE.EXPLORER,
        title: 'Nhà thám hiểm',
    },
    {
        id: 5,
        type: BANNER_TYPE.LIST_TOUR,
        title: 'Adventure',
    },
    {
        id: 6,
        type: BANNER_TYPE.LIST_TEAM_BUILDING,
        title: 'Teambuilding',
    },
    {
        id: 7,
        type: BANNER_TYPE.BLOG,
        title: 'Blog',
    },
]


const columns = [
    {
        title: "STT",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (_id, _row, index) => index + 1
    },
    {
        title: "Tên trang",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Banner",
        dataIndex: "type",
        key: 'type',
        align: "center",
        render: (type, row) => (<ActionUpdateBannerInTableCommon linkToDetail={`${ROUTE.BANNER}/page/${type}/${row.title}`} />)
    },
];

const BannerComponent = ({ onGetAllBannerWithType, token }) => {
    useEffect(() => {
        onGetAllBannerWithType({ token })
    }, [onGetAllBannerWithType, token])

    return (
        <div className="u-page-detail">
            <div className="top top-without-back-btn">
                <Heading>Banner</Heading>
            </div>
            <div className="content">
                <TableCommon
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={false}
                />
            </div>
        </div>
    );
};

BannerComponent.propTypes = {

};

const mapStateToProps = (state) => ({
    token: state.user.token
});

export const Banner = connect(mapStateToProps, { onGetAllBannerWithType })(BannerComponent);
