
import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import person1 from './person1.png'
import person2 from './person2.jpg'
import person3 from './person3.png'
import styled from 'styled-components'


const roomHeader = () => {
    return (

        <HeaderStyled>
            
            <div className="left">
            <GroupIcon className="icon"/>
           <a href="/"className="header-heading">Music Room</a>
            </div>

            <div className="right">
                <img src={person1} alt="" className="person1" />
                <img src={person2} alt="" className="person2" />
                <img src={person3} alt="" className="person3" />
                <span>12</span>
            </div>
       
        </HeaderStyled>
        
    )
}

const HeaderStyled = styled.div`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap');
        margin-top: 4rem;
        width: 60%;
        height: 50px;
        background-color: #F3F1F5;
        margin-left: 10rem;
        display: flex;
        justify-content:space-between;
        align-items:center;
        padding: .6rem .6rem;
        border-radius: .6rem;
        font-family: 'Lato', sans-serif;


        @media screen and (max-width:530px) {
        margin-left: 6rem;
        background-color: #27AE60;
        color: white;
        width: 100%;
        margin-left: 0;
        padding: .4rem .4rem;
        .icon {
            color: white;
        }

        .header-heading{
            color: red;
        }
        span {
            color: white;
        }

    } 


    .left {
        display: flex;
        align-items: center;
    }
    .icon {
        color: #27AE60;
        margin-right: 1rem;
        cursor: pointer;

        @media screen and (max-width:530px) {
            color: white;
        }
    }
    .header-heading {
        color: #27AE60;
        text-decoration: none;

        @media screen and (max-width:530px) {
            color: white;
        }
    }

    .right {
        display: flex;
        align-items: center;
        position: relative;
    }
    .person1 {
        color: #519872;
        font-size: 1.7rem;
        position: absolute;
        left: -6rem;
        z-index: 5;
    }
    .person2 {
        color: red;
        position: absolute;
        left: -4.8rem;
        z-index: 2
    }
    .person3 {
        color: yellow;
        position: absolute;
        left: -3.5rem;
        z-index: 1;
    }
    span {
        color: #519872;
        margin-left: -.3rem;

        @media screen and (max-width:530px) {
            color: white;
        }
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #519872;
        cursor: pointer;

        @media screen and (max-width:530px) {
            border: 1px solid white;
        }

    }

   

`


export default roomHeader



/*html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>room-header</title>

    <link rel="stylesheet" href="roomheader.css">
</head>
<body>
    <div class="header">
        <a href="#" class="music-room">Music Room</a>
        <div class="header-right">
            <img src="media/People of Brooklyn Avatar1.png" alt="">
            <img src="media/People of Brooklyn Avatar2.png" alt="">
            <img src="media/People of Brooklyn Avatar.png" alt="">
            <span>12</span>
        </div>
    </div>
</body>
</html>*/

/*css

* {box-sizing: border-box;}

body { 
  margin: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  overflow: hidden;
  background-color: white;
  padding: 20px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.header .music-room{
  color: green;
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px; 
  line-height: 25px;
  border-radius: 4px;
}

.header img{
    padding: 0;
    border-radius: 50px;
    border: 1px solid green;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.header-right {
  float: right;
}

@media screen and (max-width: 600px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  
  .header-right {
    float: none;
  }
}*/
