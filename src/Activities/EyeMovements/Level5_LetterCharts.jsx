import { useEffect, useState, useRef, createRef } from "react";
import LetterChartButtons from "./letterChartButtons";
import useSound from "use-sound";

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
  }, [props.change]);

  function stopFunction() {
    clearInterval(intervalId);
    setIntervalId(0);
  }

  function selectedLetters() {
    let count = parseInt(grid) + parseInt(grid);
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
      if (place === parseInt(grid) + parseInt(grid)) {
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
    if (mode === "FirstLast") {
      for (let i = 0; i < grid; i++) {
        if (i === 0) {
          temp.push(
            <div
              ref={myRefs.current[2 * place]}
              key={Date.now() + i}
              className="cell"
              style={{ marginRight: spacing }}
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        } else if (i === grid - 1) {
          temp.push(
            <div
              key={Date.now() + i}
              ref={myRefs.current[2 * place + 1]}
              className="cell"
              style={{ marginRight: spacing }}
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        } else {
          temp.push(
            <div
              key={Date.now() + i}
              className="cell"
              style={{ marginRight: spacing }}
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        }
      }
    } else if (mode === "Second") {
      for (let i = 0; i < grid; i++) {
        if (i === 1) {
          temp.push(
            <div
              ref={myRefs.current[2 * place]}
              key={Date.now() + i}
              style={{ marginRight: spacing }}
              className="cell"
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        } else if (i === grid - 2) {
          temp.push(
            <div
              key={Date.now() + i}
              ref={myRefs.current[2 * place + 1]}
              style={{ marginRight: spacing }}
              className="cell"
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        } else {
          temp.push(
            <div
              key={Date.now() + i}
              style={{ marginRight: spacing }}
              className="cell"
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        }
      }
    } else {
      for (let i = 0; i < grid; i++) {
        if (i === 1) {
          temp.push(
            <div
              key={Date.now() + i}
              className="cell"
              style={{ marginRight: spacing }}
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        } else if (i === grid - 2) {
          temp.push(
            <div
              key={Date.now() + i}
              className="cell"
              style={{ marginRight: spacing }}
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        } else {
          temp.push(
            <div
              key={Date.now() + i}
              className="cell"
              style={{ marginRight: spacing }}
            >
              {alph[Math.floor(Math.random() * 26)]}
            </div>
          );
        }
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
      <LetterChartButtons
        flashRate={setBeat}
        flashBool={beat}
        ChangeRow={setGrid}
        rowBool={grid}
        changeMode={setFontCase}
        modeBool={fontCase}
        changeSize={setSize}
        sizeBool={size}
        changeFlash={setMode}
        triggerBool={mode}
        changeSpacing={setSpacing}
        spaceBool={spacing}
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
