interface Position {
  row: number,
  column: number,
}
export function onFocusElement (position: string, selector: string) {
  if(['10', '11'].includes(position)) {
    position = 'delete';
  }
  const button = document.querySelector<HTMLButtonElement>(`.${selector} button[value="${position}"]`);
  button?.focus();
}

export function arrowsNavigation (event: KeyboardEvent, currentPosition: Position): Position {
  let newPosition = currentPosition;
  if (event.key === "ArrowUp") {
    if(currentPosition.row !== 0) {
      newPosition = {row: currentPosition.row - 1, column: currentPosition.column};
    }
  }
  if (event.key === "ArrowDown") {
    if(currentPosition.row !== 3) {
      newPosition = {row: currentPosition.row + 1, column: currentPosition.column};
    }
  }
  if (event.key === "ArrowLeft") {
    if(currentPosition.column !== 0) {
      newPosition = {row: currentPosition.row, column: currentPosition.column - 1};
    }
  }
  if (event.key === "ArrowRight") {
    if(currentPosition.column !== 2) {
      newPosition = {row: currentPosition.row, column: currentPosition.column + 1};
    }
  }
  return newPosition;
}