import icon1 from './icon1.svg';
import icon2 from './icon2.svg';
import icon3 from './icon3.svg';

import styled from 'styled-components'

const InputBar = styled.input `
    height: 48px;
    width: 347px;
    left: 778px;
    top: 418px;
    border-radius: 0px;
    position: absolute;
    padding: 0 12px;
    font: lato;
    font-weight: 500;
    font-style: normal;
    font-size: 15px;
    line-height: 18px;
    border:2px solid #08FFAE;

    ::placeholder {
    color:#C1C1C1;
    position: static;
   }
`;

const Icon = styled.img `
    color: #08FFAE;
    width: 22px;
    left: 66rem;
    margin-top: 0.6rem;
    top: 12px;
    position: absolute;
    top: 423px;
`

const Icon1 = styled.img `
    color: #08FFAE;
    width: 22px;
    left: 68rem;
    margin-top: 0.6rem;
    top: 14px;
    position: absolute;
    top: 425px;
`
const Icon2 = styled.img `
    color: #08FFAE;
    width: 22px;
    left: 70rem;
    margin-top: 0.6rem;
    top: 12px;
    position: absolute;
    top: 424px;
`

function ChatInput() {
  return <div className="input-group">
          <div className="input-box">
            <InputBar type="text" className="chat-input" placeholder="Type a message..." />
            <a href="#"><Icon src={icon1} alt="" /></a>
            <a href="#"><Icon1 src={icon2} alt="" /></a>
            <a href="#"><Icon2 src={icon3} alt="" /></a>
          </div>
  </div>
}
export default ChatInput;



