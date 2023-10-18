import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hangman from './Components/Hangman/index';
import DotsAndBoxes from './Components/Dots_&_Boxes';
function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <Hangman/>
        <DotsAndBoxes />
      </div>
      
    </div>
  );
}

export default App;
