import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Heading } from '../../common';
import { onGetAllAdventure } from '../../redux/adventure/adventure.actions';
import './Adventure.scss';
import { AdventureInfo } from './components/AdvantureInfo/AdvantureInfo';
import AdventureDevice from './components/AdventureDevice/AdventureDevice';
import AdventureExplorer from './components/AdventureExplorer/AdventureExplorer';
import {AdventureList} from './components/AdventureList/AdventureList';
import AdventureSafety from './components/AdventureSafety/AdventureSafety';
import AdventureTeam from './components/AdventureTeam/AdventureTeam';

const tabs = [
    {
        title: 'Thông tin',
        component: <AdventureInfo />
    },
    {
        title: 'Đội ngũ thám hiểm',
        component: <AdventureTeam />
    },
    {
        title: 'Thám hiểm an toàn',
        component: <AdventureSafety />
    },
    {
        title: 'Thiết bị an toàn',
        component: <AdventureDevice />
    },
    {
        title: ' Những trải nghiệm chỉ có ở nhà thám hiểm',
        component: <AdventureExplorer />
    }
]

const AdventureComponent = ({ token,history, onGetAllAdventure }) => {
    useEffect(() => {
        onGetAllAdventure({ token })
    }, [onGetAllAdventure, token])

    return (
        <div className="u-page-detail">
            <div className="top top-without-back-btn">
                <Heading>Nhà thám hiểm</Heading>
            </div>
            <div className="content">
                {/* <TabsCommon tabs={tabs} /> */}
                <Tabs className="tabs-common" defaultActiveKey="1">
                    <Tabs.TabPane tab={"Danh sách thám hiểm"} key={"Danh sách thám hiểm"}>
                        <AdventureList history={history}/>
                    </Tabs.TabPane>
                    {
                        tabs.map(item =>(
                            <Tabs.TabPane tab={item.title} key={item.title}>
                                {item.component}
                            </Tabs.TabPane>
                        ))
                    }

                </Tabs>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.user.token,
});

export const Adventure = connect(mapStateToProps, { onGetAllAdventure })(AdventureComponent);