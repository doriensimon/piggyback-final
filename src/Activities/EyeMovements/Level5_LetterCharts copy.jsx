import { useEffect, useState, useRef, createRef } from "react";
import LetterChartButtons from "./letterChartButtons";

export default function Level5_LetterCharts() {
  var [grid, setGrid] = useState(5);
  var [chart, setChart] = useState([]);
  var alph = "abcdefghijklmnopqrstuvwxyz";
  var [item, setItem] = useState(0);
  var selected = [];
  var [count, setCount] = useState(0);

  const myRefs = useRef([]);

  var colorControl = useRef(null);

  function selectedLetters() {
    let count = parseInt(grid) * parseInt(grid);
    for (let i = 0; i < count; i++) {
      selected.push(alph[Math.floor(Math.random() * 26)]);
    }
  }

  function triggerGreen() {
    console.log(chart);
    for (let i = 0; i < grid; i++) {
      setTimeout(() => {
        console.log(myRefs);
        console.log(myRefs.current);
        console.log(myRefs.current[0]);
        console.log(myRefs.current[0].style);
        myRefs.current[i].style.color = "green";
        // let item = document.getElementById(JSON.stringify(i));
        // console.log(item, "this is the item");
        // item.style.color = "green";
        // console.log("ran it girly");
      }, 1000 * i);
    }
  }

  function CreateLetters(place) {
    let temp = [];
    for (let i = 0; i < grid; i++) {
      if (i === 0) {
        let newRef = useRef(null);
        myRefs.current.push(newRef);
        temp.push(
          <div
            ref={newRef}
            key={Date.now() + i}
            // id={JSON.stringify(count)}
          >
            {alph[Math.floor(Math.random() * 26)]}
          </div>
        );
        console.log("let an id here", place);
        let newCount = count + 1;
        setCount(newCount);
      } else if (i === grid - 1) {
        temp.push(
          <div key={Date.now() + i}>{alph[Math.floor(Math.random() * 26)]}</div>
        );
      } else {
        temp.push(
          <div key={Date.now() + i}>{alph[Math.floor(Math.random() * 26)]}</div>
        );
      }
    }

    return temp;
  }

  function createRow() {
    selectedLetters();
    // myRefs.current = selected.map(
    //   (element, i) => myRefs.current[i] ?? createRef()
    // );
    let tempChart = [];
    for (let i = 0; i < grid; i++) {
      tempChart.push(
        <div key={i} className="rowChart">
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
      <LetterChartButtons />
      <div style={{ margin: "auto" }}>{chart}</div>
      <div>
        <button
          onClick={() => {
            setChart([]);
            createRow();
          }}
        >
          Next Chart
        </button>
      </div>
    </div>
  );
}
