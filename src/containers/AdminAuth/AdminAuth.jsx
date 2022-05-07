import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LoginPage } from '../LoginPage/LoginPage';
import { Shell } from '../Shell/Shell';
import { onVerify, onDeleteToken } from '../../redux/user/user.actions';

const AdminAuthComponent = ({ token, isVerify, children, onVerify, onDeleteToken }) => {
    useEffect(() => {
        const verifyToken = async () => {
            await onVerify(token);
            if (!isVerify) {
                await onDeleteToken();
            }
        }
        verifyToken();
    }, [token, onVerify, isVerify, onDeleteToken])


    if (!isVerify) {
        return (
            <LoginPage />
        )
    }
    else {
        return (
            <Shell>
                <>{children}</>
            </Shell>
        )
    }
};

const mapStateToProps = (state) => ({ token: state.user.token, isVerify: state.user.isVerify });

export const AdminAuth = connect(mapStateToProps, { onVerify, onDeleteToken })(AdminAuthComponent)

