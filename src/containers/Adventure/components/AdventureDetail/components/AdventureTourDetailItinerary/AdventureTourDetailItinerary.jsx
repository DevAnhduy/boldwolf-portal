import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonNextCommon, ButtonPrevCommon } from '../../../../../../common';
import { TextAreaCommon } from '../../../../../../common/TextAreaCommon/TextAreaCommon';
import { onUpdateCurrentStep, onUpdateUnsaveTour } from '../../../../../../redux/adventure/adventure.actions';
import TimeLineItem from './components/TimeLineItem/TimeLineItem';
import './AdventureTourDetailItinerary.scss';
class AdventureTourDetailItinerary extends Component {
    state = {
        activeItem: 0,
        values: [],
        valuesEn: [],
    }

    componentDidMount() {
        const { currentTour } = this.props;
        if (currentTour) {
            if (currentTour.itinerary) {
                let emptyItinerary = 0;
                if (currentTour.itinerary.length < currentTour.day){
                    emptyItinerary = currentTour.day - currentTour.itinerary.length
                    this.setState({ values: [...currentTour.itinerary, ...Array(emptyItinerary).fill('')] })
                }
                else {
                    emptyItinerary = currentTour.itinerary.length - currentTour.day
                    this.setState({ values: [...currentTour.itinerary.slice(0, currentTour.day)] })
                }
            } else if (currentTour && !isNaN(+currentTour.day)) {
                this.setState({ values: Array(+currentTour.day).fill('') })
            }

            // en
            if (currentTour.itinerary_en) {
                let emptyItinerary = 0;
                if (currentTour.itinerary_en.length < currentTour.day){
                    emptyItinerary = currentTour.day - currentTour.itinerary_en.length
                    this.setState({ valuesEn: [...currentTour.itinerary_en, ...Array(emptyItinerary).fill('')] })
                }
                else {
                    emptyItinerary = currentTour.itinerary_en.length - currentTour.day
                    this.setState({ valuesEn: [...currentTour.itinerary_en.slice(0, currentTour.day)] })
                }
            } else if (currentTour && !isNaN(+currentTour.day)) {
                this.setState({ valuesEn: Array(+currentTour.day).fill('') })
            }
        }
    }

    componentDidUpdate(prevProps) {
        const { currentTour } = this.props;
        const { values } = this.state;
        if (values.length === 0 || (prevProps.currentTour && currentTour &&
            prevProps.currentTour.day !== currentTour.day)) {
            if (currentTour.itinerary && currentTour.day) {
                const { itinerary, day } = currentTour
                const newItinerary = itinerary.length > day ? itinerary.slice(0, currentTour.day) : [...itinerary, ...Array(day - itinerary.length)]
                this.setState({ values: [...newItinerary] })
            } else
                if (!isNaN(+currentTour.day)) {
                    this.setState({ values: Array(+currentTour.day).fill('') })
                }

            // en
            if (currentTour.itinerary_en && currentTour.day) {
                const { itinerary_en, day } = currentTour
                const newItinerary_en = itinerary_en.length > day ? itinerary_en.slice(0, currentTour.day) : [...itinerary_en, ...Array(day - itinerary_en.length)]
                this.setState({ valuesEn: [...newItinerary_en] })
            } else
                if (!isNaN(+currentTour.day)) {
                    this.setState({ valuesEn: Array(+currentTour.day).fill('') })
                }
        }
    }


    componentWillUnmount() {
        this.onSubmit()
    }

    onSubmit = () => {
        const { currentTour } = this.props;
        // if day and itinerary are valid
        if (currentTour && !isNaN(+currentTour.day)) {
            this.props.onUpdateUnsaveTour({ itinerary: [...this.state.values], itinerary_en: [...this.state.valuesEn] })
        }
    }

    changeActiveItem = (value) => {
        this.setState({ activeItem: value })
    }

    handleChange = (value) => {
        const { activeItem, values } = this.state;
        const newValues = [...values]
        newValues[activeItem] = value
        this.setState({ values: newValues })
    }

    handleChangeEn = (value) => {
        const { activeItem, valuesEn } = this.state;
        const newValues = [...valuesEn]
        newValues[activeItem] = value
        this.setState({ valuesEn: newValues })
    }

    // STEP: data will be save when change step by func componentWillUnmount
    onChangeStep = (step) => {
        this.props.onUpdateCurrentStep(this.props.currentStep + step)
    }

    onGotoNext = () => {
        this.onChangeStep(1)
    }

    onGotoPrev = () => {
        this.onChangeStep(-1)
    }


    render() {
        const { activeItem, values, valuesEn } = this.state;
        const { currentTour } = this.props;
        return (
            <section className="tour-detail-itinerary-wrap">
                {
                    ( !currentTour || !parseInt(currentTour.day)) ?
                        <div className="u-description description">
                            Vui lòng nhập số ngày để điền thông tin lịch trình
                        </div>
                        :
                        <>
                            <div className="u-description description">
                                {values[activeItem] ? 'Nội dung đã được lưu' : 'Vui lòng nhập nội dung'}
                            </div>
                            <div className='content-wrap'>
                                <div className='time-line'>
                                    {
                                        (values.map((_item, index) =>
                                            (<TimeLineItem
                                                key={index}
                                                active={index === activeItem}
                                                id={index}
                                                label={`Ngày ${index + 1}`}
                                                onChange={this.changeActiveItem} />)))
                                    }
                                </div>
                                <div className='content'>
                                    <TextAreaCommon
                                        label="Nội dung"
                                        onChange={this.handleChange}
                                        value={values[activeItem]} minRows={10} maxRows={25} />
                                    <TextAreaCommon
                                        label="Nội dung (English)"
                                        onChange={this.handleChangeEn}
                                        value={valuesEn[activeItem]} minRows={10} maxRows={25} />
                                </div>
                            </div>
                            <div className="btn-group">
                                <ButtonPrevCommon type="default" onClick={this.onGotoPrev}>
                                    Trở về
                                </ButtonPrevCommon>
                                <ButtonNextCommon type="primary" onClick={this.onGotoNext}>
                                    Tiếp theo
                                </ButtonNextCommon>
                            </div>
                        </>
                }
            </section>
        );
    }
};


const mapStateToProps = (state) => ({
    currentTour: state.adventure.currentTour,
    currentStep: state.adventure.currentStep,
});


export default connect(mapStateToProps, { onUpdateUnsaveTour, onUpdateCurrentStep })(AdventureTourDetailItinerary)