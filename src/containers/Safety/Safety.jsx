import React, { useEffect } from 'react';
import SafeRule from './components/SafeRule/SafeRule';
import SafeProcess from './components/SafeProcess/SafeProcess';
import { Heading, TabsCommon } from '../../common';
import SafeTeamMember from './components/SafeTeamMember/SafeTeamMember';
import SafeFacility from './components/SafeFacility/SafeFacility';
import { connect } from 'react-redux';
import { onGetAllSafety } from '../../redux/safety/safety.actions';
import SafeMaxim from './components/SafeMaxim/SafeMaxim';

const tabs = [
    {
        title: 'Quy Tắc An Toàn',
        component: <SafeRule />
    },
    {
        title: 'Quy Trình An Toàn',
        component: <SafeProcess />
    },
    {
        title: 'Đội Ngũ An Toàn',
        component: <SafeTeamMember />
    },
    {
        title: 'Thiết Bị An Toàn',
        component: <SafeFacility />
    },
    {
        title: 'Cam kết An Toàn',
        component: <SafeMaxim />
    },
]

const SafetyComponent = ({ token, onGetAllSafety }) => {
    useEffect(() => {
        onGetAllSafety({ token })
    }, [onGetAllSafety, token])

    return (
        <div className="u-page-detail">
            <div className="top top-without-back-btn">
                <Heading>An toàn</Heading>
            </div>
            <div className="content">
                <TabsCommon tabs={tabs} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.token
});

export const Safety = connect(mapStateToProps, { onGetAllSafety })(SafetyComponent);
