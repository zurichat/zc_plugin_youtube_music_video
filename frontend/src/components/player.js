import React  from 'react'
import ReactPlayer from 'react-player/youtube'
import styled from 'styled-components'; 

const url = 'https://www.youtube.com/watch?v=vX9msKu75qs';
function App() {


 
       return(
    
    <styledDiv  className='player-container'>
      <styledH3>Now playing </styledH3>
      <styledReactPlayer className='player-wrapper'  
        url ={url}
        playing = 'true'
        controls = 'true'
       /* width = '100%'
        height = '100%'*/  
      />
      
    <styledTitle>{videoTitle}</styledTitle>      
    </styledDiv>
    
  );
}

export default App;

export const styledDiv = styled.div`
    position: absolute;
    font-family: Lato;
    width: 93.7%;
    height: 30.73%;
    left: 3.15%;
    right: 3.15%;
    top: 18.35%;
    bottom: 60.35%;
`;

export const styledH3 = styled.h3`
    
    top: 0;
    left: 0;
    width: auto;
    height: 4.65%;      
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 3.43%;
    line-height: 4.65%;
    /* identical to box height, or 105% */
    color: #242424;
`;

export const styledReactPlayer = styled.ReactPlayer`
    margin: 3.54% 0 3.5% 0;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 83.63%;
    top: 4.65%;
`;

export const styledTitle = styled.title`
    width: auto;
    height: 4.65%;
    left: 0;
    bottom: 0;
    font-family: Lato;
    font-style: normal;
    font-weight: 600;
    font-size: 3.43%;
    line-height: 4.65%;
    /* identical to box height, or 105% */
    color: #242424
`;