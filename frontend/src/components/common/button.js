import styled from "styled-components"

function Button(props) {
  let classes = "primary"
  if(props.color == "secondary") classes = "secondary";
  return <Buttons className={classes} onClick={props.onClick} >
         {props.children}
         </Buttons>;
}

const Buttons = styled.button`
font-size:100%;
padding: 0.25em 1em;
cursor: pointer;

&.primary{
  background: green;
  color: white;
}

&.secondary{
  background: white;
  color: green;
}
`

export default Button;
