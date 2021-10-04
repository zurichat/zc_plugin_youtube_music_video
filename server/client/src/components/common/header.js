import React from 'react';
import logo from './Frame 8866.svg';
import  styled  from  'styled-components'; 

function Header() {
  


    return (
      <Headerstyled>
        <div className="Header">
          <header className="header__wrap">
              <div className="nav__logo">
                  <a href="#" className="logo__text">
                      <img src={logo} alt="Logo" className="logo_img"/>
                  </a>
              </div>
              <div className="nav__menu" id="nav-menu">
                  <i className="fas fa-search"></i>
                  <i className="fas fa-ellipsis-v"></i>
              </div>
          </header>
        </div>
      </Headerstyled>
    );
  }

  const Headerstyled = styled.div
    `
    /*========================================*/
    /*--------------- [_Header Nav] -------------*/
    /*========================================*/
    
    .header__wrap{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 2em;
    }
    
    .nav__menu{
        display: none;
    }
    
    
    @media screen and (min-width:320px) and (max-width:770px) {
        .nav__menu{
            width: 4rem;
            height: 1.5rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0px;
        }   
        
        .nav__menu i{
            cursor: pointer;
        } 
    }
    
    `
  
  export default Header;