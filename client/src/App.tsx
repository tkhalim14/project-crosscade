import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Hangman from './Components/Hangman';
import Header from './Components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';

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
