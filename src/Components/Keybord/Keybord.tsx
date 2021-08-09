import {PointerEvent, useCallback, useEffect, useState} from 'react';
import style from './Keybord.module.css';
import { onFocusElement, arrowsNavigation } from '../../assets/utils/keybordNavigation';

interface Props {
  onClick: (event: PointerEvent<HTMLButtonElement>) => void
}

const coordinates = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 0]];

function Keybord({onClick}: Props) :JSX.Element {
  const [currentPosition, setCurrentPosition] = useState({row: 1, column: 1});

  const handleNavigation = useCallback((event: KeyboardEvent) => {
    const newPosition = arrowsNavigation(event, currentPosition);
    setCurrentPosition(newPosition);
    onFocusElement(
      String(coordinates[newPosition.row][newPosition.column]),
      style.Keyboard
    );
  }, [currentPosition]);

  useEffect(() => {
    window.addEventListener('keydown', handleNavigation);
    onFocusElement(
      String(coordinates[currentPosition.row][currentPosition.column]),
      style.Keyboard
    );
    return (() => {
      window.removeEventListener('keydown', handleNavigation);
    });
  }, [currentPosition, handleNavigation])

  return (
    <div className={style.Keyboard}>
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
        className={style.buttonClear}
        onClick={onClick}
      >Стереть</button>
    </div>
  );
}

export default Keybord;