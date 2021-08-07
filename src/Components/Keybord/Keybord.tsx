import {PointerEvent} from 'react';
import './Keybord.css';

interface Props {
  onClick: (event: PointerEvent<HTMLButtonElement>) => void
}

function Keybord({onClick}: Props) :JSX.Element {
  return (
    <div className="Keybord">
      <button type="button" aria-label="1" onClick={onClick} value="1">1</button>
      <button type="button" aria-label="2" onClick={onClick} value="2">2</button>
      <button type="button" aria-label="3" onClick={onClick} value="3">3</button>
      <button type="button" aria-label="4" onClick={onClick} value="4">4</button>
      <button type="button" aria-label="5" onClick={onClick} value="5">5</button>
      <button type="button" aria-label="6" onClick={onClick} value="6">6</button>
      <button type="button" aria-label="7" onClick={onClick} value="7">7</button>
      <button type="button" aria-label="8" onClick={onClick} value="8">8</button>
      <button type="button" aria-label="9" onClick={onClick} value="9">9</button>
      <button type="button" aria-label="0" onClick={onClick} value="0">0</button>
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