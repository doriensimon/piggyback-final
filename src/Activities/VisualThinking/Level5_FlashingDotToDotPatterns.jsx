import Dropdown from "react-bootstrap/Dropdown";
import LineTo from 'react-lineto'; 
import React, {useRef, useState, useEffect} from "react";
import Xarrow from "react-xarrows";
import DotToDotButtons from "./DotToDotButtons"
import useSound from "use-sound";

export default function Level5_FlashingDotToDotPatterns() {

  var [start, setStart] = useState("")
  var [end, setEnd] = useState("")
  var [start1, setStart1] = useState("")
  var [end1, setEnd1] = useState("")
  var [start2, setStart2] = useState("")
  var [end2, setEnd2] = useState("")
  var [start3, setStart3] = useState("")
  var [end3, setEnd3] = useState("")
  var [start4, setStart4] = useState("")
  var [end4, setEnd4] = useState("")
  var [showLines, setShowLines] = useState(false)
  var [displayTime, setDisplayTime] = useState(1000)
  var [lineCount, setLineCount] = useState(3)
  var [check, setCheck] = useState(true)
  var [beat, setBeat] = useState(false);
  var [loop, setLoop] = useState();
  var [triggered, setTriggered] = useState(false);
 
  const startFuncs = [setStart, setStart1, setStart2, setStart3, setStart4]
  const endFuncs = [setEnd, setEnd1, setEnd2, setEnd3, setEnd4]

  const [play] = useSound("/clickSound.wav");
  

  const dotOptions = {
    "dot1" : ["dot2", "dot4", "dot5"], 
    "dot2": ["dot1", "dot3", "dot4", "dot5", "dot6"],
    "dot3": ["dot2", "dot5", "dot6"], 
    "dot4": ["dot1", "dot2", "dot5", "dot7", "dot8"], 
    "dot5": ["dot1", "dot2", "dot3", "dot4", "dot6", "dot7", "dot8", "dot9"], 
    "dot6": ["dot2", "dot3", "dot5", "dot8", "dot9"], 
    "dot7": ["dot4", "dot5", "dot8"], 
    "dot8": ["dot4", "dot5", "dot6", "dot7", "dot9"], 
    "dot9": ["dot5", "dot6", "dot8"]
  }

  useEffect(() => {
    clearInterval(loop);
    setTriggered(false);
  }, [beat]);


  function noOptions(seen, currList) {

    for (let i = 0; i < currList.length; i++) {
      var dot =  currList[i]
      if (!seen.includes(dot)) {
        console.log("left second")
        return dot
      }
    }

    console.log("down to final wire")
    while(seen.includes(dot)) {
      let random = Math.floor(Math.random() * 9) + 1
      dot = "dot" + JSON.stringify(random)
    }
    return dot
  }

  function showPattern() {
    if (beat && !triggered) {
      setLoop(
        setInterval(() => {
          play();
        }, 1000)
      );
      setTriggered(true);
    }
    setCheck(true)
    setShowLines(false)
    let seen = []
    for (let i = 0; i < lineCount; i++) {
      if (i === 0) {
        let random = Math.floor(Math.random() * 9) + 1
        var dot = "dot" + JSON.stringify(random)
      }
      let startFunc = startFuncs[i]
      startFunc(dot)
      seen.push(dot)
      let dotList = dotOptions[dot]
      let max = dotList.length
      let dotIndex = Math.floor(Math.random() * max)
      dot = dotList[dotIndex]
      while (seen.includes(dot)) {
        let dotIndex = Math.floor(Math.random() * max)
        dot = dotList[dotIndex]
        console.log(dot, " is testing....")
        let result = noOptions(seen, dotList)
        if (result !== -1) {
          dot = result
        }
      }
      let endFunc = endFuncs[i]
      endFunc(dot)
    }

    setTimeout(() => {
      setShowLines(true)
      setTimeout(() =>{
        setShowLines(false)
        setCheck(false)
      }, displayTime) 
    }, 500)
    

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
      <DotToDotButtons 
        flashRate={setDisplayTime}
        flashBool={displayTime}
        changeActivity={setLineCount}
        activityBool={lineCount}
        addBeat={setBeat}
        beatBool={beat}

      
      />
      <div id="columnsDotToDot">
        <div className="circRow">
          <div className="circle"><div id="dot1"></div></div>
          <div className="circle"><div id="dot2"></div></div>
          <div className="circle"><div id="dot3"></div></div>
        </div>
        <div className="circRow">
          <div className="circle"><div id="dot4"></div></div>
          <div className="circle"><div id="dot5"></div></div>
          <div className="circle"><div id="dot6"></div></div>
        </div>
        <div className="circRow">
          <div className="circle"><div id="dot7"></div></div>
          <div className="circle"><div id="dot8"></div></div>
          <div className="circle"><div id="dot9"></div></div>
        </div>
      </div>
      {showLines && <div>
        <Xarrow
                  start={start} //can be react ref
                  end={end}
                  showHead={false}
                  lineColor={'silver'}
                  strokeWidth={10}
                  curveness={0}
                  // showXarrow={showLines} //or an id
              />
        <Xarrow
            start={start1} //can be react ref
            end={end1}
            showHead={false}
            lineColor={'silver'}
            strokeWidth={10}
            curveness={0}
            // showXarrow={showLines} //or an id
        />
        <Xarrow
                  start={start2} //can be react ref
                  end={end2}
                  showHead={false}
                  lineColor={'silver'}
                  strokeWidth={10}
                  curveness={0}
                  // showXarrow={showLines} //or an id
              />
        <Xarrow
                  start={start3} //can be react ref
                  end={end3}
                  showHead={false}
                  lineColor={'silver'}
                  strokeWidth={10}
                  curveness={0}
                  // showXarrow={showLines} //or an id
              />
        <Xarrow
                  start={start4} //can be react ref
                  end={end4}
                  showHead={false}
                  lineColor={'silver'}
                  strokeWidth={10}
                  curveness={0}
                  // showXarrow={showLines} //or an id
              />
      </div>}
      
      
      <div className="button_section">
        <button disabled={check} onClick={() => {setShowLines(true); setCheck(true)}}>Check</button>
        <button disabled={!check} onClick={() => showPattern()}>Next</button>
      </div>
    </div>
  );
}
