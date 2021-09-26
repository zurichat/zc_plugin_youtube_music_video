import { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useSelector, connect } from "react-redux";
import { toast } from "react-toastify";

import Song from "../../types/song";

import { RootState } from "../../store";
import { uiDispatch, uiSelect } from "../../store/uiSlice";

import songService from "../../services/songService";
import { getSongIdFromYouTubeUrl } from "../../utils/idGenerator";

interface Props {
  getSongByUrl: (url: string) => Song;
}

const PasteUrl = (props: Props) => {
  const [url, setUrl] = useState("");

  const showPasteUrl = useSelector(uiSelect.showPasteUrl);

  if (!showPasteUrl) return null;

  const handleChange = (event: any) => setUrl(event.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (props.getSongByUrl(url)) {
      return toast.error("This song already exists.") && setUrl("");
    }

    uiDispatch.loading(true);

    try {
      getSongIdFromYouTubeUrl(url);
      await songService.addSongbyUrl(url);
      uiDispatch.showPasteUrl(false);
      toast.success("Added Successfully");

      // this.setState(url: "");
      setUrl("");

    } catch (e) {
      toast.error(e.message);
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
  getSongByUrl: (url) => state.songs.find((song) => song.url === url),
});

export default connect(mapStateToProps)(PasteUrl);
