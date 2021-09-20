import React from 'react'
import styled from 'styled-components'
import  axios from  'axios'

function EnterRoom({setShowModal}) {
    const handleClick =() =>{
        setShowModal(prev => !prev)
    }
    const id_user = {user_id:1 , user_name:"johns"}
    const BASE_URL = 'http://127.0.0.1:8000/music/api/v1/add_to_room';
    axios.put( BASE_URL, id_user)
    .then(response => console.log(response.status));
    return (
        <div className="overlay">
            <Overlay>
            <Container>
   
                <h2>Join music room</h2>
                <p className='pragraph'>Join room to gain access to the music playlist added by your colleagues and also share your music links with others. Chat and music bants.</p>
                <button className='btn' onClick={handleClick}>Join room</button>

            </Container>
            </Overlay>

        </div>
    )
}

const Overlay = styled.div`
background: rgba(0, 0, 0, 0.3);
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 3;
margin: 0;
padding: 0;

`
const Container = styled.div`
    position: relative;
    
    background: #FFFFFF;
    box-shadow: 1px 1px 44px rgba(64, 64, 64, 0.5);
    border-radius: 4px;
    z-index: 3;
    max-width: 648px;
    margin: 80px auto;
    min-height: 207px;

      h2{
        position: absolute;
        width: 203px;
        height: 32px;
        left: 24px;
        top: 5px;
    
        font-family: Lato;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 32px;
        /* identical to box height, or 114% */
    
    
    
        color: #1D1C1D;
    
        
    
      }
      .pragraph{
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
    
      }
      .btn{
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
    
      }
      @media (max-width: 480px) {
        max-width: 335px;
        margin: 150px auto;
        h2 {
          font-size: 16px;
          left: 16px;
        }
        .pragraph{
            width: 303px;
            height: 72px;
            left: 16px;
            top: 35px;
            
            font-family: Lato;
            font-style: normal;
            font-weight: normal;
            font-size: 13px;
            line-height: 24px;
            /* or 185% */
            
            
            color: #616061;
        }
      }
`


export default EnterRoom;
