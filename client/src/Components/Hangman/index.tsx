import React, { Component } from "react";
import { randomWord } from "./words";

import './index.css';

import step0 from "../Media/images/0.jpg";
import step1 from "../Media/images/1.jpg";
import step2 from "../Media/images/2.jpg";
import step3 from "../Media/images/3.jpg";
import step4 from "../Media/images/4.jpg";
import step5 from "../Media/images/5.jpg";
import step6 from "../Media/images/6.jpg";


class Hangman extends Component<{maxWrong: number, images: any},{answer: string, mistake: number, guessed: Set<string>}> {

  protected gameStat : any;

  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  }

  constructor(props: any) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.keyPress = this.keyPress.bind(this);
    window.addEventListener("keydown", this.keyPress);
  }

  guessedWord = () => {
    return this.state.answer.split("").map((bingo) => (this.state.guessed.has(bingo) ? bingo : "_"));
  }

  handleGuess = (value: string) => {
    let letter = value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
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


  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  };

  render() {
    const { mistake, answer } = this.state;
    const { maxWrong, images } = this.props;
    const gameOver = mistake >= maxWrong;
    const altText = `${mistake}/${maxWrong} wrong guesses`;
    const isWinner = this.guessedWord().join("") === answer;
    this.gameStat = this.generateButtons();
    
    if (isWinner) {
      this.gameStat = "YOU WON";
    }
    if (gameOver) {
      this.gameStat = "YOU LOST";
    }

    return (
      <div className="Hangman">

        <p className="text-center">
          <img src={images[mistake]} alt={altText} />
        </p>
        <p className="text-center text-light">
          Guess the Programming Language ?
        </p>
        <p className="Hangman-word text-center">
          {!gameOver ? this.guessedWord() : answer}{" "}
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

};

export default Hangman;