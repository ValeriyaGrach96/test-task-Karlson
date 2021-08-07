import React from 'react';
import './App.css';
import LeftBarContent from './Components/LeftBarContent/LeftBarContent';
import RightBarContent from './Components/RightBarContent/RightBarContent';

function App(): JSX.Element {
  return (
    <main>
      <aside className="leftAsideBar">
        <LeftBarContent />
      </aside>
      <aside className="rightAsideBar">
        <RightBarContent />
      </aside>
    </main>
  );
}

export default App;
