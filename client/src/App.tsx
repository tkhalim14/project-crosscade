import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Hangman from './Components/Hangman';
import Header from './Components/Header';
import Home from './Components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Header/>
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Hangman' element={<Hangman/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </HashRouter>
  );
}

export default App;
