/*
 * Created on Sat Jul 27 2019
 *
 * Copyright 2019 smilu97
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { formatDate } from '.';

function TextDateTime(props) {
    const { title, value } = props;
    return (
        <Wrapper>
            <TitleText>{title}</TitleText>
            <DateTimeBox>
                <ValueText>{formatDate(value)}</ValueText>
            </DateTimeBox>
        </Wrapper>
    );
}
TextDateTime.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.object,
};

const Wrapper = styled.div`
    width: 48%;
`;
const TitleText = styled.h1`
    color: #444 ;
    font-size: 20px;
`;
const DateTimeBox = styled.div`
    padding: 5px;
    border-radius: 0;
    border: 1px solid #ccc;
    background: white;
    margin: 10px 0;
    height: 30px;
    display: flex;
    align-items: center;
`;
const ValueText = styled.p`
    color: #444;
    font-size: 20px;
`;

export default TextDateTime;
