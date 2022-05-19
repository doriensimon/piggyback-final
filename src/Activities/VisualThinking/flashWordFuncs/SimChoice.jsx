import Button from "react-bootstrap/Button";
import React from "react";
import { random } from "lodash";
import FlashWordsButtons from "../flashWordsButtons";
import FlashingButtons from "../flashingButtons";
import { faTintSlash } from "@fortawesome/free-solid-svg-icons";
import {
  twoThreeLetter,
  twoThreePairs,
  fourLetterA,
  fourLetterB,
  fourLetterC,
  fourPairsA,
  fourPairsB,
  fourPairsC,
  fiveLetterA,
  fiveLetterB,
  fiveLetterC,
  fivePairs,
} from "../words/data";

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
      displayTime: props.flash,
      number: 3,
      beat: false,
      triggered: false,
      loop: null,
      alph: "abcdefghijklmnopqrstuvwxyz",
      twoThree: twoThreeLetter,
      fourLetterA: fourLetterA,
      fourLetterB: fourLetterB,
      fourLetterC: fourLetterC,
      fiveLetterA: fiveLetterA,
      fiveLetterB: fiveLetterB,
      fiveLetterC: fiveLetterC,
      fourPairsA: fourPairsA,
      fourPairsB: fourPairsB,
      fourPairsC: fourPairsC,
      fivePairs: fivePairs,
      threePairs: twoThreePairs,
      pair: props.word,
      size: props.size,
      case: props.font,
      list: props.list,
      group: "A",
      delay: "Manual",
      hide: true,
      seen: ["", "", "", "", "", "", "", "", "", ""],
    };
    this.startActivity = this.startActivity.bind(this);
    this.clickWord = this.clickWord.bind(this);
    this.nextSet = this.nextSet.bind(this);
    this.changeAct = props.newActivity;
    this.playSound = this.playSound.bind(this);
    this.changeSize = props.changeSize;
    this.changeFont = props.changeFont;
    this.changeWord = props.changeWord;
    this.changeList = props.changeList;
    this.changeFlash = props.changeFlash;
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
    this.changeFlash(change);
  };

  setNumber = (change) => {
    this.setState({ number: change });
  };

  setWordList = (change) => {
    this.setState({ list: change });
    this.changeList(change);
  };

  setPair = (change) => {
    this.setState({ pair: change });
    this.changeWord(change);
  };

  setCase = (change) => {
    this.setState({ case: change });
    this.changeFont(change);
  };

  setSize = (change) => {
    this.setState({ size: change });
    this.changeSize(change);
  };

  setGroup = (change) => {
    this.setState({ group: change });
  };

  setDelay = (change) => {
    this.setState({ delay: change });
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
    // have to do something to get rid of repeats
    let numString;
    if (this.state.list === "twoThree") {
      let random = Math.floor(Math.random() * this.state.twoThree.length);
      if (this.state.pair) {
        let random = Math.floor(Math.random() * this.state.threePairs.length);
        numString = this.state.threePairs[random];
      } else {
        numString = this.state.twoThree[random];
      }
    } else if (this.state.list === "fourLetter") {
      //pairs and different groups
      if (this.state.pair) {
        if (this.state.group === "A") {
          let random = Math.floor(Math.random() * this.state.fourPairsA.length);
          numString = this.state.fourPairsA[random];
        } else if (this.state.group === "B") {
          let random = Math.floor(Math.random() * this.state.fourPairsB.length);
          numString = this.state.fourPairsB[random];
        } else {
          let random = Math.floor(Math.random() * this.state.fourPairsC.length);
          numString = this.state.fourPairsC[random];
        }

        // non pairs and different groups
      } else {
        if (this.state.group === "A") {
          let random = Math.floor(
            Math.random() * this.state.fourLetterA.length
          );
          numString = this.state.fourLetterA[random];
        } else if (this.state.group === "B") {
          let random = Math.floor(
            Math.random() * this.state.fourLetterB.length
          );
          numString = this.state.fourLetterB[random];
        } else {
          let random = Math.floor(
            Math.random() * this.state.fourLetterC.length
          );
          numString = this.state.fourLetterC[random];
        }
      }
    } else {
      if (this.state.pair) {
        let random = Math.floor(Math.random() * this.state.fivePairs.length);
        numString = this.state.fivePairs[random];
      } else {
        if (this.state.group === "A") {
          let random = Math.floor(
            Math.random() * this.state.fiveLetterA.length
          );
          numString = this.state.fiveLetterA[random];
        } else if (this.state.group === "B") {
          let random = Math.floor(
            Math.random() * this.state.fiveLetterB.length
          );
          numString = this.state.fiveLetterB[random];
        } else {
          let random = Math.floor(
            Math.random() * this.state.fiveLetterC.length
          );
          numString = this.state.fiveLetterC[random];
        }
      }
    }

    if (this.state.case === "Upper") {
      return numString.toUpperCase();
    } else if (this.state.case === "Mixed") {
      let random = Math.random();

      if (random <= 0.5) {
        return numString.toUpperCase();
      } else {
        return numString;
      }
    } else {
      return numString.toLowerCase();
    }
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
    this.setState({ activityStarted: true });
    this.setState({ display: 2 });
    // this.setState({ currentIndex: index });
    let randomIndex = Math.floor(Math.random() * 4);
    let correctWordArray = this.state.correctWordArray;
    correctWordArray[index] = randomIndex;
    // let correctWord = this.state.wordArrays[index][randomIndex];
    let correctArray = [];
    let randWord0 = this.createRandomString();
    correctArray.push(randWord0);
    console.log(correctArray, "after adding 1");
    let randWord1 = this.createRandomString();
    if (correctArray.includes(randWord1)) {
      console.log("included rand1");
      console.log(randWord1);
      for (let i = 1; i > 0; i++) {
        randWord1 = this.createRandomString();
        if (!correctArray.includes(randWord1)) {
          break;
        }
      }
    }
    correctArray.push(randWord1);
    console.log(correctArray, "after adding 2");
    let randWord2 = this.createRandomString();
    if (correctArray.includes(randWord2)) {
      console.log("included rand2");
      console.log(randWord2);
      for (let i = 1; i > 0; i++) {
        randWord2 = this.createRandomString();
        if (!correctArray.includes(randWord2)) {
          break;
        }
      }
    }
    correctArray.push(randWord2);
    console.log(correctArray, "after adding 3");
    let randWord3 = this.createRandomString();
    if (correctArray.includes(randWord3)) {
      console.log("included rand3");
      console.log(randWord3);
      for (let i = 1; i > 0; i++) {
        randWord3 = this.createRandomString();
        if (!correctArray.includes(randWord3)) {
          break;
        }
      }
    }
    correctArray.push(randWord3);
    console.log(correctArray, "after adding 4");

    let correctWord = correctArray[randomIndex];
    console.log(correctWord, "this is the correct word");

    if (this.state.seen.includes(correctWord)) {
      console.log("IN THE SEEN LIST");
      this.nextSet(index);
    } else {
      let seen = this.state.seen;
      seen[this.state.currentIndex] = correctArray[randomIndex];
      this.setState({ currentCorrectWord: correctArray[randomIndex] });
      this.setState({ seen: seen });
      this.setState({ display: 1 });

      // controls how long the word flashes
      if (this.state.delay !== "Manual") {
        setTimeout(() => {
          this.setState({ display: 5 });
          setTimeout(() => {
            this.setState({ display: 0 });
          }, this.state.delay * 1000);
        }, this.state.displayTime);
      } else {
        setTimeout(() => {
          this.setState({ display: 5 });
        }, this.state.displayTime);
      }

      this.setState({ word0: randWord0 });
      this.setState({ word1: randWord1 });
      this.setState({ word2: randWord2 });
      this.setState({ word3: randWord3 });

      this.setState({ correctWordArray: correctWordArray });
    }
  }

  clickWord(e) {
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
      this.setState({ seen: ["", "", "", "", "", "", "", "", "", ""] });
    } else {
      this.setState({ ["word" + e + "answer"]: "whitetext" });
      this.setState({ activityStarted: false });
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  }

  render() {
    return (
      <div className="activity_box">
        <FlashWordsButtons
          flashBool={this.state.displayTime}
          flashRate={this.changeTime}
          hiddenLetter={this.setWordList}
          letterBool={this.state.list}
          changeLevel={this.setPair}
          levelBool={this.state.pair}
          changeActivity={this.changeAct}
          durationBool={"Choices"}
          changeCase={this.setCase}
          caseBool={this.state.case}
          sizeBool={this.state.size}
          changeSize={this.setSize}
          changeGroup={this.setGroup}
          groupBool={this.state.group}
          changeDisplay={this.setDelay}
          displayBool={this.state.delay}
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
            <div id="whitetext" style={{ fontSize: this.state.size }}>
              {this.state.currentCorrectWord}
            </div>
          )}
          {this.state.display == 0 && !this.state.activityComplete && (
            <div style={{ marginTop: "-120px" }}>
              <div
                onClick={() => this.clickWord(0)}
                id={this.state.word0answer}
                className="wordOptions"
                style={{ fontSize: this.state.size }}
              >
                {this.state.word0}
              </div>
              <div
                onClick={() => this.clickWord(1)}
                id={this.state.word1answer}
                className="wordOptions"
                style={{ fontSize: this.state.size }}
              >
                {this.state.word1}
              </div>
              <div
                onClick={() => this.clickWord(2)}
                id={this.state.word2answer}
                className="wordOptions"
                style={{ fontSize: this.state.size }}
              >
                {this.state.word2}
              </div>
              <div
                onClick={() => this.clickWord(3)}
                id={this.state.word3answer}
                className="wordOptions"
                style={{ fontSize: this.state.size }}
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
          <button
            disabled={this.state.delay !== "Manual" || this.state.display !== 5}
            onClick={() => {
              this.setState({ display: 0 });
            }}
          >
            Display
          </button>
        </div>
      </div>
    );
  }
}

export default Level5_FlashingWords;
