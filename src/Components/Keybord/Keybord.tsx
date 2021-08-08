import {PointerEvent, useCallback, useEffect, useState} from 'react';
import './Keybord.css';

interface Props {
  onClick: (event: PointerEvent<HTMLButtonElement>) => void
}

const coordinates = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 0]];

function Keybord({onClick}: Props) :JSX.Element {
  const [currentPosition, setCurrentPosition] = useState({row: 1, column: 1});

  const handleNavigation = useCallback((event: KeyboardEvent) => {
    let newPosition = currentPosition;
    let value;
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
    value = coordinates[newPosition.row][newPosition.column];
    setCurrentPosition(newPosition);
    onFocusElement(String(value));
  }, [currentPosition]);

  useEffect(() => {
    window.addEventListener('keydown', handleNavigation);
    const value = coordinates[currentPosition.row][currentPosition.column];
    setCurrentPosition(currentPosition);
    onFocusElement(String(value));
    return (() => {
      window.removeEventListener('keydown', handleNavigation);
    });
  }, [currentPosition, handleNavigation])

  function onFocusElement (position: string) {
    let buttonElement: HTMLElement;
    if(['10', '11'].includes(position)) {
      position = 'delete';
    }
    const buttonsCollection = document.querySelectorAll('.Keybord button');
    buttonsCollection.forEach(button => {
      const value = button.getAttribute('value');
      if(value === position) {
        buttonElement = button as HTMLElement;
        buttonElement?.focus();
      }
    });
  }

  return (
    <div className="Keybord">
      <button type="button" onClick={onClick} value="1">1</button>
      <button type="button" onClick={onClick} value="2">2</button>
      <button type="button" onClick={onClick} value="3">3</button>
      <button type="button" onClick={onClick} value="4">4</button>
      <button type="button" onClick={onClick} value="5">5</button>
      <button type="button" onClick={onClick} value="6">6</button>
      <button type="button" onClick={onClick} value="7">7</button>
      <button type="button" onClick={onClick} value="8">8</button>
      <button type="button" onClick={onClick} value="9">9</button>
      <button type="button" onClick={onClick} value="0">0</button>
      <button
        type="button"
        value="delete"
        className="buttonClear"
        onClick={onClick}
      >Стереть</button>
    </div>
  );
}

export default Keybord;