import React from 'react';
import  styled  from  'styled-components';

function Home() {
    return (
        <Homestyled>
            <div className="market__col content_wrapper">
                <i className="fas fa-chevron-left"></i>
                <h2>
                Market Place
                </h2>
            </div>
            
        <main className="main__wrapper content_wrapper">

            <section className="grid__one">
            
                <div className="plugin__dets">
                    <div className="plugin__img">
                    <img src="Rectangle 158.svg" alt="Plugin Logo"/>
                    </div>

                    <div className="plugin__dets_mb">
                        <h1>
                            Youtube Plugin
                        </h1>
                    </div>

                    <button className="btn__large">
                        Add to Zuri
                    </button>
                </div>

                <aside className="side__bar">

                    <div className="side__txts">
                        <h3 className="mb_bottom">
                            Supported Language
                        </h3>
                        <p className="margin">
                            English
                        </p>
                    </div>

                    <div className="side__txts">
                        <h3 className="mb_bottom">
                            Pricing
                        </h3>
                        <p className="margin">
                            N10,000 (7 days free trial)
                        </p>
                    </div>

                    <div className="side__txts">
                        <h3 className="mb_bottom">
                            Support
                        </h3>
                        <p className="margin">
                            <a href="#">
                                <i className="fa fa-envelope" aria-hidden="true"></i> hello@zuri.chat
                            </a>
                        </p>
                    </div>

                    <div className="side__txts">
                        <h3 className="mb_bottom">
                        Category
                        </h3>
                        <div className="btns margin">
                            <a href="#">
                                <button className="btn__small">
                                    Music
                                </button>
                            </a>
                            <a href="#">
                                <button className="btn__small">
                                    Playlist
                                </button>
                            </a>
                        </div>
                        
                    </div>
                </aside>
            </section>

            <section className="grid-two">
                <h1>
                    Youtube Plugin
                </h1>
                TAB MENU
                <div className="tabs"> 
                    <ul className="tab-header">
                        <li data-tab-target="#description" className="active tab">Description</li>
                        <li data-tab-target="#review" className="tab">Review</li>
                        <li data-tab-target="#faq" className="tab">FAQ</li>   
                    </ul>
                    <div className="slide_bar">
                        <div className="tab-indicator"></div>
                    </div>
                    
                    
                    <div className="tab-body">
                        Tab Active Description
                        <div id="description" data-tab-content className="active">
                            
                            <div className="slideshow-container">
                                <div className="mySlides fade">
                                    <div className="display bx1">
                                    <div className="img__display img1"></div>
                                    <h1>
                                        Watch Youtube Videos on Zuri without getting redirected.
                                    </h1>
                                </div>
                            </div>
                            
                            <div className="mySlides fade">
                                <div className="display bx2">
                                    <div className="img__display img2"></div>
                                    <h1>
                                        Create Playlists and check out what your friends are listening to.
                                    </h1>
                                </div>
                            </div>
                            
                            <div className="mySlides fade">
                                <div className="display bx3">
                                    <div className="img__display img3"></div>
                                    <h1>
                                        Paste both audio and video url Link to play audio and video. 
                                    </h1>
                                </div>
                            </div>
                            
                            <a className="prev" onclick="plusSlides(-1)">&#10094;</a>
                            <a className="next" onclick="plusSlides(1)">&#10095;</a>
                            </div>
                            <br/>
                            
                            <div className="display__txt">
                                <p>
                                    The Zuri Youtube plugin lets you share youtube videos and audio with your team. Once installed, 
                                    you can share youtube links that can be played on the platform without being redirected to youtube.
                                    You can also create songs playlists and also add songs to the general music library where other
                                    users can have access to at any time. With the plugin,
                                    members of a team can discuss about a video or an audio.
                                </p>
                            </div>
                            <div className="display__list">
                                <h3>
                                    Features
                                </h3>
                                <ul>
                                    <li>Auto Play Feature</li>
                                    <li>Pause Feature</li>
                                    <li>Paste Youtube URL</li>
                                    <li>Like a song Feature</li>
                                    <li>Delete a song </li>
                                    <li>Chat Feature</li>
                                    <li>See active members list</li>
                                </ul>
                            </div>
                        </div>

                        <div id="review" data-tab-content> 
                            <div className="review__bx">
                                <div className="user__profile review__dets">
                                    <div className="profile__img"></div>
                                    <div className="user__name" id="user-name">
                                        <h4>
                                            Emediong A.
                                        </h4>
                                    </div>
                                    <div className="star__ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star empty" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <div className="review__txts">
                                    <h3 className="small">
                                        This is awesome!!!
                                    </h3>

                                    <p className="large">
                                        This is exactly what i was looking for, I love 
                                        the feature where i could play videos on the 
                                        platform without getting redirected to Youtube.
                                    </p>
                                </div>
                            </div>

                            <div className="review__bx">
                                <div className="user__profile review__dets">
                                    <div className="profile__img"></div>
                                    <div className="user__name" id="user-name">
                                        <h4>
                                            Emediong A.
                                        </h4>
                                    </div>
                                    <div className="star__ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star empty" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <div className="review__txts review__dets">
                                    <h3 className="small">
                                        This is awesome!!!
                                    </h3>

                                    <p className="large">
                                        This is exactly what i was looking for, I love 
                                        the feature where i could play videos on the 
                                        platform without getting redirected to Youtube.
                                    </p>
                                </div>
                            </div>

                            <div className="review__bx">
                                <div className="user__profile review__dets">
                                    <div className="profile__img"></div>
                                    <div className="user__name" id="user-name">
                                        <h4>
                                            Emediong A.
                                        </h4>
                                    </div>
                                    <div className="star__ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star empty" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <div className="review__txts review__dets">
                                    <h3 className="small">
                                        This is awesome!!!
                                    </h3>

                                    <p className="large">
                                        This is exactly what i was looking for, I love 
                                        the feature where i could play videos on the 
                                        platform without getting redirected to Youtube.
                                    </p>
                                </div>
                            </div>

                            <div className="review__bx">
                                <div className="user__profile review__dets">
                                    <div className="profile__img"></div>
                                    <div className="user__name" id="user-name">
                                        <h4>
                                            Emediong A.
                                        </h4>
                                    </div>
                                    <div className="star__ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star empty" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <div className="review__txts review__dets">
                                    <h3 className="small">
                                        This is awesome!!!
                                    </h3>

                                    <p className="large">
                                        This is exactly what i was looking for, I love 
                                        the feature where i could play videos on the 
                                        platform without getting redirected to Youtube.
                                    </p>
                                </div>
                            </div>

                            <div className="review__bx">
                                <div className="user__profile review__dets">
                                    <div className="profile__img"></div>
                                    <div className="user__name" id="user-name">
                                        <h4>
                                            Emediong A.
                                        </h4>
                                    </div>
                                    <div className="star__ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star empty" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <div className="review__txts review__dets">
                                    <h3 className="small">
                                        This is awesome!!!
                                    </h3>

                                    <p className="large">
                                        This is exactly what i was looking for, I love 
                                        the feature where i could play videos on the 
                                        platform without getting redirected to Youtube.
                                    </p>
                                </div>
                            </div>

                            <div className="review__bx">
                                <div className="user__profile review__dets">
                                    <div className="profile__img"></div>
                                    <div className="user__name" id="user-name">
                                        <h4>
                                            Emediong A.
                                        </h4>
                                    </div>
                                    <div className="star__ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star empty" aria-hidden="true"></i>
                                    </div>
                                </div>

                                <div className="review__txts review__dets">
                                    <h3 className="small">
                                        This is awesome!!!
                                    </h3>

                                    <p className="large">
                                        This is exactly what i was looking for, I love 
                                        the feature where i could play videos on the 
                                        platform without getting redirected to Youtube.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div id="faq" data-tab-content>
                            <div className="faq__bx">
                                <h3>
                                    Frequently Asked Questions
                                </h3>

                                <p>
                                    Q: Is the plugin only installed by admin?<br/>
                                    A: No, the plugin can be installed by any member of the organization.
                                </p>

                                <p>
                                    Q: Can the plugin be used on another platform?<br/>
                                    A: No, the Youtube plugin can only be used on Zuri chat.
                                </p>

                                <p>
                                    Q: Does it support Youtube videos or just audio?<br/>
                                    A: The Youtube plugin supports both videos and audio.
                                </p>

                                <p>
                                    Q: Is the plugin only installed by admin?<br/>
                                    A: No, the plugin can be installed by any member of the organization.
                                </p>

                                <p>
                                    Q: Can the plugin be used on another platform?<br/>
                                    A: No, the Youtube plugin can only be used on Zuri chat.
                                </p>

                                <p>
                                    Q: Does it support Youtube videos or just audio?<br/>
                                    A: The Youtube plugin supports both videos and audio.
                                </p>
                            </div>
                        </div>
                    </div>       
                </div>
            </section>   

            <section className="drop__down content_wrapper">
                <button className="accordion">
                    <h3>Supported Language</h3>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="panel">
                <p>English</p>
                </div>
                
                <button className="accordion">
                    <h3>Pricing</h3>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="panel">
                <p>N10,000 (7 days free trial)</p>
                </div>
                
                <button className="accordion">
                    <h3>Support</h3>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="panel">
                <a href="#"><i className="fa fa-envelope" aria-hidden="true"></i> hello@zuri.chat</a>
                </div>

                <button className="accordion">
                    <h3>Category</h3>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="panel">
                    <div className="btns">
                        <a href="#">
                            <button className="btn__small">
                                Music
                            </button>
                        </a>
                        <a href="#">
                            <button className="btn__small">
                                Playlist
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    </Homestyled>
    )
};

    const Homestyled = styled.div
        `
                        
/*========================================*/
/*--------------- [_Main] -------------*/
/*========================================*/
.main__wrapper{
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr;
    grid-template-areas: "one two";
    gap: 2em;
}

/*========================================*/
/*--------------- [_Hero] -------------*/
/*========================================*/
.grid__one{
    grid-area: one;
}

.market__col{
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    color: var(--bluelite-color);
}

.plugin__img{
    width: 13.125rem;
    padding: 2em;
    background-color: var(--white-color);
}

.plugin__img img{
    background-position: center;
    background-repeat: no-repeat;
}

.plugin__dets_mb{
    display: none;
}

.plugin__dets h1{
    margin-top: .5em;
}

.plugin__dets .btn__large{
    margin-top: .5em;
}

@media screen and (min-width:320px) and (max-width:425px) {
    .main__wrapper{
        grid-template-areas: 1fr;
    }

    .plugin__dets,  .plugin__dets_mb{
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       margin: 0 auto;
    }

    .plugin__dets h1{
        margin-top: 1em;
    }

    .plugin__dets .btn__large{
        margin-top: var(--mb-32);
    }
}

@media screen and (min-width:425px) and (max-width:900px) {
    .main__wrapper{
        grid-template-areas: 1fr;
    }


    .plugin__dets,  .plugin__dets_mb{
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       margin: 0 auto;
    }

    .plugin__dets h1{
        margin-top: 1em;
    }

    .plugin__dets .btn__large{
        margin-top: var(--mb-32);
    }
}

/*========================================*/
/*--------------- [_Side Bar] -------------*/
/*========================================*/
.side__bar{
    margin-top: var(--mb-32);
}

.side__txts p{
    font-weight: var(--font-regular);
}

.side__txts i{
 font-size: var(--font-size-reg);
}

.side__bar a{
    color: var(--blue-color);
}

@media screen and (min-width:320px) and (max-width:900px) {
    .side__bar{
        display: none;
    }
}

/*========================================*/
/*--------------- [_TAB ITEMS] -------------*/
/*========================================*/
.tabs{
    width: 63vw;
}

.tab-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    margin-top: var(--mb-16);
}

.tab{
    width: auto;
    font-size: var(--font-size-midi);
    font-weight: var(--font-bold);
    color: var(--text-secondary-color);
    margin: 0 1.25rem 0 .5rem;
    padding: .5625rem 0; 
    cursor: pointer;
    z-index: 2;
}

.tab.active{
    color: var(--white-color);
    border: solid var(--green-color);
    background: var(--green-color);
    padding: 0 var(--mb-10);
    border-radius: 3px;
}

[data-tab-content]{
    display: none;
}

.active[data-tab-content]{
    display: block;
}

.tab-body{
    margin: 2em 0;
}

/*--------------- [_Slider] -------------*/
.slide_bar{
    width: auto;
    height: 2px;
    background: rgba(176, 175, 176, 0.5);
    left: 0px;
    border-radius: 5px;
    z-index: 1;
}

.tab-indicator {
    position:relative;
    width:calc(100% / 6);
    height:2px;
    background:var(--green-color);
    left:1px;
    border-radius:5px;
    transition:all 500ms ease-in-out;
    z-index: 2;
  }


@media screen and (min-width:320px) and (max-width:900px) {
    .tab{
        font-size: var(--mfont-size-reg);
    }

    .tab__items li{
        font-size: var(--mfont-size-mini);
        font-weight: var(--font-bold);
    }

    .tab-indicator, .slide_bar{
        display: none;
    }

    .tab-header{
        justify-content: center;
    }
}

/*========================================*/
/*--------------- [_Grid Two] -------------*/
/*========================================*/
.grid-two{
    grid-area: two;
}



/*--------------- [_Grid Two__Description Box] -------------*/
.description__bx{
    margin: 2rem 0;
}

.display{
    width: 70vw;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.bx1{
    background: var(--yellow-color);
}

.bx2{
    background: var(--green-color);
}

.bx3{
    background: var(--blue-color);
}

.img__display{
    width: 20rem;
    height: 15.5rem;
    background-position: center;
    box-shadow: 2px 2px 8px 2px rgba(112, 144, 176, 0.4);
}

.img1{
    background-image: url(img/Rectangle\ 159.svg);
}

.img2{
    background-image: url(img/Rectangle\ 160.svg);
}

.img3{
    background-image: url(img/Rectangle\ 161.svg);
}

.display h1{
    font-size: 24px;
    padding: 1em 0;
    width: 22rem;
    line-height: 2.25rem;
    color: var(--white-color);
}

.display__txt{
    margin: 2em 0;
    text-align: justify;
    width: auto;
}

.display__list li{
    color: var(--text-primary-color);
    list-style: inside;
}

/* Slideshow container */
.slideshow-container {
    max-width: 1000px;
    position: relative;
    margin: auto;
}
  
  /* Next & previous buttons */
.prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    color: black;
    font-weight: bold;
    font-size: var(--font-size-midi);
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    background: #a5a5a58e;
}
  

.next {
    right: 0;
    border-radius: 3px 0 0 3px;
}
  

.prev:hover, .next:hover {
    background-color: rgba(255, 255, 255, 0.514);
    color: var(--white-color);
}
  
  /* Fading animation */
.fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
}
  
@-webkit-keyframes fade {
    from {opacity: .4}
    to {opacity: 1}
}
  
@keyframes fade {
    from {opacity: .4}
    to {opacity: 1}
}


/*--------------- [_GRID TWO__Review Box] -------------*/

.review__bx{
    width: 50vw;
    height: 9.625rem;
    padding: 1rem;
    border-radius: 3px;
    background: var(--white-color);
    margin-bottom: var(--mb-16)
}

.review__dets{
    margin-bottom:  var(--mb-10);
}
.user__profile{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.profile__img{
    width: 2rem;
    height: 2rem;
    background: url(img/Rectangle\ 163.svg);
    background-position: center;
    border: 3px;
    margin-right:  var(--mb-10);
}

/*--------------- [_Star Rating] -------------*/
.star__ratings, .user__name{
   padding: 0 .5rem;
}

.star__ratings i{
    color: #FFDF00;
    font-size: var(--font-size-reg);
    padding: 0;
}

.star__ratings .empty{
    color: rgba(176, 175, 176, 0.5);
}



/*--------------- [_Review Texts] -------------*/
.small{
    font-size: var(--font-size-mini);
}

.large p{
    font-size: var(--font-size-reg);
}

/*--------------- [_GRID TWO__FAQ Box] -------------*/
.faq__bx{
    width: 50vw;
    display: grid;
    justify-content: center;
    padding: 3rem;
    background: var(--white-color);
}

.faq__bx h3{
    margin-bottom: var(--mb-32)
}

.faq__bx p{
    width: auto;
    margin-bottom: var(--mb-32)
}

@media screen and (min-width:320px) and (max-width:400px) {
    .main__wrapper{
        display: flex;
        flex-direction: column;
    }

    .grid-two{
        display: grid;
        justify-content: center;
    }

    .grid-two h1{
        display: none;
    }

    .display, .faq__bx{
        width: 17rem;

    }

    .display__txt{
        width: auto;
    }

    .img__display {
        width: 10rem;
        margin: 0 auto;
    }

    .display{
        display: grid;
        grid-template-rows: 1fr;
    }

    .display h1{
        display: block;
        width: 10rem;
        font-size: var(--mfont-size-midi);
        margin: 0 auto;
    }

    .display__list li{
        font-size: var(--mfont-size-reg);
    }

    .slider{
        width: calc(100% / 2.8);
    }

    .review__bx{
        width: 13rem;
        height: 20rem;
        text-align: justify;
    }

    .faq__bx{
        width: 13rem;
        padding: 1.5rem;
    }

    .review__dets{
        margin-bottom: 0;
    }

    .prev, .next {
        padding: 5px;
    }

    .profile__img{
        margin: 0;
    }

    .user__profile{
        flex-direction: column;
        align-items: flex-start;
    }

    .star__ratings, .user__name {
        padding: .5rem 0;
    }
}


@media screen and (min-width:401px) and (max-width:900px) {

    .tabs{
        width: 70vw;
    }

    .main__wrapper{
        display: flex;
        flex-direction: column;
    }

    .grid-two{
        display: grid;
        justify-content: center;
    }

    .grid-two h1{
        display: none;
    }

    .display,
    .review__bx,
    .faq__bx{
        width: 70vw;
    }

    .display{
        display: grid;
        grid-template-rows: 1fr;
    }

    .display h1{
        display: block;
        width: 16rem;
    }

    .img__display{
        width: 16rem;
    }

    .review__bx{
        height: 13rem;
    }

    .review__dets{
        margin-bottom: var(--mb-16);
    }
}

/*========================================*/
/*--------------- [_Accordion Drop Down] -------------*/
/*========================================*/
@media screen and (min-width:320px) and (max-width:425px) {
    .drop__down{
        margin: 0 auto;
    }

    button.accordion {
        background-color: var(--white-color);
        color: #444;
        cursor: pointer;
        padding: 1.5rem 1rem;
        width: 16rem;
        height: 4rem;
        text-align: left;
        border: none;
        outline: none;
        transition: 0.3s;
        margin-bottom: var(--mb-10);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    button.accordion.active, button.accordion:hover {
        background-color: #ddd;
    }

    .panel {
        padding: 0 18px;
        background-color: var(--white-color);
        display: none;
    }

    .panel.show {
        display: block !important;
    }

    .panel {
        padding: 0 18px;
        background-color: white;
        max-height: 0;
        overflow: hidden;
        transition: 0.6s ease-in-out;
        opacity: 0;
        width: 16rem;
    }

    .panel.show {
        opacity: 1;
        max-height: 800px;
        padding: var(--mb-16) ;
        margin-bottom: var(--mb-16);
    }
    .panel i{
        font-size: var(--mfont-size-mini);
        padding: 0;
    }

    .panel p{
        color: var(--text-primary-color);
    }

    .panel a{
        color: var(--blue-color);
    }

    button.accordion:after {
        color: #777;
    }
    
    
}

@media screen and (min-width: 425px) and (max-width:900px) {
    .drop__down{
        margin: 0 auto 2em;
    }

    button.accordion {
        background-color: var(--white-color);
        color: #444;
        cursor: pointer;
        padding: 1.5rem 1rem;
        width: 70vw;
        height: 4rem;
        text-align: left;
        border: none;
        outline: none;
        transition: 0.3s;
        margin-bottom: var(--mb-10);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    button.accordion.active, button.accordion:hover {
        background-color: #ddd;
    }

    .panel {
        padding: 0 18px;
        background-color: var(--white-color);
        display: none;
        width: 70vw;
    }

    .panel.show {
        display: block !important;
    }

    .panel {
        padding: 0 18px;
        background-color: white;
        max-height: 0;
        overflow: hidden;
        transition: 0.6s ease-in-out;
        opacity: 0;
    }

    .panel.show {
        opacity: 1;
        max-height: 800px;
        padding: var(--mb-16) ;
        margin-bottom: var(--mb-16);
    }

    .panel p{
        color: var(--blue-color);
    }

    button.accordion:after {
        color: #777;
    }
    
}

@media screen and (min-width: 900px) {
    .drop__down{
        display: none;
    }

   
}
        `

export default Home;



