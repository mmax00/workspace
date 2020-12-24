import React, { useState, useRef, useEffect } from "react";

import Draggable from "react-draggable";
import "./draw.styles.css";
import pinImg from "../../../images/pin.png";

import { setOnLoadPosition } from "../position-handler";

const Draw = ({ setDraggedItem, id, setComponents, defaultPosition, data }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [size, setSize] = useState(3);
  
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const loaded = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";

    /*Loading saved image(data fron localStorage)*/
    if (data && !loaded.current) {
      console.log(data);
      loaded.current = true;
      const img = new Image();
      img.src = data;
      console.log(img);
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };
    }

    contextRef.current = context;
  }, []);

  const startDrawing = (e) => {
    if (!isPinned) return;

    const { offsetX, offsetY } = e.nativeEvent;
    if ((offsetX < 35 && offsetY < 35) || offsetY < 50) return;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !isPinned) return;

    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    if (!isPinned) return;

    console.log("drawing");
    contextRef.current.closePath();
    setIsDrawing(false);

    save();
  };

  const save = () => {
    /*Save data -> which will call useEffect of workspace and save it to local storage*/
    setComponents((prevComponents) => {
      prevComponents.forEach((component) => {
        if (component.id === id) component.data = canvasRef.current.toDataURL();
      });
      return [...prevComponents];
    });
  };

  const setColor = (color) => (contextRef.current.strokeStyle = color);

  const toggleIsPinned = () => setIsPinned((prevState) => !prevState);

  const clear = () => {
    contextRef.current.fillStyle = "rgb(38, 38, 44)";
    contextRef.current.fillRect(0, 0, 400, 400);
    save();
  };

  /*Draw html*/
  const can = (
    <div id="draw">
      <canvas
        id="canvas"
        width="400px"
        height="400px"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      ></canvas>

      <img
        src={pinImg}
        id="pin"
        alt=""
        onClick={toggleIsPinned}
        style={{ backgroundColor: isPinned ? "rgb(24, 24, 27) " : null }}
      />

      <div id="palette">
        <div className="paletteItem red" onClick={() => setColor("red")}></div>
        <div
          className="paletteItem green"
          onClick={() => setColor("green")}
        ></div>
        <div
          className="paletteItem blue"
          onClick={() => setColor("blue")}
        ></div>
        <div
          className="paletteItem black"
          onClick={() => setColor("black")}
        ></div>
        <div
          className="paletteItem white"
          onClick={() => setColor("white")}
        ></div>
        <input
          id="paletteItemSize"
          type="number"
          value={size}
          onChange={(e) => {
            setSize(parseInt(e.target.value));
            return (contextRef.current.lineWidth = parseInt(e.target.value));
          }}
        />
        <div className="paletteItem" onClick={clear}>
          CLS
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "absolute" }}>
      <Draggable
        disabled={isPinned}
        onStart={() => setDraggedItem(id)}
        onStop={(e) => {
          setOnLoadPosition(e, setComponents, id);
          setDraggedItem(null);
        }}
        defaultPosition={defaultPosition}
      >
        {can}
      </Draggable>
    </div>
  );
};

export default Draw;
