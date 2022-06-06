
import { useState, useEffect } from "react";
import { sentence1, sentence2, sentence3, sentence4, sentence5 } from "./FindingLettersData";
import Highlighter from "react-highlight-words";

export default function Level1_FlashingPictures() {
  var [text, setText] = useState("Start")
  var [chart, setChart] = useState("")
  var [letter, setLetter] = useState("")
  var [display, setDisplay] = useState(2)
  var [amount, setAmount] = useState(0)
  var [displayChart, setDisplayChart] = useState(false)
  var [displayAnswer, setDisplayAnswer] = useState(false)
  var [started, setStarted] = useState(false)


  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const alph = "abcdefghijklmnopqrstuvwxyz"
  const charts = [sentence1, sentence2, sentence3, sentence4, sentence5]


  function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
    }

  function countLetters(token, list) {
      let count = 0
      console.log(list, list.length, "this is list and list length")
      console.log(token, "this is the token")
    for (let i = 0; i < list.length; i++) {
        if (list[i].toLowerCase() === token.toLowerCase()) {
            console.log("list:", list[i].toLowerCase(), "token:", token.toLowerCase())
            count++
        }
    }
    return count
  }

  function displayPicture(buttonName) {

    if (buttonName === "next") {
        setDisplayAnswer(false)
        setDisplayChart(false)
        setTime(0) 
        let random = Math.floor(Math.random() * 26)
        let letterSearch = alph[random]
        setLetter(letterSearch)
        let randOption = Math.floor(Math.random() * 5)
        let chartOp = charts[randOption]
        setChart(chartOp)
        


        var regExp = new RegExp(letterSearch, "g")
        var count = (chartOp.match(regExp) || []).length;

        setAmount(count)

        
    } else if (buttonName === "Stop") {
        setText("Answer")
        setRunning(false)
    } else if (buttonName === "Start"){
        setDisplayChart(true)
        setRunning(true)
        setText("Stop")
    }else {
        setDisplayAnswer(true)
        setDisplayChart(false)
        setText("Start")
        

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flexDirection: 'column'
        }}
      >
          {started && <div className="greenTextHeader">Count how many times you find the letter... <br /> <span style={{color: 'white'}}>{letter}</span></div>}
          {displayChart && <div className="whiteTextPara">{chart}</div>}
          {displayAnswer && <div>
              <Highlighter
                    searchWords={[letter]}
                    autoEscape={true}
                    textToHighlight={chart}
                    activeStyle={{color: 'green'}}
                    className={"whiteTextPara"}
                    style={{marginTop: '20px', marginRight: '10%', marginLeft: '10%'}}
                    highlightStyle={{color: 'greenyellow', fontSize: '1.5em', backgroundColor: 'transparent'}}
                    highlightClassName={"highlightListText"}
                />
            </div>}
          {displayAnswer && <div className="greenTextHeader">The letter <span style={{color: "white"}}>{letter}</span> appeared <span style={{color: 'white'}}>{amount}</span> times</div>}
      </div>
          <div style={{display: "flex", width: '100%', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <div className="numbers whiteTextStyle">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div>
            <button disabled={displayAnswer || !started} onClick={() => {
                  displayPicture(text)
              }}>{text}</button>
              <button onClick={() => {
                  displayPicture("next");
                  setStarted(true)
              }}>New Chart</button>
            </div>
              
          </div>
    </div>
  );
}
