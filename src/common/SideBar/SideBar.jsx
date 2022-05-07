import React from 'react';
import {
    // BookOutlined,
    FileImageOutlined, HeatMapOutlined, HomeOutlined,
    LeftOutlined,
    RightOutlined,
    UsergroupAddOutlined,
    VerifiedOutlined,
    RocketOutlined,UserOutlined,
    BookOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import AvatarLogo from '../../assets/images/logo-boldwolf.png';
import { ROUTE } from '../../utils/constant';
import { Flexbox } from '../Flexbox/Flexbox';
import './SideBar.scss';
import { ButtonCommon } from '../ButtonCommon/ButtonCommon';
import { connect } from 'react-redux';
import { onLogout } from '../../redux/user/user.actions';

export const menuItems = [
    {
        route: ROUTE.DASH_BOARD,
        name: 'Trang Chủ',
        icon: <HomeOutlined />,
    },
    {
        route: ROUTE.TEAM_BUILDING,
        name: 'Team building',
        icon: <UsergroupAddOutlined />
    },
    {
        route: ROUTE.TOURS,
        name: 'Adventure',
        icon: <HeatMapOutlined />
    },
    {
        route: ROUTE.EXPLORER,
        name: 'Nhà thám hiểm',
        icon: <RocketOutlined />,
    },
    {
        route: ROUTE.SAFETY,
        name: 'An toàn',
        icon: <VerifiedOutlined />
    },
    {
        route: ROUTE.BLOG,
        name: 'Blog',
        icon: <BookOutlined />
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
        route: ROUTE.CUSTOMER,
        name: 'Khách Hàng',
        icon: <UserOutlined />
    }
];

export const SideBarComponent = props => {
    const { location, compact, onModeChanged, onLogout } = props;

    const logout = () => {
        onLogout();
    }

    return (
        <div className={classNames('drawer-container', { compact })}>
            <Flexbox className="drawer-wrap" spaceBetween >
                <div style={{ width: '100%' }}>
                    <div className="logo">Bold Wolf</div>
                    <div className="meta">This is slogan</div>
                    <div className="avatar-container">
                        <img
                            src={AvatarLogo}
                            alt=""
                        />
                        <div className="name">
                            <h3>ADMIN</h3>
                            <ButtonCommon onClick={logout}>ĐĂNG XUẤT</ButtonCommon>
                        </div>
                    </div>
                    <div className="menu">
                        {menuItems
                            .map(item => (
                                <Link key={item.route} to={item.route}>
                                    <div className={`item${location.pathname === item.route ? ' active' : ''}`}>
                                        {item.icon}
                                        <div className="text">{item.name}</div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
                <div className="button-collapse">
                    <Button
                        type="primary"
                        ghost
                        onClick={onModeChanged}
                        // containerStyle={{ marginRight: compact ? 5 : 20, marginBottom: 20 }}
                        icon={compact ? <RightOutlined /> : <LeftOutlined />}
                        iconcolor="white"
                    />
                </div>
            </Flexbox>
        </div>
    );
};

SideBarComponent.propTypes = {

};

export const SideBar = withRouter(connect(null, { onLogout })(SideBarComponent));