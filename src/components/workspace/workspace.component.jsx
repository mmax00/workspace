import React, { useState, useRef } from "react";
import "./workspace.styles.css";

import Todo from "../menu-components/todo/todo.menu-component";
import Note from "../menu-components/Note/note.menu-component";
import Timer from "../menu-components/timer/timer.menu-component";
import Player from "../menu-components/player/player.menu-component";
import Draw from "../menu-components/draw/draw.menu-component";

import bin from "../../images/bin.png";
import binTop from "../../images/binTop.png";

const Workspace = ({ components, setComponents }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const hoveredItem = useRef(null);

  function switchRender(component) {
    switch (component.name) {
      case "Todo":
        return (
          <Todo
            key={component.id}
            id={component.id}
            setDraggedItem={setDraggedItem}
            defaultPosition={component.defaultPosition}
            setComponents={setComponents}
            data={component.data}
          />
        );
      case "Note":
        return (
          <Note
            key={component.id}
            id={component.id}
            setDraggedItem={setDraggedItem}
            defaultPosition={component.defaultPosition}
            setComponents={setComponents}
            data={component.data}
          />
        );
      case "Timer":
        return (
          <Timer
            key={component.id}
            id={component.id}
            setDraggedItem={setDraggedItem}
            defaultPosition={component.defaultPosition}
            setComponents={setComponents}
          />
        );
      case "Player":
        return (
          <Player
            key={component.id}
            id={component.id}
            setDraggedItem={setDraggedItem}
            defaultPosition={component.defaultPosition}
            setComponents={setComponents}
          />
        );
      case "Draw":
        return (
          <Draw
            key={component.id}
            id={component.id}
            setDraggedItem={setDraggedItem}
            defaultPosition={component.defaultPosition}
            setComponents={setComponents}
            data={component.data}
          />
        );
      default:
        return <h1>Error! Component not found</h1>;
    }
  }

  const deleteItem = (id) => {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== id)
    );
  };

  return (
    <div className="workspace">
      {components.map((component) => switchRender(component))}
      <div
        id="recycleBin"
        onMouseUp={() => deleteItem(hoveredItem.current)}
        onMouseOver={() => (hoveredItem.current = draggedItem)}
        onMouseOut={() => (hoveredItem.current = null)}
      >
        <img src={bin} alt="" id="bin" />
        <img src={binTop} alt="" id="binTop" />
      </div>
    </div>
  );
};

export default Workspace;
