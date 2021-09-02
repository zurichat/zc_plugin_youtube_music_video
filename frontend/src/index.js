import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS
import PlaylistHeader from './components/playlist-header';

const App = () => {
  return (
    <div className="hello">
      <PlaylistHeader/>
    </div>
  )
}


ReactDOM.render(<App/>, document.querySelector('#root'));
