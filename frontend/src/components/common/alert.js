import React from "react";
import './alert.css';

function Alert() {
  const linkBtn = React.createRef();
  const alertBtn = React.createRef();

  const onClickLinkBtn = () => {
    alertBtn.current.classList.add('show')
    alertBtn.current.classList.remove('hide')
    alertBtn.current.classList.add('showAlert');

    setTimeout(function() {
      alertBtn.current.classList.remove('show')
      alertBtn.current.classList.add('hide')
    }, 3000)
  }
  return (
    <>
      <div className="alert hide" ref={alertBtn}>
        {/* <span id="icon" className="fas fa-check"></span> */}
        <span className="msg">Added Successfully</span>
      </div>
      <button 
        className="add-link" 
        ref={linkBtn} 
        onClick={onClickLinkBtn}>
        Add Link
      </button>
    </>
  )



  /* html 
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      <title>Alert message</title>
  </head>
  <body>
      <button>Add Link</button>
        <div class="alert hide">
           <span id="icon" class="fas fa-check"></span>
           <span class="msg">Added Successfully</span>
           </div>
  <script src="index.js"></script>         
  </body>
  </html>
  
  //css 
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');
  *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Lato', sans-serif;
      font-size: 1rem;
    }
    html,body{
      height: 100%;
    }
    body{
      display: grid;
      place-items: center;
      overflow: hidden;
    }
    #icon{
      position: absolute;
      color: #FFFFFF;    
    }
    button{
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      border: none;
      outline: none;
      background: #008B5E;
      color: white;
      letter-spacing: 0.06rem;
      cursor: pointer;
    }
    .alert{
      background: #008B5E;
      padding: 1.25rem 1rem;
      min-width: 14rem;
      position: absolute;
      right: 0;
      top: 15.6rem;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
    }
    .alert.showAlert{
      opacity: 1;
      pointer-events: auto;
    }
    .alert.show{
      animation: show_slide 1s ease forwards;
    }
    @keyframes show_slide {
      0%{
        transform: translateX(100%);
      }
      40%{
        transform: translateX(-10%);
      }
      80%{
        transform: translateX(0%);
      }
      100%{
        transform: translateX(-10px);
      }
    }
    .alert.hide{
      animation: hide_slide 1s ease forwards;
    }
    @keyframes hide_slide {
      0%{
        transform: translateX(-10px);
      }
      40%{
        transform: translateX(0%);
      }
      80%{
        transform: translateX(-10%);
      }
      100%{
        transform: translateX(100%);
      }
    }
    
    .alert .msg{
      padding: 0 1.25rem;
      color: #FFFFFF;
    }
  
    //js code 
    $('button').click(function () {
      $('.alert').addClass("show");
      $('.alert').removeClass("hide");
      $('.alert').addClass("showAlert");
      setTimeout(function () {
          $('.alert').removeClass("show");
          $('.alert').addClass("hide");
      }, 5000);
  });
  $('.close-btn').click(function () {
      $('.alert').removeClass("show");
      $('.alert').addClass("hide");
  });
  */
}

export default Alert;
