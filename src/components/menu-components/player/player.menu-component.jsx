import React, { useState } from "react";
import Draggable from "react-draggable";
import "./player.styles.css";

import { setOnLoadPosition } from "../position-handler";

const Player = ({ setDraggedItem, id, setComponents, defaultPosition }) => {
  const [videoId, setVideoId] = useState("5qap5aO4i9A"); // default lofi hip hop
  const [query, setQuery] = useState("");
  const [display, setDisplay] = useState(true);

  function getVideo() {
    setVideoId(query.substring(query.indexOf("?v=") + 3));

    /* Code for data retrieving with API key*/
    /*
    const APIKEY="NOKEY"
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&type=video&key=${APIKEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        //first video
        setVideoId(data.items[0].id.videoId);
      });
      */
  }

  return (
    <Draggable
      onStart={() => setDraggedItem(id)}
      onStop={(e) => {
        setOnLoadPosition(e, setComponents, id);
        setDraggedItem(null);
      }}
      defaultPosition={defaultPosition}
    >
      <div id="player">
        <div>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Link, API key isn't implemented"
          ></input>

          <button id="play" onClick={() => getVideo()}>
            Play
          </button>

          <button
            id="toggleDisplay"
            onClick={() => setDisplay((prevState) => !prevState)}
          >
            {display ? "Hide" : "Show"}
          </button>
        </div>

        <iframe
          width="392"
          height="220"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ display: display ? "block" : "none" }}
        />

        {display ? null : (
          <h1 style={{ textAlign: "center" }}>Video hidden!</h1>
        )}
      </div>
    </Draggable>
  );
};
export default Player;
