import React from 'react';
import PropTypes from 'prop-types';
import './Heading.scss'
export const Heading = ({heading, children}) => {
    return (
        <h1 className="heading">
            {heading || children}
        </h1>
    );
};

Heading.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node
};