export const setNewOffset = (card, mouseDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseDir.x;
  const offsetTop = card.offsetTop - mouseDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const autoGrow = (textAreaRef) => {
  const { current } = textAreaRef;

  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
};

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};

export function bodyParser(value) {
  try {
    JSON.parse(value);
    return JSON.parse(value);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return value;
  }
}
