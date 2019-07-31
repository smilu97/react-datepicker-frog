/*
 * Created on Sat Jul 27 2019
 *
 * Copyright 2019 smilu97
 */

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import DatePicker from './DatePicker';
import './global-style.css';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
        };
    }
    handleDateChanged(type, date) {
        if (type === 'start') {
            this.setState({ startDate: date });
        } else if (type === 'end') {
            this.setState({ endDate: date });
        }
    }
    render() {
        const { startDate, endDate } = this.state;
        return (
            <Container>
                <Middle>
                    <DatePicker
                        startDate={startDate}
                        endDate={endDate}
                        onDateChanged={(t, d) => this.handleDateChanged(t, d)}
                    />
                </Middle>
            </Container>
        );
    }
}

const Container = styled.div`
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100000;
`;

const Middle = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
