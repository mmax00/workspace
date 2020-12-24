const setOnLoadPosition = (e, setComponents, id) => {
  /*
        E is object returned by onStop prop from Draggable component
        which has parameter path. Path is the whole structure of 
        component. Algorithm finds element in path that contains class name
        of "react-draggable react-draggable-dragging react-draggable-dragged"
        and then sets the html as the outer html of the found element.
        After that algo finds x and y positions from string (
            for example: transform: translate(100px,200px);
            it will find x: 100  and y: 200;
        )
    */
  let index = -1;
  let html;

  if (e.path) {
    e.path.forEach((p) => {
      if (p.className) {
        if (
          p.className.includes(
            "react-draggable react-draggable-dragging react-draggable-dragged"
          )
        ) {
          html = p.outerHTML;
          index = html.indexOf("translate(");
        }
      }
    });
  }

  if (index === -1) return;

  html = html.substring(index + 9, index + 25);
  const x = html.substring(html.indexOf("(") + 1, html.indexOf(",") - 2);
  const y = html.substring(html.indexOf(",") + 2, html.indexOf(")") - 2);

  updatePosition({ x: parseInt(x), y: parseInt(y) }, setComponents, id);
};

const updatePosition = (position, setComponents, id) => {
  setComponents((prevComponents) => {
    prevComponents.forEach((component) => {
      if (component.id === id) component.defaultPosition = position;
    });
    return [...prevComponents];
  });
};

export { setOnLoadPosition };
