import Trash from "../icons/Trash";
import Spinner from "../icons/Spinner";
import { useEffect, useRef, useState } from "react";
import { db } from "../appwrite/databases";
import { setNewOffset, setZIndex, autoGrow, bodyParser } from "../utils";

// eslint-disable-next-line react/prop-types
const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false);

  const keyUpTimer = useRef(null);
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

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
    // eslint-disable-next-line react/prop-types
    db.notes.update(note.$id, { position: JSON.stringify(newPosition) });
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };

    try {
      // eslint-disable-next-line react/prop-types
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
  };

  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
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
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          onKeyUp={handleKeyUp}
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
