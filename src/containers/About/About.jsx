import React, { useEffect } from 'react';
import './About.scss';
import { Heading, TabsCommon } from '../../common';
import AboutOverview from './components/AboutOverview/AboutOverview';
import AboutCoreValue from './components/AboutCoreValue/AboutCoreValue';
import AboutTeamMember from './components/AboutTeamMember/AboutTeamMember';
import { connect } from 'react-redux';
import { onGetAllAbout } from '../../redux/about/about.actions';

const tabs = [
    {
        title: 'Tổng Quan',
        component: <AboutOverview />
    },
    {
        title: 'Giá Trị Cốt Lõi',
        component: <AboutCoreValue/>
    },
    {
        title: 'Thành Viên',
        component: <AboutTeamMember />
    },
    // {
    //     title: 'Châm Ngôn',
    //     component: <AboutMaxim />
    // }
]

const AboutComponent = ({ token, onGetAllAbout }) => {
    useEffect(() => {
        onGetAllAbout({ token })
    }, [onGetAllAbout, token])

    return (
        <div className="u-page-detail">
            <div className="top top-without-back-btn">
                <Heading>Về chúng tôi</Heading>
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

export const About = connect(mapStateToProps, { onGetAllAbout })(AboutComponent);