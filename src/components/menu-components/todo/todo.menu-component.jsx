import React, { useState, useEffect, useRef } from "react";
import "./todo.styles.css";
import Draggable from "react-draggable";

import deleteImg from "../../../images/delete.png";

import { setOnLoadPosition } from "../position-handler";

const TodoItem = ({ todo, setTodos, id, defaultDone }) => {
  const done = useRef(defaultDone);

  const setDone = () => {
    done.current = !done.current;
    setTodos((prevTodos) => {
      prevTodos.forEach((todo) => {
        if (todo.id === id) todo.done = done.current;
      });
      return [...prevTodos];
    });
  };

  const deleteTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  return (
    <div>
      {done.current ? (
        <s>
          <li onClick={setDone}>{todo}</li>
        </s>
      ) : (
        <li onClick={setDone}>{todo}</li>
      )}
      <img
        id="deleteBtn"
        src={deleteImg}
        alt="Not found!"
        width="20"
        onClick={deleteTodo}
      />
    </div>
  );
};

const Todo = ({ setDraggedItem, id, defaultPosition, setComponents, data }) => {
  const [todos, setTodos] = useState([]);
  const [inputShown, inputToggle] = useState(false);
  const loaded = useRef(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTodos((prevTodos) => {
        const id = prevTodos[0] ? prevTodos[0].id + 1 : 0;
        return [{ todo: e.target.value, id: id, done: false }, ...prevTodos];
      });
    }
    if (e.key === "Escape") {
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      if (data) setTodos(data);
      return;
    }
    /*Save data -> which will call useEffect of workspace and save it to local storage*/
    setComponents((prevComponents) => {
      prevComponents.forEach((component) => {
        if (component.id === id) component.data = todos;
      });
      return [...prevComponents];
    });
  }, [todos]);

  return (
    <Draggable
      onStart={() => setDraggedItem(id)}
      onStop={(e) => {
        setOnLoadPosition(e, setComponents, id);
        setDraggedItem(null);
      }}
      defaultPosition={defaultPosition}
    >
      <div className="todo">
        <div id="addButtonTodo" onClick={() => inputToggle(!inputShown)}>
          +
        </div>
        {inputShown ? (
          <input type="text" id="newTodo" onKeyDown={handleKeyDown} />
        ) : null}

        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo.todo}
              setTodos={setTodos}
              id={todo.id}
              defaultDone={todo.done}
            />
          );
        })}
      </div>
    </Draggable>
  );
};

export default Todo;
