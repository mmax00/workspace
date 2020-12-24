import React, { useState } from "react";
import "./navigation-bar.styles.css";

import Menu from "../menu/menu.component";

const NavigationBar = (props) => {
  const [showMenu, toggleMenu] = useState(false);
  return (
    <div className="navbar">
      <h1>Workspace</h1>
      <div className="addButton" onClick={() => toggleMenu(!showMenu)}>
        +
      </div>
      <Menu showMenu={showMenu} setComponents={props.setComponents} />
    </div>
  );
};

export default NavigationBar;
