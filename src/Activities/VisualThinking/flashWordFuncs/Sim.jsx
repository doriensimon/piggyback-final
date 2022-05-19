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
      delay: 10,
    };

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
      if (this.state.pair) {
        let random = Math.floor(Math.random() * this.state.threePairs.length);
        numString = this.state.threePairs[random];
      } else {
        let random = Math.floor(Math.random() * this.state.twoThree.length);
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
      console.log(random, "this is random");
      if (random <= 0.5) {
        return numString.toUpperCase();
      } else {
        return numString;
      }
    } else {
      return numString.toLowerCase();
    }
  }

  redo() {
    if (this.state.activityComplete) {
      this.setState({ activityComplete: false });
    }
    this.setState({ display: 1 });
  }

  nextSet() {
    let randWord0 = this.createRandomString();
    this.setState({ currentCorrectWord: randWord0 });

    this.setState({ display: 1 });

    setTimeout(() => {
      console.log(this.state.delay, "display delay");
      this.setState({ display: 5 });
    }, this.state.displayTime);
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
          durationBool={"Simultaneous"}
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
            disabled={this.state.display === 1}
          >
            Check
          </button>
          <button
            // disabled={this.state.display !== 1}
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
