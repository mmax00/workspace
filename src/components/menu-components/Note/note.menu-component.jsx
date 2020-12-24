import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./note.styles.css";

import { setOnLoadPosition } from "../position-handler";

const Note = ({ setDraggedItem, id, setComponents, defaultPosition, data }) => {
  const [text, setText] = useState(data);

  useEffect(() => {
    /*Save data -> which will call useEffect of workspace and save it to local storage*/
    setComponents((prevComponents) => {
      prevComponents.forEach((component) => {
        if (component.id === id) component.data = text;
      });
      return [...prevComponents];
    });
  }, [text]);

  return (
    <Draggable
      onStart={() => setDraggedItem(id)}
      onStop={(e) => {
        setOnLoadPosition(e, setComponents, id);
        setDraggedItem(null);
      }}
      defaultPosition={defaultPosition}
    >
      <div id="note">

        <textarea
          id="noteInput"
          cols="30"
          rows="10"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>

        <p>Note</p>
        
      </div>

    </Draggable>
  );
};

export default Note;
