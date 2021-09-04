import styled from "styled-components";

export const PasteContainer = styled.div`
    font-family: Lato;
    position: absolute;
    left: 5.33%;
    right: 5.33%;
    top: 29.04%;
    bottom: 59.34%;
    background: #FFF;
    border: 1px solid white;
    box-shadow: 0.915301px 0.915301px 0.915301px rgba(0, 36, 24, 0.08);
    padding: 0% 3% 8% 1%;
    text-align: center;
    width: 335px;
`;

export const ParagraphWrapper = styled.div `
    position: relative;
    top: 10px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: baseline;

`;

export const PasteParagraph = styled.p `
    width: auto;
    height: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 10px;
    color: #242424;    
`;

export const IconButton = styled.button `
    position: relative;
    left: 15px;
    background: linear-gradient(0deg, #E5FFF6, #E5FFF6);
    width: 16px;
    height: 16px;
    border: none;
    color: #00B87C;
    border: 0.03px solid #00B87C;

`;

export const InputWrapper = styled.div `
    margin: 0;
    display: flex;
`;



export const PasteInput = styled.input `
    width: 240px;
    height: 32px;
    background: #FFFFFF;
    border: 0.915301px solid #00B87C;
    margin-right: 5%;
`;

export const Button = styled.button `
    width: 50px;
    height: 32px;
    background: #00B87C;
    box-shadow: 0.915301px 0.915301px 0.915301px rgba(0, 36, 24, 0.04);
    color: #FFF;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 10px;
    border: none;
`;