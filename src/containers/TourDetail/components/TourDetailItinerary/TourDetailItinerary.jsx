import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonNextCommon, ButtonPrevCommon } from '../../../../common';
import TextEditor from '../../../../common/TextEditor/TextEditor';
import { onUpdateCurrentStep, onUpdateUnsaveTour } from '../../../../redux/tour/tour.actions';
import TimeLineItem from './components/TimeLineItem/TimeLineItem';
import './TourDetailItinerary.scss';
class TourDetailItinerary extends Component {
    state = {
        activeItem: 0,
        values: [],
        valuesEn: [],
        storeValues: [],
        storeValuesEn: [],
        currentValue: "",
        currentValueEn: ""
    }

    componentDidMount() {
        const { currentTour } = this.props;
        if (currentTour) {
            if (currentTour.itinerary) {
                let emptyItinerary = 0;
                if (currentTour.itinerary.length < currentTour.day){
                    emptyItinerary = currentTour.day - currentTour.itinerary.length
                    this.setState({ 
                        values: [...currentTour.itinerary, ...Array(emptyItinerary).fill('')], 
                        currentValue: currentTour.itinerary[0],
                        currentValueEn: currentTour.itinerary_en[0]
                    })
                }
                else {
                    emptyItinerary = currentTour.itinerary.length - currentTour.day
                    this.setState({ 
                        values: [...currentTour.itinerary.slice(0, currentTour.day)],
                        currentValue: currentTour.itinerary[0],
                        currentValueEn: currentTour.itinerary_en[0] 
                    })
                }
            } else if (currentTour && !isNaN(+currentTour.day)) {
                this.setState({ 
                    values: Array(+currentTour.day).fill('')
                })
            }
            //en
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
                this.setState({ values: [...newItinerary]})
            } 
            else if (!isNaN(+currentTour.day)) {
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
            this.props.onUpdateUnsaveTour({ itinerary: [...this.state.storeValues], itinerary_en: [...this.state.storeValuesEn] })
        }
    }

    changeActiveItem = (value) => {
        const { storeValues, storeValuesEn, values, valuesEn } = this.state;
        
        this.setState({ 
            activeItem: value,
            values: [...storeValues],
            valuesEn: [...storeValuesEn],
            currentValue: values[value] ? values[value] : Array(value + 1).join(' '),
            currentValueEn: valuesEn[value] ? valuesEn[value] : Array(value + 1).join(' '),
        })
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

    handleChangeInput = (value) => {
        const copyStoreValue = this.state.storeValues.length ? [...this.state.values] : [...this.state.storeValues];

        const { activeItem } = this.state;

        copyStoreValue[activeItem] = value;

        this.setState({
            storeValues: [...copyStoreValue]
        })
    }

    handleChangeInputEn = (value) => {
        const copyStoreValue = this.state.storeValuesEn.length ? [...this.state.valuesEn] : [...this.state.storeValuesEn];

        const { activeItem } = this.state;

        copyStoreValue[activeItem] = value;

        this.setState({
            storeValuesEn: [...copyStoreValue]
        })
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
        const { activeItem, values } = this.state;
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
                                    <TextEditor placeholder="Nội dung" 
                                                onChange={this.handleChangeInput}
                                                initialValues={this.state.currentValue}
                                    />
                                    <TextEditor placeholder="Nội dung (English)" 
                                                onChange={this.handleChangeInputEn}
                                                initialValues={this.state.currentValueEn} />
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
    currentTour: state.tour.currentTour,
    currentStep: state.tour.currentStep,
});


export default connect(mapStateToProps, { onUpdateUnsaveTour, onUpdateCurrentStep })(TourDetailItinerary)