@import url("https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap");
import styled from "styled-components"

function Button(props) {
  let classes = "primary"
  if(props.color == "secondary") classes = "secondary";
  return <Buttons className={classes} onClick={props.onClick} >
         <Div className={classes}>
         {props.children}
         </Div>
         </Buttons>;
}

const Buttons = styled.button`
&.primary{
  font-size: 16px;
  width: 13.25em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00B87C;
  box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04);
  border-radius: 3px;
  border-color: #00B87C;
  border-style: solid;
  cursor: pointer;
}

&.secondary{
  font-size: 16px;
  width: 3.9375em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border: 1.5px solid #00B87C;
  border-radius: 3px;
  cursor: pointer;
}
`

const Div = styled.div`
&.primary{
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
}

&.secondary{
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #00B87C;
}
`

export default Button;

/*
BUTTON  HTML
<Button class="primary"><div>Add a song to the playlist</div></Button>
<Button class="secondary"><div>Play</div></Button>

BUTTON CSS
.primary{
  font-size: 16px;
  width: 13.25em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #00B87C;
  box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04);
  border-radius: 3px;
  border-color: #00B87C;
  border-style: solid;
}

.primary div{
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
}

.secondary{
  font-size: 16px;
  width: 3.9375em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #FFFFFF;
  border: 1.5px solid #00B87C;
  border-radius: 3px;
}
.secondary div{
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #00B87C;
}
*/
