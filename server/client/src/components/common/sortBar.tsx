import React from 'React'
import { StyledComponent } from 'styled-components';

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
            button.accordion2 {
                background-color: #FFFFFF;
                color: #1D1C1D;
                cursor: pointer;
                padding: 1.5rem 1rem;
                width: 200px;
                height: 3rem;
                text-align: left;
                border: none;
                outline: none;
                transition: 0.3s;
                margin-bottom: var(--mb-10);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        
            button.accordion2.active, button.accordion2:hover {
                background-color: #ddd;
            }
        
            .panel2.show2 {
                display: block !important;
            }
        
            .panel2 {
                padding: 0 .75rem;
                background-color: white;
                max-height: 0;
                overflow: hidden;
                transition: 0.3s ease-in-out;
                opacity: 0;
                width: 175px;
            }
        
            .panel2.show2 {
                opacity: 1;
                max-height: 800px;
                box-shadow: 0px 2px 10px #D7D7D7;
                border-radius: 4px;
            }
        
            .panel2 p{
                color: #1D1C1D;
                padding: 0 .5rem;
                height: 3rem;
                background-color: #fff;
                display: grid;
                align-items: center;
            }
        
            .panel2 p:hover{
                background-color: #F6F6F6;
            }
        
            .panel2 a{
                text-decoration: none;
                cursor: pointer;
            }
        
        
        
            button.accordion2:after {
                color: #777;
            }
        `

export default SortBar;