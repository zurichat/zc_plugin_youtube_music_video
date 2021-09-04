import icon1 from './smileylogo.svg';
import icon2 from './giflogo.svg';
import icon3 from './sendlogo.svg';
import './App.css';

function ChatInput () {
  return <div className='input-group'>
    <div className='input-box'>
        <Chatinput placeholder={"Type a message..."} />
          <a href="#"><img src={icon1}/></a>
          <a href="#"><img src={icon2}/></a>
          <a href="#"><img src={icon3}/></a>
    </div>
  </div>
}


export default ChatInput;