import { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useSelector, connect } from "react-redux";

import Song from "../../types/song";

import { RootState } from "../../store";
import { uiDispatch, uiSelect } from "../../store/uiSlice";

import { getSongMetadat } from "../../utils/metadata";

import songService from "../../services/songService";
import authService from "../../services/authService";
import log from "../../services/logService";

interface Props {
  getSongById: (id: string) => Song;
}

const PasteUrl = (props: Props) => {
  const { getSongById } = props;

  const [url, setUrl] = useState("");

  const pasteUrl = useSelector(uiSelect.showPasteUrl);

  if (!pasteUrl) return null;

  const handleChange = (event: any) => setUrl(event.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    uiDispatch.loading(true);

    try {
      const metadata = await getSongMetadat(url);

      const isExist = getSongById(metadata.id);

      if (isExist) throw Error("Song already in the library");

      const song: Song = {
        ...metadata,
        addedBy: authService.getCurrentUser().name,
      };

      songService.addSong(song);
      uiDispatch.showPasteUrl(false);
    } catch (e) {
      log.error(e.message);
    }

    uiDispatch.loading(false);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="submit-form">
        <div>
          <label htmlFor="" className="form-label">
            Paste Youtube URL here
            <FiX
              style={{
                color: "#00bb7c",
                background: "#e5fff6",
                width: "1rem",
                height: "1rem",
                cursor: "pointer",
              }}
              onClick={() => uiDispatch.showPasteUrl(false)}
            />
          </label>
        </div>
        <div className="inputs">
          <input
            className="input-text"
            type="text"
            name=""
            id=""
            value={url}
            onChange={handleChange}
            autoFocus
          />

          <input className="input-submit" type="submit" value="Add" />
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  height: 110px;
  display: flex;
  justify-content: center;
  width: min(90%, 400px);

  .submit-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    border: 2px solid #00bb7c;
    padding: 1rem;
    width: 100%;
  }
  .form-label {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }
  .inputs {
    display: flex;
    height: 40px;
  }
  .input-text {
    flex-grow: 1;
    border: 1.5px solid #00bb7c;
    outline: none;
    padding: 0.5rem;
    font-size: 17px;
  }
  .input-text::selection {
    background-color: #00bb7c;
    color: white;
  }
  .input-submit {
    flex-basis: 70px;
    padding: 5px 10px;
    font-size: 17px;
    color: #fff;
    background: #00bb7c;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

const mapStateToProps = (state: RootState) => ({
  getSongById: (songId) => state.songs.find((song) => song.id === songId),
});

export default connect(mapStateToProps)(PasteUrl);
