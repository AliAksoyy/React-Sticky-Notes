import Trash from "../icons/Trash";
import { useEffect, useRef, useState } from "react";
import { setNewOffset, setZIndex, autoGrow, bodyParser } from "../utils";

// eslint-disable-next-line react/prop-types
const NoteCard = ({ note }) => {
  // eslint-disable-next-line react/prop-types
  const body = bodyParser(note.body);
  // eslint-disable-next-line react/prop-types
  const [position, setPosition] = useState(bodyParser(note.position));
  // eslint-disable-next-line react/prop-types
  const colors = bodyParser(note.colors);

  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  let mouseStartPos = { x: 0, y: 0 };

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    setZIndex(cardRef.current);
  };
  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  return (
    <div
      className="card"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: colors.colorBody,
      }}
      ref={cardRef}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ colors: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => setZIndex(cardRef.current)}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
