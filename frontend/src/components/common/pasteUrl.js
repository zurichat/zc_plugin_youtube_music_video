//paste URL html component
/**
 * <div class="linkbox">

        <form action="">
            <div class="inside-box">
                <div class="top-bar">
                    <div>
                        <h1 class="text-info"> Paste Youtube URL Here</h1>
                    </div>
                    <div>
                        <button class="cancel-button"></button>
                    </div>
                </div>
                <div class="add-area">
                    <div>
                        <input class="input-box" type="text" placeholder="https://music.youtube.com/watch?v=v"
                            id="myLink">
                    </div>
                    <button class="addbutton"> Add </button>
                </div>
            </div>
        </form>

    </div>
 */

// paste url css style
/**
 * @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;700&display=swap');
*  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;700&display=swap');
.linkbox{
    width: 732px;
    height: 145px;
    margin: 15% 25% 0 25%;
}
.text-info{
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 16px;
}
::placeholder{
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 16px;
    padding: 17px 0 17px 24px;
    color: #001C13;

}
.inside-box{
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    margin-top: 10px;

}
.input-box{
    height: 44px;
    width: 524px;
    border: 2px solid;

    border-color: #00B87C;
}
.addbutton{
    background-color: #00B87C;
    width: 111px;
    height: 48px;
    margin-left: 20px;
    border: none;
    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 16px;
}
.add-area{
    display: flex;
}
.cancel-button{
    margin-left: 430px;
    padding: 14px;
    border: none;
    color:  #E5FFF6;
    margin-top: 8px;
    margin-right: 24px;
}
.top-bar{
    display: flex;

}

 */

// React component
import React, { useState } from "react";
import { injectGlobal } from "styled-components";
import { FiX } from "react-icons/fi";

const pasteUrl = () => {
  const [url, setUrl] = useState("");

  const handleChange = (event) => setUrl(event.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Song added to the queue");
  };

  return (
    <Wrapper>
    <form onSubmit={handleSubmit} className="submit-form">
      <label htmlFor="" className="form-label">
        Paste Youtube URL here
        <FiX 
          style={{
            color: "#00bb7c",
            background: "#e5fff6",
            width: "1rem",
            height: "1rem",
          }}
        />
      </label>
      <div className="inputs">
      <div className="input-text">
        <input type="text" name='' id="" value={url} onChange={handleChange} />
      </div>
      <div className="input-submit">
        <input type="submit" value="Add" />
      </div>
      </div>
    </form>
    </Wrapper>
  );
};

injectGlobal`
  @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");
  
  body {
    font-family: 'Lato', sans-serif;
    font-size: 0.8rem;
    background: #f9f9f9;
  }
`

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
 .submit-form {
   display: flex;
   justify-content: center;
   flex-direction: column;
   background: #fff;
   width: 400px;
   height: 80px;
   border: 2px solid #fff;
   position: absolute;
   top: 160px;
   left: 180px;
   padding: 1rem;
  }
  .form-label {
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .inputs {
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
  .input-text {
    width: 76%;
    border: 1.5px solid #00bb7c;
    outline: none;
    padding: 0.5rem;
  }
  .input-submit {
    padding: 0.5rem 1.2rem;
    margin-right: 0.9rem;
    color: #fff;
    background: #00bb7c;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default pasteUrl;