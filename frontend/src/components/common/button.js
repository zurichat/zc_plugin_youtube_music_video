import styled from 'styled-components';
import React from 'react';

function Button({ color, children, className }) {
  // const Component = color === 'secondary' ? Secondary : Primary;

  // General styles for both buttons
  const styles = {
    margin: '10px 0',
    fontSize: '17px',
    padding: '5px 15px',
  };

  return (
    <Btn className={className} style={styles}>
      {children}
    </Btn>
  );
}

const Btn = styled.div`
  transition: all 150ms ease-in-out;

  &:hover {
    cursor: pointer;
  }
  &.primary {
    background: #ffffff;
    border: 1.5px solid #00b87c;
    border-radius: 3px;
    color: #00b87c;

    &:hover {
      box-shadow: 0 2px 10px rgba(0, 184, 124, 0.3);
    }
  }

  &.secondary {
    background: #00b87c;
    /* box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04); */
    border-radius: 3px;
    /* border-color: #00b87c; */
    border: 1.5px solid #00b87c;
    color: #fff;

    &:hover {
      background-color: rgba(0, 184, 124, 0.8);
      border-color: rgba(0, 184, 124, 0.8);
    }
  }
`;

export default Button;

/*
BUTTON  HTML
<Button class="primary"><div>Add a song to the playlist</div></Button>
<Button class="secondary"><div>Play</div></Button>
=======


export default Button; */
