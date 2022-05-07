import React, { useEffect, useState } from 'react';
import { Review } from '../Review/Review';
import { Information } from '../Information/Information';
import { TabsCommon, Heading } from '../../common';
import { withRouter } from 'react-router-dom';
import { ACTIVE_KEY } from '../../utils/constant';
import ProductValue from './components/ProductValue/ProductValue';
const activeKeys = ["Information", "Review", "Blog"];
const tabs = [
    {
        title: 'Information',
        component: <Information />,
        key: "1",
    },
    {
        title: 'Review',
        component: <Review />,
        key: "2"
    },
    {
        title: 'Giá Trị Sản Phẩm',
        component: <ProductValue/>,
        key: "3"
    }
]
const DashboardComponent = ({ location }) => {
    const [activeKey, setActiveKey] = useState("Information")
    
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const myParam = urlParams.get(ACTIVE_KEY);
        if (isValidKey(myParam)) {
            setActiveKey(myParam.toString())
        }

    }, [location])
    const isValidKey = (value) => {
        return activeKeys.indexOf(value) !== -1
    }
    const onChangeKey = (value) => {
        setActiveKey(value)
    }
    return (
        <div className="u-page-detail">
            <div className="top top-without-back-btn">
                <Heading>Trang chủ</Heading>
            </div>
            <div className="content">
                <TabsCommon tabs={tabs} activeKey={activeKey} onChange={onChangeKey} />
            </div>
        </div>
    );
};

export const Dashboard = withRouter(DashboardComponent)
