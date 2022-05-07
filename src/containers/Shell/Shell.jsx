import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, SideBar, SideBarSmallScreen} from '../../common';
import Responsive from '../../common/Responsive/Responsive';

import './Shell.scss';


export const Shell = ({ children }) => {
    const [compact, setCompact] = useState(false);

    return (
        <>
            <Responsive.Default>
                <div className="shell">
                    <Flexbox row containerStyle={{ alignItems: 'stretch' }}>
                        <SideBar compact={compact} onModeChanged={() => setCompact(!compact)} />
                        <div
                            className="shell-wrap"
                            style={{
                                width: compact ? 'calc(100vw - 70px)' : 'calc(100vw - 250px)',
                            }}
                        >
                            <Flexbox
                                alignItems="flex-start"
                                row
                                containerStyle={{
                                    flex: 1,
                                    height: 'calc(100vh)',
                                    overflowY: 'scroll',
                                    overflowX: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                {/* <GlobalLoading /> */}
                                <div className="main-content">{children}</div>
                            </Flexbox>
                        </div>
                    </Flexbox>
                </div>
            </Responsive.Default>
            <Responsive.Mobile>
                {/* <div style={{ paddingBottom: 60, overflow: 'hidden', background: '#fdf7f2' }}>
                    {children}
                </div> */}
                <div className="shell-small-wrap">
                    {children}
                </div>
                <SideBarSmallScreen />
            </Responsive.Mobile>
            {/* <NotificationPopup /> */}
        </>
    );
};

Shell.propTypes = {
    children: PropTypes.object.isRequired,
};

Shell.defaultProps = {};
