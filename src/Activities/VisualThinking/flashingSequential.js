import Button from "react-bootstrap/Button";
import React from "react";
import { random } from "lodash";
import FlashingButtons from "./flashingButtons";
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
      seqText: "",
      displayTime: 500,
      number: 3,
      beat: false,
      triggered: false,
      loop: null,
      checkArray: [],
      checkRandom: 0,
    };
    this.startActivity = this.startActivity.bind(this);
    this.clickWord = this.clickWord.bind(this);
    this.nextSet = this.nextSet.bind(this);
    this.playSound = this.playSound.bind(this);
    this.changeAct = props.newActivity;
  }

  audio = new Audio("/clickSound.wav");

  componentDidMount() {
    console.log(React.version);
    this.setState({
      correctWordArray: new Array(this.state.wordArrays.length).fill(0),
    });
  }

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

  changeTime = (change) => {
    this.setState({ displayTime: change });
  };

  setNumber = (change) => {
    this.setState({ number: change });
  };

  createRandomString() {
    let numString = "";
    for (let i = 0; i < this.state.number; i++) {
      let random = Math.floor(Math.random() * 10);
      numString += JSON.stringify(random);
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
    this.setState({ display: 2 });
    let randomIndex = this.state.checkRandom;
    let correctArray = this.state.checkArray;
    this.setState({ seqText: correctArray[randomIndex] });
  }

  nextSet(index) {
    if (index === 0) {
      this.setState({ activityStarted: true });
      this.setState({ activityComplete: false });
      this.setState({ totalCorrect: 0 });
    }
    this.setState({ display: 2 });
    this.setState({ currentIndex: index });
    let randomIndex = Math.floor(Math.random() * 4);
    let correctWordArray = this.state.correctWordArray;
    console.log(correctWordArray, "before line 64");
    correctWordArray[index] = randomIndex;
    console.log(correctWordArray, "after line 64");
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
    this.setState({ checkArray: correctArray });
    this.setState({ checkRandom: randomIndex });

    // controls how long the word flashes

    // this.setState({ display: 1 });
    this.setState({ seqText: correctArray[randomIndex][0] });
    for (let i = 1; i < this.state.number; i++) {
      setTimeout(() => {
        this.setState({ seqText: "" });
      }, this.state.displayTime * i);
      setTimeout(() => {
        this.setState({ seqText: correctArray[randomIndex][i] });
      }, this.state.displayTime * i + 100);
    }
    // this.setState({ seqText: "" });
    setTimeout(() => {
      this.setState({ display: 0 });
      this.setState({ seqText: "" });
    }, this.state.displayTime * this.state.number);

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
      this.setState({ activityStarted: false });
      this.setState({ ["word" + e + "answer"]: "whitetext" });
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
          activityBool={"Sequential"}
          level="Numbers"
        />
        <div className="container">
          <div id="seqText">{this.state.seqText}</div>
          {this.state.display == 3 && !this.state.activityComplete && (
            <div id="correctText">Correct!</div>
          )}
          {this.state.display == 4 && !this.state.activityComplete && (
            <div id="incorrectText">Incorrect!</div>
          )}
          {this.state.display == 0 && !this.state.activityComplete && (
            <div
              style={{
                marginTop: "-20%",
              }}
            >
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
