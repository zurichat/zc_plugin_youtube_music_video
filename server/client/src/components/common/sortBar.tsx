import React from 'React'
import styled from 'styled-components';
import ReactDOM from 'react-dom';

function SortBar () {
    return (
        <div className="Sort">
            <p>
                <i className="fa fa-sort" aria-hidden="true"></i>
                Filter
            </p>
            <div className="drop-down">
                <button className="accordion2">
                    <h3>Default</h3>
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="panel2">
                    <a href="#"><p>By Date Added</p></a>
                    <a href="#"><p>Ascendin order A - Z</p></a>
                    <a href="#"><p>Descending oorder Z - A</p></a>
                    <a href="#"><p>Date added Recent to Oldest</p></a>
                    <a href="#"><p>Date added Oldest to Recent</p></a>
                </div>
            </div>
        </div>

    );  

}

    const Sortstyled = styled.div
        `
        
        .sortBar{
            display: flex;
            width: 19rem;
            justify-content: space-between;
            box-sizing: border-box;
            font-size: 1rem;
            font-family: Lato sans-serif;
        }
    
         button.accordion {
            background-color: #FFFFFF;
            color: #1D1C1D;
            cursor: pointer;
            padding: 1.5rem 1rem;
            width: 200px;
            height: 3rem;
            text-align: left;
            border: none;
            border-radius: 8px;
            outline: none;
            transition: 0.3s;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    
        .sortBar button.accordion{
            width: 239px;
        }
    
        .sortBar .panel {
            width: 215px;
        }
    
        button.accordion.active, button.accordion:hover {
            background-color: #F6F6F6;
            border-radius: 8px 8px 0 0;
        }
    
        .panel.show {
            display: block !important;
        }
    
        .panel {
            padding: 0 .75rem;
            background-color: white;
            max-height: 0;
            overflow: hidden;
            transition: 0.3s ease-in-out;
            opacity: 0;
            width: 176px;
        }
    
        .panel.show {
            opacity: 1;
            max-height: 800px;
            box-shadow: 0px 2px 10px #D7D7D7;
            border-radius: 0 0 4px 4px;
        }
    
        .panel p{
            color: #1D1C1D;
            padding: 0 .5rem;
            height: 3rem;
            background-color: #fff;
            display: grid;
            align-items: center;
        }
    
        .panel p:hover{
            background-color: #F6F6F6;
        }
    
        .panel a{
            text-decoration: none;
            cursor: pointer;
        }
    
        button.accordion:after {
            color: #F6F6F6;
        }
        `

export default SortBar;