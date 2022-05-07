import React from 'react';
import PropTypes from 'prop-types';
import './TimeLineItem.scss';

const TimeLineItem = ({ label, active, onChange, id }) => {
    const onClick = () => {
        onChange(id)
    }

    return (
        <div className='time-line-wrap'>
            <div className='time-line-icon-wrap'>
                <div className={`time-line-icon ${active && 'active'}`} onClick={onClick}></div>
            </div>
            <div className='time-line-label'>{label}</div>
        </div>
    );
};

TimeLineItem.propTypes = {
    label: PropTypes.string,
    active: PropTypes.bool,
    id: PropTypes.any,
    onChange: PropTypes.func,
}

export default TimeLineItem;