import { useEffect, useState, useRef, createRef } from "react";

import useSound from "use-sound";
import { ImArrowUp, ImArrowRight, ImArrowDown, ImArrowLeft } from 'react-icons/im';
import ArrowButtons from "./arrowButtons"

export default function Level5_LetterCharts(props) {
  var [grid, setGrid] = useState(3);
  var [chart, setChart] = useState([]);
  var [beat, setBeat] = useState(1000);
  var [sound, setSound] = useState(false);
  var [fontCase, setFontCase] = useState("lowercase");
  var [mode, setMode] = useState("Off");
  var [size, setSize] = useState("36pt");
  var [spacing, setSpacing] = useState("0px");
  var [intervalId, setIntervalId] = useState(0);
  var alph = "abcdefghijklmnopqrstuvwxyz";
  var selected = [];
  var place = 0;
  var [testTime, setTestTime] = useState(0);
  var [running, setRunning] = useState(false);
  var curr = 0;

  const upArrow = <ImArrowUp style={{height: '30px'}}/>
  const downArrow = <ImArrowDown style={{height: '30px'}}/>
  const leftArrow = <ImArrowLeft style={{height: '30px'}}/>
  const rightArrow = <ImArrowRight style={{height: '30px'}}/>

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
  }, [grid, fontCase, size, mode, spacing, beat, sound]);

  useEffect(() => {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
      clearInterval(i);
    }
  }, [props.change, sound, beat, grid]);

  function stopFunction() {
    clearInterval(intervalId);
    setIntervalId(0);
  }

  function selectedLetters() {
    let count = parseInt(grid) * parseInt(grid);
    for (let i = 0; i < count; i++) {
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
      if (place === parseInt(grid) * parseInt(grid)) {
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

  function getDirection() {
    let direction = Math.floor(Math.random() * 4) + 1
    if (direction === 1) {
        return upArrow
    }
    if (direction === 2) {
        return leftArrow
    }
    if (direction === 3) {
        return downArrow
    }
    return rightArrow
  }

  function CreateLetters(place) {
    let temp = [];
      for (let i = 0; i < grid; i++) {
          temp.push(
            <div
              ref={myRefs.current[curr]}
              key={Date.now() + i}
              className="cellArrow"
              style={{ marginRight: spacing }}
            >
              {getDirection()}
            </div>
          );
          curr++;
      }

    return temp;
  }

  function createRow() {
    curr = 0;
    selectedLetters();
    myRefs.current = selected.map(
      (element, i) => myRefs.current[i] ?? createRef()
    );
    let tempChart = [];
    for (let i = 0; i < grid; i++) {
      tempChart.push(
        <div
          key={i}
          className="rowChart"
          style={{
            textTransform: fontCase,
            fontSize: size,
            textAlign: "center",
          }}
        >
          {CreateLetters(i)}
        </div>
      );
    }
    setChart(tempChart);

      triggerGreen();
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
      <ArrowButtons
        flashRate={setBeat}
        flashBool={beat}
        ChangeRow={setGrid}
        rowBool={grid}
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
