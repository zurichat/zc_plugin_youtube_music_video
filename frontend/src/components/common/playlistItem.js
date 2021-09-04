import React, { Component } from 'react';
// import './playlistitem.css';
import styled from 'styled-components';
import Like from './like';

class PlaylistItem extends Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(id) {}

  render() {
    return (
      <Playlist>
        <Container>
          <img src={this.props.imgSrc || ''} alt={this.props.songName} />
          <PlaylistClass>
            <h3>{this.props.songName}</h3>
            <p>Added by {this.props.addedBy || ''}</p>
          </PlaylistClass>
          <Para>
            <p>{this.props.duration} mins</p>
          </Para>
          <Paragraph>
            <p>{this.props.likeNo} likes</p>
          </Paragraph>
          <Vector>
            <Like />

            <div>
              <i className='fas fa-ellipsis-h vector2'></i>
            </div>
          </Vector>
        </Container>
      </Playlist>
    );
  }
}

const Playlist = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: -2.3em;
`;

const Container = styled.div`
  margin-top: 3em !important;
  display: grid;
  grid-template-columns: 14% 52% 20% 20%;
  align-items: center;
  padding-right: 1em;
  padding-left: 1em;
  padding-top: 2em;
  width: auto;
  /* margin: auto; */
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 36, 24, 0.04);
  transition: all 150ms ease-in-out;
  /* cursor: pointer; */

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 184, 124, 0.3);
  }

  img {
    width: 100%;
    padding-bottom: 1.5em;
  }

  @media (min-width: 1024px) {
    margin-top: 3em !important;
    display: grid;
    grid-template-columns: 10% 45% 15% 15% auto;
    align-items: center;
    padding-right: 1em;
    padding-left: 1em;
    padding-top: 2em;
    width: auto;
    /* margin: auto; */
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 36, 24, 0.04);
  }

  @media (min-width: 1440px) {
    margin-top: 3em !important;
    display: grid;
    grid-template-columns: 8% 45% 15% 15% auto;
    align-items: center;
    padding-right: 1em;
    padding-left: 1em;
    padding-top: 2em;
    width: auto;
    /* margin: auto; */
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 36, 24, 0.04);
  }
`;

const Para = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;

    p {
      padding-bottom: 1em;
      font-size: 14px;
    }
  }
  @media (min-width: 1440px) {
    display: block;

    p {
      padding-bottom: 1em;
      font-size: 16px;
    }
  }
`;
const PlaylistClass = styled.div`
  padding-bottom: 1em;
  padding-left: 1em;

  h3 {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0px;
    text-align: left;
  }

  p {
    font-size: 14px;
    line-height: 2em;
    font-weight: 400;
    font-family: 'Lato', sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
  }

  @media (min-width: 1024px) {
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 16px;
      line-height: 2.5em;
    }

    @media (min-width: 1440px) {
      h3 {
        font-size: 20px;
      }
      p {
        font-size: 15px;
        line-height: 2.5em;
      }
    }
  }
`;

const Paragraph = styled.div`
  p {
    font-size: 0.75em;
    font-family: 'Lato', sans-serif;
    padding-right: 3em;
    padding-bottom: 1em !important;
    color: rgba(153, 153, 153, 1);
  }

  @media (min-width: 1024px) {
    p {
      font-size: 0.75em;
    }
  }
  @media (min-width: 1440px) {
    p {
      font-size: 1em;
    }
  }
`;

const Vector = styled.div`
  display: flex;
  /* width: 100%; */
  align-content: center;
  justify-content: space-evenly;

  .vector1 {
    padding-right: 2em;
    padding-bottom: 1em;
    width: 20px;
    /* height: 16px; */

    @media (min-width: 1024px) {
      padding-right: 2em;
      padding-bottom: 1em;
      width: 30px;
      height: 30px;
    }
    @media (min-width: 1440px) {
      /* padding-right: 2em; */
      padding-bottom: 1em;
      width: 50px;
      /* height: 50px; */
    }
  }
  i {
    padding-bottom: 1em;
    display: block;
    width: 10.67px;
    height: 2.67px;
    cursor: pointer;
    color: #000;
    @media (min-width: 1024px) {
      /* padding-right: 1em; */
      padding-bottom: 0.5em;
      width: 10.67px;
      height: 2.67px;
    }
    @media (min-width: 1440px) {
      /* padding-right: 1em; */
      padding-bottom: 0.5em;
      width: 16px;
      height: 10px;
    }
  }
`;

export default PlaylistItem;
