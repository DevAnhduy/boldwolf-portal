import React from 'react';
import {
    BookOutlined,
    FileImageOutlined, HeatMapOutlined, HomeOutlined,
    UsergroupAddOutlined,
    VerifiedOutlined
} from '@ant-design/icons';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { ROUTE } from '../../utils/constant';
import { Flexbox } from '../Flexbox/Flexbox';
import './SideBarSmallScreen.scss';

const menuItems = [
    {
        route: ROUTE.DASH_BOARD,
        name: 'Trang Chủ',
        icon: <HomeOutlined />,
    },
    {
        route: ROUTE.ABOUT,
        name: 'Về Chúng Tôi',
        icon: <UsergroupAddOutlined />,
    },
    {
        route: ROUTE.BANNER,
        name: 'Banner',
        icon: <FileImageOutlined />,
    },
    {
        route: ROUTE.TOURS,
        name: 'Tours',
        icon: <HeatMapOutlined />
    },
    {
        route: ROUTE.TEAM_BUILDING,
        name: 'Team building',
        icon: <UsergroupAddOutlined />
    },
    {
        route: ROUTE.BLOG,
        name: 'Blog',
        icon: <BookOutlined />,
    },
    {
        route: ROUTE.SAFETY,
        name: 'An toàn',
        icon: <VerifiedOutlined />
    }
];

const SideBarSmallScreenComponent = (props) => {
    const { location } = props;
    return (
        <section className="side-bar-small-screen">
            <Flexbox row spaceBetween>
                {menuItems.map(menu => (
                    <Link
                        key={menu.route}
                        to={menu.route}
                        style={{ flex: 1, textAlign: 'center', paddingTop: 10 }}
                    >
                        <div
                            key={menu.name}
                            className={classNames('item', { active: location.pathname === menu.route })}
                        >
                            {menu.icon}
                        </div>
                    </Link>
                ))}
            </Flexbox>
        </section>
    );
};

export const SideBarSmallScreen =  withRouter(SideBarSmallScreenComponent);