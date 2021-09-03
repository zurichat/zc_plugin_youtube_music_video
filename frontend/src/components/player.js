import React  from 'react'
import ReactPlayer from 'react-player/youtube'


const url = 'https://www.youtube.com/watch?v=vX9msKu75qs';
function App() {


 
       return(
    <>
    <div  className='player-container'>
      <h3>Now playing </h3>
      <ReactPlayer className='player-wrapper'  
        url ={url}
        playing = 'true'
        controls = 'true'
        width = '100%'
        height = '100%'  
      />
      
            
    </div>
    </>
  )
}

export default App;
