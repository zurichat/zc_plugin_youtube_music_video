
import React from 'react';
import GroupIcon from '@material-ui/icons/Group';
import person1 from '../media/person1.png'
import person2 from '../media/person2.png'
import person3 from '../media/person3.png'
import styled from 'styled-components'

const roomHeader = () => {
    return (


        <div className="header">
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
        </div>
    )
}



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
