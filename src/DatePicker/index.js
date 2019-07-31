/*
 * Created on Sat Jul 27 2019
 *
 * Copyright 2019 smilu97
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextDateTime from './TextDateTime';
import Calendar from './Calendar';

export function formatDate(t) {
    if (t === undefined || t === null) {
        return '';
    }
    const y = t.getFullYear();
    const m = t.getMonth() + 1;
    const d = t.getDate();
    return `${y}-${m}-${d}`;
}

class DatePicker extends React.Component {
    componentDidMount() {
        const { startDate, endDate, onDateChanged } = this.props;
    }
    render() {
        const { startDate, endDate, onDateChanged } = this.props;
        return (
            <Wrapper>
                <TextDateTime
                    title="출발일자"
                    value={startDate}
                />
                <TextDateTime
                    title="도착일자"
                    value={endDate}
                />
                <Calendar
                    startDate={startDate}
                    endDate={endDate}
                    onDateChanged={onDateChanged}
                />
            </Wrapper>
        );
    }
}
DatePicker.propTypes = {
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onDateChanged: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
    background: white;
    padding: 10px;
    width: 420px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export default DatePicker;
