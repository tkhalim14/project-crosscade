import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hangman from './Components/Hangman/index';

function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <Hangman/>
      </div>
    </div>
  );
}

export default App;
