import React from 'react';
// import PropTypes from 'prop-types';
import './StepCommon.scss'
import { Steps } from 'antd';

const { Step } = Steps;

export const StepCommon = ({ current = 1, onChange, steps, lastedStep}) => {

    return (
        <section className="step-common">
            <Steps
                type="navigation"
                current={current}
                onChange={onChange}
                className="site-navigation-steps"
            >
                {
                    steps.map((item, index) => (
                        <Step 
                            key = {item.id}
                            status={index === lastedStep ? 'process' : (lastedStep < index) ? 'wait' : 'finish'} 
                            title={item.title || `Bước ${index + 1}`}
                            />
                    ))
                }
            </Steps>

        </section>
    );
};

StepCommon.propTypes = {
    
};