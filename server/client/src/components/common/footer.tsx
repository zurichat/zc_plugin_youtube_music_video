import React from 'react';
import logo from './Frame 8866.svg';
import  styled  from  'styled-components';

function Footer() {
    return (
        <Footerstyled>
            <footer className="footer__wrapper">
                <div className="footer__items">

                    <div className="footer__logo_up">
                        <a href="#" className="logo__text">
                            <img src={logo} alt="Logo" className="logo_img"/>
                        </a>
                    </div>

                    <div className="footer__lists">
                        <h4>
                            Company
                        </h4>
                        <ul className="footer__links">
                            <li><a href="#">Finalists</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Blog Posts</a></li>
                            <li><a href="#">News</a></li>
                        </ul>
                    </div>

                    <div className="footer__lists">
                        <h4>
                            Connect
                        </h4>
                        <ul className="footer__links">
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"></a><i className="fab fa-instagram" aria-hidden="true"></i></li>
                            <li><a href="#"></a><i className="fab fa-twitter" aria-hidden="true"></i></li>
                        </ul>
                    </div>

                    <div className="footer__lists">
                        <h4>
                            Resources
                        </h4>
                        <ul className="footer__links">
                            <li><a href="#">Designers</a></li>
                            <li><a href="#">Developers</a></li>
                            <li><a href="#">Mentors</a></li>
                        </ul>
                    </div>

                    <div className="footer__lists">
                        <h4>
                            Compare
                        </h4>
                        <ul className="footer__links">
                            <li><a href="#">Slack</a></li>
                            <li><a href="#">Discord</a></li>
                        </ul>
                    </div>

                    <div className="footer__lists">
                        <h4>
                            Explore
                        </h4>
                        <ul className="footer__links">
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Plugins</a></li>
                        </ul>
                    </div>
                
                </div>

                <div className="footer__col">
                    <div className="footer__logo_dwn">
                        <a href="#" className="logo__text">
                            <img src={logo} alt="Logo" className="logo_img"/>
                        </a>
                    </div>
                    <p>
                        ©2021 Zuri. All Rights Reserved
                    </p>

                    <ul className="footer__items_2">
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
            </footer>
        </Footerstyled>
    );
  }


    const Footerstyled = styled.div
        `
        /*========================================*/
        /*--------------- [_Footer] -------------*/
        /*========================================*/
        .footer__wrapper{
            padding: 0 1rem .5rem 0;
            background-color: var(--white-color);
        }
        
        .footer__items{
            display: flex;
            justify-content: space-between;
            padding: 2rem;
        }
        
        .footer__links {
            padding: 0;
            margin: 0;
        }
        
        .footer__links i{
            color: var(--bluelite-color);
            font-size: var(--font-size-reg);
        }
        
        .footer__links a{
            color: var(--text-secondary-color);
            font-size: var(--font-size-tiny);
        }
        
        .footer__col{
            display: flex;
            justify-content: space-evenly;
            margin: 1rem 0;
            font-size: var(--font-size-mini);
            color: var(--text-secondary-color);
        }
        
        .footer__items_2{
            display: flex;
            padding: 0;
        }
        
        .footer__items_2 a{
            font-size: var(--font-size-mini);
            color: var(--text-secondary-color);
            padding: 1em;
        }
        
        .footer__col p{
            font-size: var(--font-size-mini);
        }
        
        .footer__logo_dwn{
            display: none;
        }
        @media screen and (min-width:320px) and (max-width:768px) {
            .footer__items{
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-evenly;
                padding: 0;
            }
        
            .footer__items_2 a{
                padding: 0 .5rem;
            }
        
            .footer__lists{
                width: 5rem;
                padding: 1rem;
            }
        
            .footer__links a{
                font-size: var(--mfont-size-mini);
            }
        
            .footer__col{
                flex-direction: column;
                align-items: center;
            }
        
            .footer__col p{
                font-size: var(--mfont-size-mini);
            }
        
            .footer__col a{
                font-size: var(--mfont-size-mini);
            }    
        
            .footer__logo_up{
                display: none;
            }
        
            .footer__logo_dwn{
                display: block;
            }
        }
        
        @media screen and (min-width:700px){
            .footer__col{
                flex-direction: row;
            }
        }
        
        
        
        `
  
  export default Footer;