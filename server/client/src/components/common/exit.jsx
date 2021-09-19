import React from 'react';
import { useState } from 'react';

const Exit = ({drop}) => {
    const [change, setChange] = useState('about');

    return(
        <div className="leave-container">
            <div className="leave">
                <div className="title">
                    <h1>
                        Music room
                    </h1>
                    <button onClick={() => drop('')}>x</button>
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
                        <h3>Add a description...</h3>
                    </div>
                    <div className="leave-room">
                        Leave room
                    </div>
                </div>) :null }
                {change === "member" ? ( <div className="room-member" >
                    <div className="search">
                        <p>X</p>
                        <input placeholder="Find People"/>
                    </div>
                    <div className="member">member 13</div>
                </div>) : null}

            </div>
        </div>
    );
}

export default Exit;