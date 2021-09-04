import React from 'react';
import './playlistitem.css';
import styled from 'styled-components';
function PlaylistItem() {
  return (
    <Playlist className='playlist'>
      <Container>
        <img
          src='https://cdn.vanguardngr.com/wp-content/uploads/2020/05/Wizkid-e1588973158415.jpg'
          alt='album'
        />
        <PlaylistClass className='playlistclass'>
          <h3>Essence (ft Tems) - Wizkid</h3>
          <p>Added by smoothice</p>
        </PlaylistClass>
        <Para className='para'>
          <p>4.05 mins</p>
        </Para>
        <Paragraph className='paragraph'>
          <p>642 likes</p>
        </Paragraph>
        <Vector className='vector'>
          <img
            className='vector1'
            src='https://png.pngitem.com/pimgs/s/111-1119299_black-hollow-heart-icon-hd-png-download.png'
            alt='heart'
          />
          <img
            className='vector2'
            src='https://img.flaticon.com/icons/png/512/17/17764.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF'
            alt='option'
          />
        </Vector>
      </Container>
    </Playlist>
  );
}

const Container = styled.div`
  margin-top: 3em !important;
  display: grid;
  grid-template-columns: 14% 52% 20% 20%;
  align-items: center;
  padding-right: 1em;
  padding-left: 1em;
  padding-top: 2em;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

  @media (min-width: 1024px) {
    margin-top: 3em !important;
    display: grid;
    grid-template-columns: 10% 45% 15% 15% 40%;
    align-items: center;
    padding-right: 1em;
    padding-left: 1em;
    padding-top: 2em;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 1440px) {
    margin-top: 3em !important;
    display: grid;
    grid-template-columns: 8% 45% 15% 15% 40%;
    align-items: center;
    padding-right: 1em;
    padding-left: 1em;
    padding-top: 2em;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
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

  h3 {
    font-family: 'Lato';
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0px;
    text-align: left;
  }

  p {
    font-size: 8px;
    line-height: 2em;
    font-weight: 400;
    font-family: 'Lato';
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
      font-size: 12px;
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
    font-size: 9px;
    padding-right: 3em;
    padding-bottom: 1em !important;
  }
`;

const Vector = styled.div`
  .vector1 {
    padding-right: 2em;
    padding-bottom: 1em;
    width: 43px;

    @media (min-width: 1024px) {
      padding-right: 2em;
      padding-bottom: 1em;
      width: 50px;
    }
    @media (min-width: 1440px) {
      padding-right: 2em;
      padding-bottom: 1em;
      width: 50px;
    }
  }
  .vector2 {
    padding-bottom: 1em;

    @media (min-width: 1024px) {
      padding-right: 1em;
      padding-bottom: 0.5em;
      width: 20px;
    }
    @media (min-width: 1440px) {
      padding-right: 1em;
      padding-bottom: 0.5em;
      width: 20px;
    }
  }
`;

export default PlaylistItem;
