import React from 'react';
import PropTypes from 'prop-types';

import './Flexbox.scss';

export const Flexbox = props => {
    const {
        row,
        spaceBetween,
        padding,
        containerStyle,
        flexStart,
        children,
        alignItems,
    } = props;

    return (
        <div
            className="flexbox"
            style={{
                display: 'flex',
                flexDirection: !row ? 'column' : 'row',
                justifyContent: spaceBetween ? 'space-between' : flexStart ? 'flex-start' : 'center',
                alignItems,
                padding: padding || 0,
                flexWrap: 'wrap',
                ...containerStyle,
            }}
        >
            {children}
        </div>
    );
};

Flexbox.propTypes = {
    row: PropTypes.bool,
    spaceBetween: PropTypes.bool,
    padding: PropTypes.number,
    containerStyle: PropTypes.object,
    flexStart: PropTypes.bool,
    alignItems: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Flexbox.defaultProps = {
    row: true,
    spaceBetween: false,
    flexStart: false,
    padding: 0,
    containerStyle: {},
    alignItems: 'center',
}