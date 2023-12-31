import React, { Component } from 'react';
import { randomWord } from './words';

import './index.css';

import step0 from "../Media/images/0.jpg";
import step1 from "../Media/images/1.jpg";
import step2 from "../Media/images/2.jpg";
import step3 from "../Media/images/3.jpg";
import step4 from "../Media/images/4.jpg";
import step5 from "../Media/images/5.jpg";
import step6 from "../Media/images/6.jpg";

class Hangman extends Component <{maxWrong: number, images: any},{word: any, riddle: any, loading: boolean, error: any, mistake: number, guessed: Set<string>}>{


  protected gameStat : any;

  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  }


  constructor(props: any) {
    super(props);
    this.state = {
      word: null,
      riddle: null,
      loading: true,
      error: null,
      mistake: 0,
      guessed: new Set(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.keyPress = this.keyPress.bind(this);
    window.addEventListener("keydown", this.keyPress);
  }

  async componentDidMount() {
    await this.fetchfromapi();
  }

  async fetchfromapi () {
    try {
      const data = await randomWord();
      const word = data['word'];
      const riddle = data["riddle"];
      this.setState({ word: word, riddle: riddle, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  guessedWord = () => {
    try {
      return this.state.word.split("").map((bingo: string) => (this.state.guessed.has(bingo) ? bingo : "_"));
    }
    catch (error) {
      return [];
    }
  }

  handleGuess = (value: string) => {
    let letter = value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.word.includes(letter) ? 0 : 1),
    }));
  }

  keyPress = (event: any) => {
    if (this.gameStat === "YOU WON" || this.gameStat === "YOU LOST") {
      if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
      /** 8 = backspace
        * 13 = enter
        * 32 = space*/
        this.resetButton();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      this.handleGuess(event.key);
    } else if (
      event.keyCode === 8 ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      this.resetButton();
    } else {
    }
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        key={letter}
        value={letter}
        onClick={(e) => this.handleGuess((e.target as HTMLInputElement).value)}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }


  resetButton = async () => {
    this.setState({
      word: null,
      riddle: null,
      loading: true,
      error: null,
      mistake: 0,
      guessed: new Set(),
    });
    await this.fetchfromapi();
  };

  render() {
    const { word, riddle, loading, error } = this.state;
    const { mistake } = this.state;
    const { maxWrong, images } = this.props;
    const gameOver = mistake >= maxWrong;
    const altText = `${mistake}/${maxWrong} wrong guesses`;
    const isWinner = this.guessedWord().join("") === word;
    this.gameStat = this.generateButtons();
    
    if (isWinner) {
      this.gameStat = "YOU WON";
    }
    if (gameOver) {
      this.gameStat = "YOU LOST";
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="Hangman">

        <p className="text-center">
          <img src={images[mistake]} alt={altText} />
        </p>
        <p className="text-center text-light">
          {riddle}
        </p>
        <p className="Hangman-word text-center">
          {!gameOver ? this.guessedWord() : word}{" "}
        </p>

        <p className="text-center text-warning mt-4">{this.gameStat}</p>

        <div>
          <p className="text-center">
            <button className="Hangman-reset" onClick={this.resetButton}>
              Reset
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Hangman;