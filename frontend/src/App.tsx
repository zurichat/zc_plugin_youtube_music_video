import styled from "styled-components";

import RoomHeader from "./components/roomHeader";
import MusicRoom from "./components/musicRoom";

import chatMediaQuery from "./utils/chatMedia";

function App() {
  chatMediaQuery(); // toggle chat display based on screen size.

  return (
    <Wrapper>
      <h1>The setup is now working. Thanks to Innocent and his cool friend.</h1>
      <h5>__Justice</h5>
      <RoomHeader />
      <MusicRoom />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* overflow-y: scroll; */
  padding: 10px;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #00b87c;
  }

  @media (max-width: 600px) {
    padding: 0;
    margin: 0;
  }
`;

export default App;
