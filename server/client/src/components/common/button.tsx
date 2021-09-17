import React from "react";
import styled from "styled-components";

interface Props {
  color?: string;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  const { color, children, className, onClick } = props;
  const Component = color === "secondary" ? Secondary : Primary;

  // General styles for both buttons
  const styles = {
    margin: "5px 0",
    fontSize: "14px",
    padding: "5px 10px",
    fontFamily: "Lato, sans-serif",
  };

  return (
    <Component className={className} style={styles} onClick={onClick}>
      {children}
    </Component>
  );
};

const Primary = styled.button`
  background: #ffffff;
  border: 1px solid #00b87c;
  border-radius: 3px;
  color: #00b87c;
  transition: all 200ms ease-in-out;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 184, 124, 0.3);
  }

  @media (max-width: 388px) {
    font-size: 12px !important;
    padding: 3px 5px;
  }
`;

const Secondary = styled.button`
  background: #00b87c;
  /* box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04); */
  border-radius: 3px;
  border-width: 1px;
  border-color: #00b87c;
  border-style: solid;
  color: #fff;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: rgba(0, 184, 124, 0.8);
    border-color: rgba(0, 184, 124, 0.8);
  }

  @media (max-width: 388px) {
    font-size: 12px !important;
    padding: 3px 5px;
    margin: 3px 0 !important;
  }
`;

export default Button;
