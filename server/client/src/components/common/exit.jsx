import React from 'react';
import { useState } from 'react';
import search from '../../media/search.svg'
import beat from "../../media/beat.svg";
import close from "../../media/close-popup.svg";

const Exit = ({drop}) => {
    const [change, setChange] = useState('about');

    return(
        <div className="leave-container">
            <div className="leave">
                <div className="title">
                    <h1>
                        <img
                        src={beat}
                        alt="icon"
                        />
                        Music room
                    </h1>
                    <img
                        src={close}
                        alt="icon"
                        onClick={() => drop('')}
                        className="close"
                        />
                </div>
                <nav>
                    <button 
                    onClick={() => setChange('about')}
                    className={` ${
                    change === "about" ? "room-active" : ""
                    }`}
                    >About
                    </button>
                    <button 
                    onClick={() => setChange('member')}
                    className={` ${
                    change === "member" ? "room-active" : ""
                    }`}
                    >Members12</button>
                </nav>
                {change === "about" ? (<div className='main'>
                    <div className="room">
                        <p>Room name</p>
                        <h3>Music room</h3>
                    </div>
                    <div className="room-desc">
                        <div>
                            Description
                            <p>Edit</p>
                        </div>
                        <input type="text" placeholder="Add a description..."/>
                    </div>
                    <div className="leave-room">
                        Leave room
                    </div>
                </div>) :null }
                {change === "member" ? ( <div className="room-member" >
                    <div className="search">
                        <img
                        src={search}
                        alt="icon"
                        />
                        <input placeholder="Find People"/>
                    </div>
                    <div className="member">
                        <p>memeber</p>
                    </div>
                </div>) : null}

            </div>
        </div>
    );
}

export default Exit;