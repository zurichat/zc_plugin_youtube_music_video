import styled from "styled-components";
import Illustration from "../../media/emptyScreen.svg";

import { uiDispatch } from "../../store/uiSlice";

import PasteUrl from "./pasteUrl";

const EmptyScreen = () => {
  return (
    <Wrapper>
      <PasteUrl />

      <div className="empty_container">
        <img src={Illustration} alt="add songs illustraat" />
        <h3 className="heading_3">There are no songs here!</h3>
        <p className="text">Start adding your songs</p>
        <button className="btn" onClick={() => uiDispatch.showPasteUrl(true)}>
          Add songs
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  padding: 80px 0 131px;
  width: -webkit-fill-available;

  .empty_container {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  .svg {
    width: 100%;
    max-width: 309px;
    height: fit-content;
  }

  .heading_3 {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 21px;
    color: #242424;
    margin: 22px 0 0 0;
  }

  .btn {
    background: #00b87c;
    box-shadow: 2px 2px 2px rgba(0, 36, 24, 0.04);
    border-radius: 3px;
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    padding: 12px 16px;
    border: none;
  }

  .text {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #999999;
    margin: 15px 22px;
  }

  @media screen and (max-width: 480px) {
    .text {
      font-size: 11px;
      line-height: 13.2px;
      margin: 7px 0 10px;
    }

    .svg {
      max-width: 179px;
    }

    .btn {
      padding: 11.5px 7.5px;
    }

    .heading_3 {
      font-size: 21px;
      margin-top: 50px;
    }
    padding: 86px auto 157px;
  }
`;

export default EmptyScreen;
