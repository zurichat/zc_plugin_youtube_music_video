import { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Song from "../../types/song";

import { selectPasteUrl, uiAction } from "../../store/uiSlice";

import { getSongMetadat } from "../../utils/metadata";
import { getUUID } from "../../utils/idGenerator";

import songService from "../../services/songService";
import authService from "../../services/authService";

const PasteUrl = () => {
  const [url, setUrl] = useState("");

  const pasteUrl = useSelector(selectPasteUrl);

  if (!pasteUrl) return null;

  const handleChange = (event: any) => setUrl(event.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const metadata = await getSongMetadat(url);
      const song: Song = {
        id: getUUID(),
        addedBy: authService.getCurrentUser().name,
        ...metadata,
      };

      songService.addSong(song);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="submit-form">
        <label htmlFor="" className="form-label">
          Paste Youtube URL here
          <FiX
            style={{
              color: "#00bb7c",
              background: "#e5fff6",
              width: "1rem",
              height: "1rem",
            }}
            onClick={() => uiAction.dispatchAddSongToggle({ addSong: false })}
          />
        </label>
        <div className="inputs">
          <div className="input-text">
            <input
              type="text"
              name=""
              id=""
              value={url}
              onChange={handleChange}
            />
          </div>
          <div className="input-submit">
            <input type="submit" value="Add" />
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  .submit-form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    width: 400px;
    height: 80px;
    border: 2px solid #fff;
    position: absolute;
    top: 160px;
    left: 180px;
    padding: 1rem;
  }
  .form-label {
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .inputs {
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
  .input-text {
    width: 76%;
    border: 1.5px solid #00bb7c;
    outline: none;
    padding: 0.5rem;
  }
  .input-submit {
    padding: 0.5rem 1.2rem;
    margin-right: 0.9rem;
    color: #fff;
    background: #00bb7c;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default PasteUrl;
