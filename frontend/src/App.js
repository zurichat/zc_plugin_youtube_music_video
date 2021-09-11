import React, { useEffect } from "react";
import styled from "styled-components";

import MusicRoom from "./components/musicRoom";

import chatMediaQuery from "./utils/chatMedia";

function App() {
  chatMediaQuery(); // toggle chat display based on screen size.

  return (
    <Wrapper>
      <MusicRoom />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;

  @media (max-width: 600px) {
    padding: 0;
    margin: 0;
  }
`;

export default App;
