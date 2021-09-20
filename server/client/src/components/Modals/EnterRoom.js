import React from 'react'
import styled from 'styled-components'


function EnterRoom({setShowModal, setUserCount,}) {
    const handleClick =() =>{
        setShowModal(prev => !prev)
        setUserCount(prev=> prev +1)
    }
    

    return (
        <div className="overlay">
            <Overlay>
            <Container>
                <div className="container">
                <Header>Join music room</Header>
                <Paragraph>Join room to gain access to the music playlist added by your colleagues and also share your music links with others. Chat and music bants.</Paragraph>
                <Button onClick={handleClick}>Join room</Button>
                </div>
            </Container>
            </Overlay>

        </div>
    )
}
const Container = styled.div`
    position: relative;
    width: 648px;
    height: 207px;
    margin:auto;
    background: #FFFFFF;
    box-shadow: 1px 1px 44px rgba(64, 64, 64, 0.5);
    border-radius: 4px;
    z-index: 3;
`
const Header = styled.h2`
    position: absolute;
    width: 203px;
    height: 32px;
    left: 24px;
    top: 10px;

    font-family: ;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 32px;
    /* identical to box height, or 114% */


    color: #1D1C1D;
`
const Paragraph = styled.p`
    position: absolute;
    max-width: 600px;
    height: 48px;
    left: 24px;
    top: 64px;

    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 24px;
    /* or 185% */


    color: #616061;
`
const Button = styled.button`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 13px 40px;
    outline: none;
    border:none;
    border-radius: 4px;
    position: relative;
    width: 151px;
    height: 47px;
    margin: auto;
    top: 136px;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 21px;
    background: #00B87C;
    box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04);
    cursor:pointer;
`

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0px;
    top: 0px;
    z-index: 2;
    background: rgba(64, 79, 74, 0.5);

    display:flex;
`
export default EnterRoom;
