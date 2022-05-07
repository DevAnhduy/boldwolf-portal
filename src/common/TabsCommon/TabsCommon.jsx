import { Tabs } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './TabsCommon.scss';

const { TabPane } = Tabs;

export const TabsCommon = ({ tabs, activeKey, onChange }) => {
    return (
        <Tabs className="tabs-common" defaultActiveKey="1" activeKey={activeKey} onChange={onChange}>
            {
                tabs.map(item =>(
                    <TabPane tab={item.title} key={item.title}>
                        {item.component}
                    </TabPane>
                
                ))
            }
        </Tabs>
    );
};

TabsCommon.propTypes = {
    tabs: PropTypes.array,
    activeKey: PropTypes.number,
    onChange: PropTypes.func
}
