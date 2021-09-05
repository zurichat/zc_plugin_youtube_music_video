import React, { Component } from "react";
import styled from "styled-components";

import MusicRoom from "./components/musicRoom";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <MusicRoom />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 20px;

  @media (max-width: 600px) {
    padding: 0;
    margin: 0;
  }
`;

export default App;
