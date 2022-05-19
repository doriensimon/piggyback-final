import { useEffect, useState, useRef, createRef } from "react";
import LetterChart2Buttons from "./LetterChart2Buttons";
import useSound from "use-sound";
import { column1, column2, column3, column4 } from "./LLF2Data";

export default function Level5_LetterCharts(props) {
  var [chart, setChart] = useState([]);
  var [beat, setBeat] = useState(1000);
  var [mode, setMode] = useState("Off");
  var [size, setSize] = useState("36pt");
  var [spacing, setSpacing] = useState("0em");
  var [grid, setGrid] = useState("3em");
  var [intervalId, setIntervalId] = useState(0);
  var [sound, setSound] = useState(false);
  var selected = [];
  var place = 0;
  var [testTime, setTestTime] = useState(0);
  var [running, setRunning] = useState(false);

  const [play] = useSound("/clickSound.wav");

  const myRefs = useRef([]);

  useEffect(() => {
    if (intervalId) {
      stopFunction();
      setChart([]);
      clearTimeout(testTime);
      setRunning(false);
    }
    if (mode === "Off") {
      setChart([]);
    }
  }, [size, mode, spacing, beat, sound]);

  useEffect(() => {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
      clearInterval(i);
    }
  }, [props.change]);

  function stopFunction() {
    console.log("inside the stop");
    clearInterval(intervalId);
    setIntervalId(0);
  }

  function selectedLetters() {
    for (let i = 0; i < 16; i++) {
      selected.push(i);
    }
  }

  function clearOut(index) {
    let test = setTimeout(() => {
      myRefs.current[index].current.style.color = "white";
    }, 500);
    setTestTime(test);
  }

  function triggerGreen() {
    setRunning(true);
    var color = setInterval(() => {
      if (sound) {
        play();
      }
      myRefs.current[place].current.style.color = "greenyellow";
      clearOut(place);
      place++;
      if (place === 16) {
        clearInterval(color);
        setRunning(false);
      }
    }, beat);
    setIntervalId(color);
  }

  function reset() {
    setChart([]);
    if (running) {
      clearInterval(intervalId);
      clearInterval(testTime);
    }
    setTimeout(() => {
      createRow();
    }, 250);
  }

  function CreateLetters(place) {
    let temp = [];
    var wordList;
    if (place === 0) {
      wordList = column1;
    } else if (place === 1) {
      wordList = column2;
    } else if (place === 2) {
      wordList = column3;
    } else {
      wordList = column4;
    }
    let word = wordList[Math.floor(Math.random() * wordList.length)].split(" ");
    if (mode === "Second") {
      for (let i = 0; i < 4; i++) {
        temp.push(
          <div
            style={{ marginRight: spacing, width: grid }}
            ref={myRefs.current[place * 4 + i]}
            key={Date.now() + i}
          >
            {word[i]}
          </div>
        );
      }
    } else if (mode === "FirstLast") {
      for (let i = 0; i < 4; i++) {
        temp.push(
          <div
            key={Date.now() + i}
            style={{ marginRight: spacing, width: grid }}
          >
            <div
              ref={myRefs.current[place * 4 + i]}
              style={{ display: "inline" }}
            >
              {word[i][0]}
            </div>
            <div style={{ display: "inline" }}>
              {word[i].slice(1, word[i].length)}
            </div>
          </div>
        );
      }
    } else {
      for (let i = 0; i < 4; i++) {
        temp.push(
          <div
            key={Date.now() + i}
            style={{ marginRight: spacing, width: grid }}
          >
            {word[i]}
          </div>
        );
      }
    }

    return temp;
  }

  function createRow() {
    selectedLetters();
    myRefs.current = selected.map(
      (element, i) => myRefs.current[i] ?? createRef()
    );
    let tempChart = [];
    for (let i = 0; i < 4; i++) {
      tempChart.push(
        <div
          key={i}
          className="rowChart"
          style={{
            fontSize: size,
            textAlign: "left",
          }}
        >
          {CreateLetters(i)}
        </div>
      );
    }
    setChart(tempChart);
    if (mode !== "Off") {
      triggerGreen();
    }
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
      <LetterChart2Buttons
        flashRate={setBeat}
        flashBool={beat}
        changeSize={setSize}
        sizeBool={size}
        changeFlash={setMode}
        triggerBool={mode}
        changeSpacing={setGrid}
        spaceBool={grid}
        changeMargin={setSpacing}
        changeSound={setSound}
        soundBool={sound}
      />
      <div style={{ margin: "auto" }}>{chart}</div>
      <div>
        <button
          onClick={() => {
            reset();
          }}
        >
          Next Chart
        </button>
      </div>
    </div>
  );
}
