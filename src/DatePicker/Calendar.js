/*
 * Created on Sat Jul 27 2019
 *
 * Copyright 2019 smilu97
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        let { startDate } = props;
        if (startDate === null || startDate === undefined) {
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
        }
        this.state = {
            year: startDate.getFullYear(),
            month: startDate.getMonth(),
            select: 0,
        };
    }
    getPrevs(year, month) {
        const first = new Date(year, month, 1);
        const prev = new Date(first.getTime() - (1000 * 60 * 60 * 24));
        const day = first.getDay();
        const offset = prev.getDate() - day + 1;
        return _.range(offset, offset + day).map(d =>
            new Date(prev.getFullYear(), prev.getMonth(), d));
    }
    getNexts(year, month) {
        const next = new Date(year, month + 1, 1);
        return _.range(1, (7 - next.getDay()) % 7 + 1).map(d =>
            new Date(year, month + 1, d));
    }
    getLastDate(year, month) {
        const next = new Date(year, month + 1, 1);
        const last = new Date(next.getTime() - (1000 * 60 * 60 * 24));
        return last.getDate();
    }
    handlePrevMonth() {
        let { year, month } = this.state;
        month -= 1;
        if (month < 0) {
            month = 11;
            year -= 1;
        }
        this.setState({ year, month });
    }
    handleNextMonth() {
        let { year, month } = this.state;
        month += 1;
        if (month >= 12) {
            month = 0;
            year += 1;
        }
        this.setState({ year, month });
    }
    handleClickDate(curDate) {
        const { startDate, endDate, onDateChanged } = this.props;
        if (this.state.select === 0) {
            onDateChanged('start', curDate);
            if (endDate && curDate.getTime() > endDate.getTime()) {
                onDateChanged('end', null);
            }
            this.setState({ select: 1 });
        } else if (this.state.select === 1) {
            if (startDate && curDate.getTime() <  startDate.getTime()) {
                onDateChanged('start', curDate);
                onDateChanged('end', startDate);
            } else {
                onDateChanged('end', curDate);
            }
            this.setState({ select: 0 });
        }
    }
    render() {
        const { startDate, endDate } = this.props;
        const { year, month } = this.state;
        const prevs = this.getPrevs(year, month);
        const nexts = this.getNexts(year, month);
        const lastDate = this.getLastDate(year, month);
        return (
            <Wrapper>
                <MonthWrapper>
                    <MdChevronLeft
                        size={30}
                        onClick={() => this.handlePrevMonth()}
                    />
                    <MonthText>{year}년 {month + 1}월</MonthText>
                    <MdChevronRight
                        size={30}
                        onClick={() => this.handleNextMonth()}
                    />
                </MonthWrapper>
                <DaysWrapper>
                    <DayWrapper><DayText>일</DayText></DayWrapper>
                    <DayWrapper><DayText>월</DayText></DayWrapper>
                    <DayWrapper><DayText>화</DayText></DayWrapper>
                    <DayWrapper><DayText>수</DayText></DayWrapper>
                    <DayWrapper><DayText>목</DayText></DayWrapper>
                    <DayWrapper><DayText>금</DayText></DayWrapper>
                    <DayWrapper><DayText>토</DayText></DayWrapper>
                </DaysWrapper>
                <DatesBox>
                    {prevs.map(d => (
                        <DateItem
                            disable
                            start={startDate}
                            end={endDate}
                            date={d}
                            key={d.getTime()}
                        />
                    ))}
                    {_.range(1, lastDate + 1)
                        .map(d => new Date(year, month, d))
                        .map(d => (
                        <DateItem
                            onClick={() => this.handleClickDate(d)}
                            start={startDate}
                            end={endDate}
                            date={d}
                            key={d.getTime()}
                        />
                    ))}
                    {nexts.map(d => (
                        <DateItem
                            disable
                            start={startDate}
                            end={endDate}
                            date={d}
                            key={d.getTime()}
                        />
                    ))}
                </DatesBox>
            </Wrapper>
        );
    }
}
Calendar.propTypes = {
    startDate: PropTypes.object,
    endDate: PropTypes.object,
};

function DateItem(props) {
    const { start, end, date, disable, onClick } = props;
    let brl = 0;
    let brr = 0;
    let background = 'white';
    if (start) {
        start.setHours(0, 0, 0, 0);
        if (start.getTime() === date.getTime()) {
            brl = '10px';
            background = 'rgb(252, 188, 13)';
        }
    }
    if (end) {
        end.setHours(0, 0, 0, 0);
        if (end.getTime() === date.getTime()) {
            brr = '10px';
            background = 'rgb(252, 188, 13)';
        }
    }
    if (start && end) {
        if (start.getTime() < date.getTime() &&
            date.getTime() < end.getTime()) {
            background = 'rgb(255, 232, 168)';
        }
    }
    const borderRadius = `${brl} ${brr} ${brr} ${brl}`;
    return (
        <DateItemWrapper onClick={onClick}>
            <DateText
                disable={disable}
                style={{ background, borderRadius }}
            >{date.getDate()}</DateText>
        </DateItemWrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    border: 1px solid #ccc;
    background: white;
`;

const MonthWrapper = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const MonthText = styled.p`
    font-size: 20px;
    color: #333;
`;

const DaysWrapper = styled.div`
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;
const DayWrapper = styled.div`
`;
const DayText = styled.p`
    font-size: 20px;
    color: #333;
`;

const DatesBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
const DateItemWrapper = styled.div`
    position: relative;
    width: 59px;
    height: 60px;
    text-align: center;
    z-index: 1000;
    overflow: hidden;
`;
const DateText = styled.h3`
    width: 100%;
    height: 100%;
    font-size: 20px;
    color: ${p => p.disable ? '#999' : '#222'};
    z-index: 1002;
    background: rgb(252, 188, 13);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Calendar;
