import React, { Component } from "react";

import "./App.css";

class App extends Component {
  render() {
    return (
        <div className="chatHeader">
          <div className="chatHeader__left">
            <i className="far fa-comment-alt message"></i>
            <p>Chat</p>
          </div>
        <div className="chatHeader__right"></div>
          <i className="fas fa-times close"></i>
        </div>
    );
  }
}

//chatHeader style
/**
 *
      @import url("https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap");
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: #00b87c;
      }
      .chatHeader {
        display: flex;
        flex-direction: row;
        width: 347px;
        height: 64px;
        padding: 16px;
        justify-content: space-between;
        align-items: flex-start;
        font-family: "Lato", sans-serif;
        border: 1.22693px solid #00b87c;
        position: static;
      }
      .chatHeader__left {
        display: flex;
        align-items: center;
      }
      .message {
        width: 13.5px;
        height: 12.55px;
      }

      .chatHeader__left p {
        font-weight: bold;
        font-size: 15px;
        margin-left: 12px;
      }
      .close {
        cursor: pointer;
        width: 24px;
        height: 24px;
        padding: 3px;
        background: linear-gradient(0deg, #e5fff6, #e5fff6);
      }
 */

//chatHeader HTML
/**
  * <div class="chatHeader">
      <div class="chatHeader__left">
        <i class="far fa-comment-alt message"></i>
        <p>Chat</p>
      </div>
      <div class="chatHeader__right"></div>
      <i class="fas fa-times close"></i>
    </div>
  */
