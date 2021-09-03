import React, { useState } from "react";
import "./pasteUrl.css";
import { FiX } from "react-icons/fi";

const pasteUrl = () => {
  const [url, setUrl] = useState("");

  const handleChange = (event) => setUrl(event.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Song added to the queue");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">
        Paste Youtube URL here
        <FiX
          style={{
            color: "#00bb7c",
            background: "#e5fff6",
            width: "1rem",
            height: "1rem",
          }}
        />
      </label>
      <div className="inputs">
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="https://music.youtube.com/watch?v=v"
        />
        <input type="submit" value="Add" />
      </div>
    </form>
  );
};

export default pasteUrl;
