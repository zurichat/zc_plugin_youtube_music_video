<<<<<<< HEAD
import React from "react";
import styled from "styled-components";
// import image from "src/media/user.png";

function ChatItem(props) {
  return (
    <Chat>
      <Items>
        <Img
          src="https://images.unsplash.com/photo-1498462440456-0dba182e775b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BsYXNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="user avater"
        />
        <NameTime>
          <Describe>
            <Username>Amara</Username>
            <Span>3 minute ago</Span>
          </Describe>
          <P>If you ask me, I would say it is so overrated, but....</P>
        </NameTime>
      </Items>
    </Chat>
  );
}

export default ChatItem;

export const Chat = styled.div`
  width: 347px;
  height: 573px;
  background: #ffffff;
  align-items: flex-start;
  padding: 1rem;
  margin: 4px 0px;
`;

export const Items = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
`;

export const Describe = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const Username = styled.h4`
  color: #242424;
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  margin-left: 8px;
  margin-right: 16px;
`;

export const nameTime = styled.div`
  display: flex;
`;

export const Span = styled.span`
  font-family: Lato;
  font-size: 16px;
  line-height: 19px;
  color: #c1c1c1;
`;

export const P = styled.p`
  font-size: 14px;
  line-height: 140%;
  color: #3a3a3a;
  margin: 8px 8px;
`;

export const Img = styled.img`
  width: 45px;
  height: 40px;
  border-radius: 50%;
`;

export const NameTime = styled.div`
  width: 247px;
  height: 71px;
  margin: 0px 8px;
`;
=======
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>chat item</title>
//     <link rel="stylesheet" href="style.css">
//     <link rel="stylesheet" href="index.css">
// </head>
// <body>

//     <div class="layout">

//         <div class="chat-item">

//             <div class="chatitem-img">
//                 <img src="People.png" alt="People">
//             </div>
            
//             <div class="right">
    
//                 <div class="name">
//                     <h3>Amara</h3>
//                     <p>23 minutes ago</p>
//                 </div>
    
//                 <div class="text">
//                     <p>If you ask me, I would say it is so overrated, but...</p>
//                 </div>
//             </div>
//         </div>

//     </div>
    
// </body>
// </html>

// html {
//     font-size: 100%;
//   }
  
//   @media (max-width: 1180px){
//     html{
//       font-size: 98%;
//     }
//   }
//   @media (max-width: 1080px){
//     html{
//       font-size: 88%;
//     }
//   }
//   @media (max-width: 980px){
//     html{
//       font-size: 79%;
//     }
//   }
//   @media (max-width: 850px){
//     html{
//       font-size: 69%;
//     }
//   }
//   @media (max-width: 700px){
//     html{
//       font-size: 58%;
//     }
//   }
//   @media (max-width: 600px){
//     html{
//       font-size: 50%;
//     }
//   }
  
//   @media (min-width: 1300px){
//     html{
//       font-size: 130%;
//     }
//   }
//   @media (min-width: 1500px){
//     html{
//       font-size: 150%;
//     }
//   }
//   @media (min-width: 1700px){
//     html{
//       font-size: 175%;
//     }
//   }
//   @media (min-width: 2000px){
//     html{
//       font-size: 189%;
//     }
//   }
//   @media (min-width: 2400px){
//     html{
//       font-size: 200%;
//     }
//   }
//   @media (min-width: 2700px){
//     html{
//       font-size: 210%;
//     }
//   }
//   @media (min-width: 2880px){
//     html{
//       font-size: 220%;
//     }
//   }
//   @media (min-width: 3000px){
//     html{
//       font-size: 250%;
//     }
//   }


// @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap');
// * {
//     padding: 0;
//     margin: 0;
//     box-sizing: border-box;
// }
// body {
//     font-family: 'Lato', sans-serif; 
//     font-size: 1.2rem;
//     /* display: flex;
//     align-items: center;
//     background-color: violet;
//     min-height: 100vh; */
// }
// .layout { 
//     display: flex;
//     align-items: center;
//     min-height: 100vh;
// }
// .chat-item {
//     display: flex;
//     width: 29rem;
//     background-color: #ffffff;
//     margin: auto;
//     padding-left: 1rem;
//     text-align: center;
// }
// .chatitem-img {
//     background-color: aqua;
//     width: 5rem;
//     height: 3.1rem;
//     border-radius: 50%;
//     margin: auto 3rem; 
//     margin-right: 1.2rem;
//     padding-left: 0rem;
//     padding-right: 0rem;

// }
//  img {
//     width: 4rem;
//     height: auto;
//     margin:  0 auto;
// } 

// .right {
//     padding-top: 0.7rem;
//     padding-right: 4rem;
//     padding-bottom: 0.9rem;
// }
// .name {
//     text-align: center;
//     display: flex;
//     /* padding-right: 6rem; */
//     width: 25rem;
// }
// .name h3 {
//     /* padding-top: 0.58rem; */
//     font-family: Lato;
//     color:#242424;
//     font-weight: 900;
//     font-size: 1rem;
// }
// h3 {
//     padding-right: 1.3rem;
// }
// .name p {
//     color: #C1C1C1;
//     font-weight: 400;
//     /* padding-top: 1.2rem; */
//     font-size: 0.7rem;

//     /* padding-right: 21rem; */
// }
// .text {
//     color: #3A3A3A;
//     padding-top: 1rem;
//     font-size: 0.7rem;
//     line-height: 1.2rem;
//     width: 15rem;
// }
//  @media (max-width: 600px) {
//      .chat-item {
//          width: 6rem;
//          height: auto;
//      }
//      .name {
//         padding-bottom: 0.2rem;
//      }
//     .name h3 {
//         font-size: 1.9rem;
//     }
//     .name p {
//         font-size: 1.5rem;
//         /* padding-bottom: 2rem; */
//     }
//     .text {
//         font-size: 1rem;
//     }
// } 
// @media (max-width: 375px) {
//     .chat-item {
//         justify-content: center;
        
//     }
//     .text {
//         font-size: 1.2rem;
//         line-height: 1.5rem;
//     }
// }
>>>>>>> d2138cd2ac19ff41c033d75f16fe809eb08c1545
