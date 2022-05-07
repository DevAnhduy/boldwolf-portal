import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons'
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './BackButton.scss'


 const BackButtonCustom = ({history, backPath}) => {
    const handleClick = (e) => {
        e.stopPropagation()
        if (backPath) {
            history.push(backPath)
        } else {
            history.goBack()
        }
    }

    return (
        <span className="back-btn">
            <ArrowLeftOutlined onClick={handleClick}/>
        </span>
    );
};

BackButtonCustom.propTypes = {
    backPath: PropTypes.string
};

export const BackButton = withRouter(BackButtonCustom)