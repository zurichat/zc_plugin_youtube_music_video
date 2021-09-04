<<<<<<< HEAD
import React, { Component } from 'react';
import styled from 'styled-components';
import store from './app/store';
import PlaylistItem from './components/common/playlistItem';
=======
import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import styled from "styled-components";
>>>>>>> de2125602e60e519a19468363b66d8bb22416b33

import MusicRoom from './components/musicRoom';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <MusicRoom />
        <PlaylistItem />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding: 40px;
`;

export default hot(App);
