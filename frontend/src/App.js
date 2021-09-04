import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import styled from "styled-components";


// components
import PlaylistHeader from './components/playlist-header';

import MusicRoom from "./components/musicRoom";


class App extends Component {
  render() {
    return (
      <PlaylistHeader/>
      <Wrapper>
        <MusicRoom />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 40px;
`;

export default hot(App);
