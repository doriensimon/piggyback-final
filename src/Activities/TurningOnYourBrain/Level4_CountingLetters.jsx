import NextCheckButtons from "./nextCheckCountLetter";
import CountLetterButtons from "./countLetterButtons";
import { useState, useEffect } from "react";
import FlashCountLetters from "./flashCountLetters";

export default function Level1_FlashingPictures() {
  var [time, setTime] = useState(1000);
  var [level, setLevel] = useState("Level1");
  var [text, setText] = useState("");
  var [check, setCheck] = useState(false);
  var [next, setNext] = useState(false);
  var [check, setCheck] = useState(false);
  var [display, setDisplay] = useState(false);
  var [finished, setFinished] = useState(false);
  var [presentation, setPresentation] = useState("1Letter");
  var [marginLeft, setMarginLeft] = useState("0%");
  var [marginTop, setMarginTop] = useState("0%");
  var [counts, setCounts] = useState(0);
  var [answer, setAnswer] = useState(null);
  var [interupt, setInterupt] = useState(true);
  var [timer, setTimer] = useState(30);
  var [placeholder, setPlaceholder] = useState("letter");
  // var [doneMan, setDoneMan] = useState(false);

  useEffect(() => {
    if (presentation === "1Letter") {
      setPlaceholder("letter");
    } else if (presentation === "2Letter") {
      setPlaceholder("letters");
    } else {
      setPlaceholder("word");
    }
  }, [presentation]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const words = [
    "ink",
    "aid",
    "bad",
    "cat",
    "dog",
    "eat",
    "fig",
    "hat",
    "jug",
    "kit",
    "let",
    "may",
    "net",
    "our",
    "pet",
    "rub",
    "sit",
    "tag",
    "urn",
    "van",
    "war",
    "yes",
    "zip",
    "box",
    "bag",
    "bug",
    "cog",
    "bus",
    "cot",
    "cut",
    "bed",
    "gum",
    "bin",
    "fox",
    "hut",
    "hop",
    "hot",
    "mud",
    "log",
    "rug",
    "mop",
    "run",
    "pot",
    "sun",
    "bat",
    "leg",
    "fin",
    "kid",
    "peg",
    "lip",
    "jam",
    "pen",
    "pig",
    "man",
    "pin",
    "pan",
    "red",
    "six",
    "rat",
    "ran",
    "ten",
    "tin",
    "vet",
    "wig",
    "yak",
    "web",
    "zip",
  ];

  function level1() {
    let offsetTop = Math.floor(Math.random() * 4);
    let offsetLeft = Math.floor(Math.random() * 4);
    let negativeTop = Math.floor(Math.random() * 2);
    let negativeLeft = Math.floor(Math.random() * 2);

    console.log(negativeLeft);
    if (negativeLeft === 0) {
      console.log("less than 0.5 in left");
      setMarginLeft(JSON.stringify(offsetLeft * -10) + "%");
    } else {
      setMarginLeft(JSON.stringify(offsetLeft * 10) + "%");
    }
    if (negativeTop === 0) {
      console.log("less than 0.5 in right");
      setMarginTop(JSON.stringify(offsetTop * -10) + "%");
    } else {
      setMarginTop(JSON.stringify(offsetTop * 10) + "%");
    }
  }

  function level2() {
    let offsetTop = Math.floor(Math.random() * 8);
    let offsetLeft = Math.floor(Math.random() * 9);
    let negativeTop = Math.floor(Math.random() * 2);
    let negativeLeft = Math.floor(Math.random() * 2);

    console.log(negativeLeft);
    if (negativeLeft === 0) {
      console.log("less than 0.5 in left");
      setMarginLeft(JSON.stringify(offsetLeft * -10) + "%");
    } else {
      setMarginLeft(JSON.stringify(offsetLeft * 10) + "%");
    }
    if (negativeTop === 0) {
      console.log("less than 0.5 in right");
      setMarginTop(JSON.stringify(offsetTop * -10) + "%");
    } else {
      setMarginTop(JSON.stringify(offsetTop * 10) + "%");
    }
  }
  var current30 = 0;
  function second30Timer() {
    if (current30 < timer) {
      setTimeout(() => {
        current30++;
        second30Timer();
      }, 1000);
    } else {
      console.log("exiting the timer");
      // setDoneMan(true);
    }
  }

  var beginCounter = 0;
  var mainCount = 0;

  function beginFlash(flashLetters, doneMan, answer) {
    // setText(flashLetters[0]);

    // for (let i = 1; i < 100; i++) {
    console.log(mainCount, "maincount is incremented");
    if (doneMan) {
      console.log("inside the break for this");

      setMarginLeft("0%");
      setMarginTop("0%");
      setCheck(false);
      setNext(false);
      setInterupt(false);
      setText("");
    } else {
      setTimeout(() => {
        setText("");
      }, time);
      setTimeout(() => {
        if (level === "Level3") {
          level1();
        } else if (level === "Level4") {
          level2();
        }
        setText(flashLetters[beginCounter]);
        if (flashLetters[beginCounter] === answer) {
          console.log("answer appeared here");
          mainCount++;
        }
        beginCounter++;
        if (current30 < timer) {
          setCounts(mainCount);
          beginFlash(flashLetters, false, answer);
        } else {
          beginFlash(flashLetters, true, answer);
        }

        // }
      }, time + 150);
    }
  }

  function oneLetter() {
    let random = Math.floor(Math.random() * alphabet.length);
    let answer = alphabet[random];
    setAnswer(answer);
    let flashLetters = [];
    let count = 0;
    for (let i = 0; i < 500; i++) {
      let inputA = Math.floor(Math.random() * 3);
      if (inputA === 0) {
        flashLetters.push(answer);
        count++;
      } else {
        flashLetters.push(
          alphabet[Math.floor(Math.random() * alphabet.length)]
        );
      }
    }
    setFinished(false);
    setDisplay(true);
    setText(answer);
    // setCounts(count);

    setTimeout(() => {
      setDisplay(false);
      setText("");
      setNext(true);
      setCheck(true);
      beginFlash(flashLetters, false, answer);
    }, 1000);
  }

  function twoLetter() {
    let random = Math.floor(Math.random() * alphabet.length);
    let random2 = Math.floor(Math.random() * alphabet.length);
    let answerOne = alphabet[random];
    let answerTwo = alphabet[random2];
    setAnswer(answerOne + answerTwo);
    let flashLetters = [];
    let count = 0;
    for (let i = 0; i < 500; i++) {
      let inputA = Math.floor(Math.random() * 3);
      if (inputA === 0) {
        flashLetters.push(answerOne + answerTwo);
        count++;
      } else {
        flashLetters.push(
          alphabet[Math.floor(Math.random() * alphabet.length)] +
            alphabet[Math.floor(Math.random() * alphabet.length)]
        );
      }
    }
    setFinished(false);
    setDisplay(true);
    setText(answerOne + answerTwo);
    // setCounts(count);

    setTimeout(() => {
      setDisplay(false);
      setText("");
      setNext(true);
      setCheck(true);
      beginFlash(flashLetters, false, answer);
    }, 1000);
  }

  function displayPicture() {
    second30Timer();
    setInterupt(true);
    setMarginLeft("0%");
    setMarginTop("0%");
    if (presentation === "1Letter") {
      oneLetter();
    } else if (presentation === "2Letter") {
      twoLetter();
    } else {
      wordAct();
    }
  }

  function wordAct() {
    let random = Math.floor(Math.random() * words.length);
    let answer = words[random];
    setAnswer(answer);
    let flashLetters = [];
    let count = 0;
    for (let i = 0; i < 500; i++) {
      let inputA = Math.floor(Math.random() * 3);
      if (inputA === 0) {
        flashLetters.push(answer);
        count++;
      } else {
        flashLetters.push(words[Math.floor(Math.random() * words.length)]);
      }
    }
    setFinished(false);
    setDisplay(true);
    setText(answer);
    // setCounts(count);

    setTimeout(() => {
      setDisplay(false);
      setText("");
      setNext(true);
      setCheck(true);
      beginFlash(flashLetters, false, answer);
    }, 1000);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {level !== "Level2" && (
        <CountLetterButtons
          flashRate={setTime}
          flashBool={time}
          hiddenLetter={setPresentation}
          letterBool={presentation}
          changeLevel={setLevel}
          levelBool={level}
          changeDuration={setTimer}
          durationBool={timer}
          durationDisplay={false}
        />
      )}

      {level === "Level2" ? (
        <FlashCountLetters
          flashRate={setTime}
          flashBool={time}
          hiddenLetter={setPresentation}
          letterBool={presentation}
          changeLevel={setLevel}
          levelBool={level}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          {display && (
            <p className="startText">
              Count how many times you see the {placeholder}...
            </p>
          )}
          {finished && (
            <div className="startText">
              {/* change "text" to be the answer and fix the display of this and the count feature */}
              The {placeholder}{" "}
              {<p style={{ display: "inline", color: "white" }}>{answer}</p>}{" "}
              appeared{" "}
              {<p style={{ display: "inline", color: "white" }}>{counts}</p>}{" "}
              times
            </div>
          )}
          {interupt && (
            <p
              id="countLetText"
              style={{ marginLeft: marginLeft, marginTop: marginTop }}
            >
              {text}
            </p>
          )}
        </div>
      )}
      {level !== "Level2" && (
        <NextCheckButtons
          displayFunc={displayPicture}
          displayAnswer={setFinished}
          disableCheck={check}
          disableNext={next}
        />
      )}
    </div>
  );
}
