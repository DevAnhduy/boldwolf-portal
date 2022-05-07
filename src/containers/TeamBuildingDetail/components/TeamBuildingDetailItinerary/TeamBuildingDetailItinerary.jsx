import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonNextCommon, ButtonPrevCommon } from '../../../../common';
import { onUpdateCurrentStep, onUpdateUnsaveTeamBuilding } from '../../../../redux/teamBuilding/teamBuilding.actions';
import TimeLineItem from './components/TimeLineItem/TimeLineItem';
import './TeamBuildingDetailItinerary.scss';
import TextEditor from '../../../../common/TextEditor/TextEditor';
class TeamBuildingDetailItinerary extends Component {
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
        const { currentTeamBuilding } = this.props;

        if (currentTeamBuilding) {
            if (currentTeamBuilding.itinerary) {
                let emptyItinerary = 0;
                if (currentTeamBuilding.itinerary.length < currentTeamBuilding.day){
                    emptyItinerary = currentTeamBuilding.day - currentTeamBuilding.itinerary.length
                    this.setState({ 
                        values: [...currentTeamBuilding.itinerary, ...Array(emptyItinerary).fill('')], 
                        currentValue: currentTeamBuilding.itinerary[0],
                        currentValueEn: currentTeamBuilding.itinerary_en[0]
                    })
                }
                else {
                    emptyItinerary = currentTeamBuilding.itinerary.length - currentTeamBuilding.day
                    this.setState({ 
                        values: [...currentTeamBuilding.itinerary.slice(0, currentTeamBuilding.day)],
                        currentValue: currentTeamBuilding.itinerary[0],
                        currentValueEn: currentTeamBuilding.itinerary_en[0] 
                    })
                }
                
            } else if (currentTeamBuilding && !isNaN(+currentTeamBuilding.day)) {
                this.setState({ values: Array(+currentTeamBuilding.day).fill('') })
            }

            // en
            if (currentTeamBuilding.itinerary_en) {
                let emptyItinerary = 0;
                if (currentTeamBuilding.itinerary_en.length < currentTeamBuilding.day){
                    emptyItinerary = currentTeamBuilding.day - currentTeamBuilding.itinerary_en.length
                    this.setState({ valuesEn: [...currentTeamBuilding.itinerary_en, ...Array(emptyItinerary).fill('')] })
                }
                else {
                    emptyItinerary = currentTeamBuilding.itinerary_en.length - currentTeamBuilding.day
                    this.setState({ valuesEn: [...currentTeamBuilding.itinerary_en.slice(0, currentTeamBuilding.day)] })
                }
            } else if (currentTeamBuilding && !isNaN(+currentTeamBuilding.day)) {
                this.setState({ valuesEn: Array(+currentTeamBuilding.day).fill('') })
            }
        }
    }

    componentDidUpdate(prevProps) {
        const { currentTeamBuilding } = this.props;
        const { values } = this.state;

        if (values.length === 0 || (prevProps.currentTeamBuilding && currentTeamBuilding &&
            prevProps.currentTeamBuilding.day !== currentTeamBuilding.day)) {
            if (currentTeamBuilding.itinerary && currentTeamBuilding.day) {
                const { itinerary, day } = currentTeamBuilding
                const newItinerary = itinerary.length > day ? itinerary.slice(0, currentTeamBuilding.day) : [...itinerary, ...Array(day - itinerary.length)]
                this.setState({ values: [...newItinerary] })
            } else
                if (!isNaN(+currentTeamBuilding.day)) {
                    this.setState({ values: Array(+currentTeamBuilding.day).fill('') })
                }

            // en
            if (currentTeamBuilding.itinerary_en && currentTeamBuilding.day) {
                const { itinerary_en, day } = currentTeamBuilding
                const newItinerary_en = itinerary_en.length > day ? itinerary_en.slice(0, currentTeamBuilding.day) : [...itinerary_en, ...Array(day - itinerary_en.length)]
                this.setState({ valuesEn: [...newItinerary_en] })
            } else
                if (!isNaN(+currentTeamBuilding.day)) {
                    this.setState({ valuesEn: Array(+currentTeamBuilding.day).fill('') })
                }
        }
    }


    componentWillUnmount() {
        this.onSubmit()
    }

    onSubmit = () => {
        const { currentTeamBuilding } = this.props;
        // if day and itinerary are valid
        if (currentTeamBuilding && !isNaN(+currentTeamBuilding.day)) {
            this.props.onUpdateUnsaveTeamBuilding({ itinerary: [...this.state.storeValues], itinerary_en: [...this.state.storeValuesEn] })
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
        const { currentTeamBuilding } = this.props;
        return (
            <section className="teamBuilding-detail-itinerary-wrap">
                {
                    ( !currentTeamBuilding || !parseInt(currentTeamBuilding.day)) ?
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
    currentTeamBuilding: state.teamBuilding.currentTeamBuilding,
    currentStep: state.teamBuilding.currentStep,
});


export default connect(mapStateToProps, { onUpdateUnsaveTeamBuilding, onUpdateCurrentStep })(TeamBuildingDetailItinerary)