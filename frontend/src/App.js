import React, { Component } from 'react';
import styled from 'styled-components';
import store from './app/store';

import MusicRoom from "./components/musicRoom";

class App extends Component {
  render() {
    return (
      <Wrapper>
        <h2>Hi here</h2>
        <MusicRoom />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 40px;
`;

export default App;
