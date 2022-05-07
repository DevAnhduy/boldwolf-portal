import React from 'react';
import './NotFound.scss';
import { BackButton } from '../../common';

export const NotFound = () => {
    return (
        <div className="not-found">
            <div>404</div>
            <BackButton/>
        </div>
    );
};
