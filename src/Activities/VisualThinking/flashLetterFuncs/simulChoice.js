import Button from "react-bootstrap/Button";
import React from "react";
import { random } from "lodash";
import FlashingButtons from "../flashingButtons";
import { faTintSlash } from "@fortawesome/free-solid-svg-icons";

class Level5_FlashingWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityComplete: false,
      currentIndex: 0,
      currentCorrectWord: "",
      display: 2,
      wordArrays: [
        ["differ", "difference", "different", "differs"],
        ["the", "toe", "tie", "she"],
        ["show", "shone", "shoe", "shot"],
        ["part", "pact", "park", "party"],
        ["ply", "plague", "play", "plug"],
        ["oil", "old", "oh", "odd"],
        ["sock", "suck", "such", "sack"],
        ["far", "fir", "fur", "for"],
        ["sat", "sit", "set", "sets"],
        ["has", "hash", "his", "hat"],
      ],
      correctWordArray: [],
      totalCorrect: 0,
      word0answer: "whitetext",
      word1answer: "whitetext",
      word2answer: "whitetext",
      word3answer: "whitetext",
      sequential: props.seq,
      seqText: "",
      displayTime: 500,
      number: 3,
      beat: false,
      triggered: false,
      loop: null,
      alph: "abcdefghijklmnopqrstuvwxyz",
    };
    this.startActivity = this.startActivity.bind(this);
    this.clickWord = this.clickWord.bind(this);
    this.nextSet = this.nextSet.bind(this);
    this.changeAct = props.newActivity;
    this.playSound = this.playSound.bind(this);
  }

  audio = new Audio("/clickSound.wav");

  componentDidMount() {
    console.log(React.version);
    this.setState({
      correctWordArray: new Array(this.state.wordArrays.length).fill(0),
    });
  }
  changeTime = (change) => {
    this.setState({ displayTime: change });
  };

  setNumber = (change) => {
    this.setState({ number: change });
  };

  playSound(boolean) {
    this.setState({ beat: boolean });
    if (boolean && !this.state.triggered) {
      this.setState({
        loop: setInterval(() => {
          this.audio.play();
        }, 1000),
      });
      this.setState({ triggered: true });
    }

    if (!boolean) {
      clearInterval(this.state.loop);
      this.setState({ triggered: false });
    }
  }

  createRandomString() {
    let numString = "";
    for (let i = 0; i < this.state.number; i++) {
      let random = Math.floor(Math.random() * 26);
      let letter = this.state.alph[random];
      numString += letter;
    }
    return numString;
  }

  startActivity(e) {
    this.setState({ activityStarted: true });
    this.setState({ activityComplete: false });
    this.setState({ totalCorrect: 0 });
    this.nextSet(0);
  }

  redo() {
    if (this.state.activityComplete) {
      this.setState({ activityComplete: false });
    }
    // setTimeout(() => {
    //   this.setState({ display: 0 });
    // }, this.state.displayTime);
    this.setState({ display: 1 });
  }

  nextSet(index) {
    if (index === 0) {
      this.setState({ activityStarted: true });
      this.setState({ activityComplete: false });
      this.setState({ totalCorrect: 0 });
      this.setState({ correctArray: [] });
    }
    this.setState({ display: 2 });
    // this.setState({ currentIndex: index });
    let randomIndex = Math.floor(Math.random() * 4);
    let correctWordArray = this.state.correctWordArray;
    correctWordArray[index] = randomIndex;
    // let correctWord = this.state.wordArrays[index][randomIndex];
    let correctArray = [];
    let randWord0 = this.createRandomString();
    correctArray.push(randWord0);
    let randWord1 = this.createRandomString();
    correctArray.push(randWord1);
    let randWord2 = this.createRandomString();
    correctArray.push(randWord2);
    let randWord3 = this.createRandomString();
    correctArray.push(randWord3);
    this.setState({ currentCorrectWord: correctArray[randomIndex] });

    // controls how long the word flashes

    if (!this.state.sequential) {
      setTimeout(() => {
        this.setState({ display: 0 });
      }, this.state.displayTime);
      this.setState({ display: 1 });
    } else {
      // this.setState({ display: 1 });
      this.setState({ seqText: correctArray[randomIndex][0] });
      for (let i = 1; i < this.state.number; i++) {
        setTimeout(() => {
          this.setState({ seqText: correctArray[randomIndex][i] });
        }, this.state.displayTime * i);
      }
      // this.setState({ seqText: "" });
      setTimeout(() => {
        this.setState({ display: 0 });
        this.setState({ seqText: "" });
      }, this.state.displayTime * this.state.number);
    }

    this.setState({ word0: randWord0 });
    this.setState({ word1: randWord1 });
    this.setState({ word2: randWord2 });
    this.setState({ word3: randWord3 });

    this.setState({ correctWordArray: correctWordArray });
  }

  clickWord(e) {
    console.log("this is the selected index", e);
    console.log(
      "this is the correct index",
      this.state.correctWordArray[this.state.currentIndex]
    );
    if (this.state.correctWordArray[this.state.currentIndex] == e) {
      this.setState({ totalCorrect: this.state.totalCorrect + 1 });
      this.setState({ ["word" + e + "answer"]: "greentext" });
      this.setState({ display: 3 });
    } else {
      this.setState({ ["word" + e + "answer"]: "redtext" });
      this.setState({ display: 4 });
    }
    if (this.state.currentIndex == this.state.correctWordArray.length - 1) {
      this.setState({ ["word" + e + "answer"]: "whitetext" });
      this.setState({ activityComplete: true });
      this.setState({ activityStarted: false });
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({ ["word" + e + "answer"]: "whitetext" });
      this.setState({ activityStarted: false });
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  }

  render() {
    return (
      <div className="activity_box">
        <FlashingButtons
          changeActivity={this.changeAct}
          flashRate={this.changeTime}
          flashBool={this.state.displayTime}
          Number={this.setNumber}
          numberBool={this.state.number}
          addBeat={this.playSound}
          beatBool={this.state.beat}
          activityBool={"Choices"}
          level="Letters"
        />
        <div className="container">
          <div id="seqText">{this.state.seqText}</div>
          {this.state.display == 3 && !this.state.activityComplete && (
            <div id="correctText">Correct!</div>
          )}
          {this.state.display == 4 && !this.state.activityComplete && (
            <div id="incorrectText">Incorrect!</div>
          )}
          {this.state.display == 1 && !this.state.activityComplete && (
            <div id="whitetext">{this.state.currentCorrectWord}</div>
          )}
          {this.state.display == 0 && !this.state.activityComplete && (
            <div>
              <div
                onClick={() => this.clickWord(0)}
                id={this.state.word0answer}
                className="wordOptions"
              >
                {this.state.word0}
              </div>
              <div
                onClick={() => this.clickWord(1)}
                id={this.state.word1answer}
                className="wordOptions"
              >
                {this.state.word1}
              </div>
              <div
                onClick={() => this.clickWord(2)}
                id={this.state.word2answer}
                className="wordOptions"
              >
                {this.state.word2}
              </div>
              <div
                onClick={() => this.clickWord(3)}
                id={this.state.word3answer}
                className="wordOptions"
              >
                {this.state.word3}
              </div>
            </div>
          )}
          {this.state.activityComplete && (
            <div id="whitetext">
              You scored {this.state.totalCorrect} out of{" "}
              {this.state.wordArrays.length} <br />{" "}
              {this.state.totalCorrect == this.state.wordArrays.length
                ? "Good job!"
                : "Keep trying!"}
            </div>
          )}
        </div>
        <div className="button_section">
          <button
            onClick={() => this.redo()}
            disabled={!(this.state.display === 4)}
          >
            Check
          </button>
          <button
            disabled={this.state.activityStarted}
            onClick={() => this.nextSet(this.state.currentIndex)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Level5_FlashingWords;
