import React from 'react';
import styled from 'styled-components';

interface Props {
	color?: 'primary' | 'secondary' | 'disabled';
	className?: string;
	onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  const { color, children, ...rest } = props;
  const Component =		color === 'secondary'
		  ? Secondary
		  : color === 'disabled'
		    ? Disabled
		    : Primary;

  // General styles for both buttons
  const styles = {
    margin: '5px 0',
    fontSize: '14px',
    padding: '5px 10px',
    fontFamily: 'Lato, sans-serif',
    cursor: 'pointer',
  };

  return (
    <Component style={styles} {...rest}>
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

	/* @media (max-width: 388px) {
    font-size: 12px !important;
    padding: 3px 5px;
    margin: 3px 0 !important;
  } */
`;

const Disabled = styled.button`
	background: #cecccc;
	border-radius: 3px;
	color: #0a0a0ace;
	transition: all 200ms ease-in-out;
	cursor: none !important;
	border: none;
	outline: none;
`;

export default Button;
