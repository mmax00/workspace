import React from "react";
import "./menu.styles.css";

const Menu = ({ showMenu, setComponents }) => {
  const addComponent = (component) => {
    setComponents((prevComponents) => {
      /* Get the ID of the last component*/
      const id = prevComponents[prevComponents.length - 1]
        ? prevComponents[prevComponents.length - 1].id + 1
        : 0;

      return [
        ...prevComponents,
        {
          name: component,
          id: id,
          defaultPosition: { x: 0, y: 0 },
          data: "",
        },
      ];
    });
  };

  return (
    <div id="menu" style={{ display: showMenu ? "block" : "none" }}>
      <p onClick={() => addComponent("Todo")}>TODO</p>
      <p onClick={() => addComponent("Draw")}>DRAW</p>
      <p onClick={() => addComponent("Note")}>NOTES</p>
      <p onClick={() => addComponent("Timer")}>TIMER</p>
      <p onClick={() => addComponent("Player")}>PLAYER</p>
    </div>
  );
};

export default Menu;
