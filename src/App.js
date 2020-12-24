import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import NavigationBar from "./components/navigation-bar/navigation-bar.component";
import Workspace from "./components/workspace/workspace.component";

function App() {
  const [components, setComponents] = useState([]);
  const loaded = useRef(false);
  
  const handleStorage = () => {
    /*Load data from local storage*/
    if (!loaded.current) {
      const comp = JSON.parse(localStorage.getItem("components"));
      if (comp) setComponents(comp);
      loaded.current = true;
      return;
    }

    localStorage.setItem("components", JSON.stringify(components));
  };

  useEffect(() => {
    handleStorage();
  });

  return (
    <div className="App">
      <NavigationBar setComponents={setComponents} />
      <Workspace components={components} setComponents={setComponents} />
    </div>
  );
}

export default App;
