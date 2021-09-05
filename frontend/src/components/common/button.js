import React from "react";
import styled from "styled-components";

function Button({ color, children, className, onClick }) {
  const Component = color === "secondary" ? Secondary : Primary;

  // General styles for both buttons
  const styles = {
    margin: "5px 0",
    fontSize: "14px",
    padding: "5px 10px",
  };

  return (
    <Component className={className} style={styles} onClick={onClick}>
      {children}
    </Component>
  );
}

const Primary = styled.button`
  background: #ffffff;
  border: 1px solid #00b87c;
  border-radius: 3px;
  color: #00b87c;

  @media (max-width: 388px) {
    font-size: 12px !important;
    padding: 3px 5px;
  }
`;

const Secondary = styled.button`
  background: #00b87c;
  box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04);
  border-radius: 3px;
  border-color: #00b87c;
  border-style: solid;
  color: #fff;

  @media (max-width: 388px) {
    font-size: 12px !important;
    padding: 3px 5px;
    margin: 3px 0 !important;
  }
`;

export default Button;
