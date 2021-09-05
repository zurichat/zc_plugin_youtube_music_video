import React from 'react';
import styled from 'styled-components';

function Button({ color, children, className }) {
  const Component = color === 'secondary' ? Secondary : Primary;

  // General styles for both buttons
  const styles = {
    margin: '10px 0',
    fontSize: '17px',
    padding: '5px 15px',
  };

  return (
    <Component className={className} style={styles}>
      {children}
    </Component>
  );
}

const Primary = styled.button`
  background: #ffffff;
  border: 1.5px solid #00b87c;
  border-radius: 3px;
  color: #00b87c;
  transition: all 150ms ease-in-out;

  &:hover {
    box-shadow: 0 2px 10px rgba(0, 184, 124, 0.3);
  }
`;

const Secondary = styled.button`
  background: #00b87c;
  box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04);
  border-radius: 3px;
  border-color: #00b87c;
  border-style: solid;
  color: #fff;
  transition: all 150ms ease-in-out;

  &:hover {
    background-color: rgba(0, 184, 124, 0.8);
    border-color: rgba(0, 184, 124, 0.8);
  }
`;

export default Button;
