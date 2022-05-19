import FlashingPictureButtons from "./Othera&oComponents";
import { useState, useRef, useEffect } from "react";
import { other1 } from "./wordList";
import useSound from "use-sound";

export default function Level1_FlashingPictures(props) {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(1000);
  var [rawTextArray, setRawTextArray] = useState(other1);
  var [wordList, setWordList] = useState("RW1");
  var [size, setSize] = useState("36pt");
  var [mode, setMode] = useState("normal");
  var [sound, setSound] = useState(false);
  var [testTime, setTestTime] = useState(0);
  var [intervalId, setIntervalId] = useState(0);
  var [number, setNumber] = useState(2);
  var [seqWord, setSeqWord] = useState("");
  var [fontCase, setFontCase] = useState("lower");
  var [disable, setDisable] = useState(true);
  var [running, setRunning] = useState(false);
  var chart = [];
  var place = 0;
  var sequenceCount = 0;

  const [play] = useSound("/clickSound.wav");

  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4Ref = useRef();
  const image5Ref = useRef();
  const image6Ref = useRef();
  const image7Ref = useRef();
  const image8Ref = useRef();
  const image9Ref = useRef();
  const image10Ref = useRef();
  const image11Ref = useRef();
  const image12Ref = useRef();
  const image13Ref = useRef();
  const image14Ref = useRef();
  const image15Ref = useRef();
  const image16Ref = useRef();
  const image17Ref = useRef();
  const image18Ref = useRef();
  const image19Ref = useRef();
  const image20Ref = useRef();

  const myRefs = [
    image1Ref,
    image2Ref,
    image3Ref,
    image4Ref,
    image5Ref,
    image6Ref,
    image7Ref,
    image8Ref,
    image9Ref,
    image10Ref,
    image11Ref,
    image12Ref,
    image13Ref,
    image14Ref,
    image15Ref,
    image16Ref,
    image17Ref,
    image18Ref,
    image19Ref,
    image20Ref,
  ];

  var [image1, setImage1] = useState("");
  var [image2, setImage2] = useState("");
  var [image3, setImage3] = useState("");
  var [image4, setImage4] = useState("");
  var [image5, setImage5] = useState("");
  var [image6, setImage6] = useState("");
  var [image7, setImage7] = useState("");
  var [image8, setImage8] = useState("");
  var [image9, setImage9] = useState("");
  var [image10, setImage10] = useState("");
  var [image11, setImage11] = useState("");
  var [image12, setImage12] = useState("");
  var [image13, setImage13] = useState("");
  var [image14, setImage14] = useState("");
  var [image15, setImage15] = useState("");
  var [image16, setImage16] = useState("");
  var [image17, setImage17] = useState("");
  var [image18, setImage18] = useState("");
  var [image19, setImage19] = useState("");
  var [image20, setImage20] = useState("");

  useEffect(() => {
    setDisplayTime("hidden");
    invisible();
    setDisable(true);
    stopNoise();
  }, [time, wordList, size, mode, number, fontCase]);

  useEffect(() => {
    stopNoise();
  }, [props.change]);

  function playSound() {
    let count = 0;
    setTimeout(() => {
      var test = setInterval(() => {
        setRunning(true);
        play();
        count++;
        if (count === 20) {
          setRunning(false);
          stopNoise();
        }
      }, time);
    }, 500);
  }

  function stopNoise() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
      clearInterval(i);
    }
    for (var i = 0; i < 20; i++) {
      myRefs[i].current.style.color = "white";
    }
  }

  function clearOut(index) {
    let test = setTimeout(() => {
      myRefs[index].current.style.color = "white";
    }, time * 0.5);
    setTestTime(test);
  }

  function triggerGreen() {
    var color = setInterval(() => {
      myRefs[place].current.style.color = "greenyellow";
      setRunning(true);
      clearOut(place);
      place++;
      if (place === 20) {
        setRunning(false);
        clearInterval(color);
      }
    }, time);
    setIntervalId(color);
  }

  function fillChart() {
    var temp = [];
    // createWordList();
    for (let i = 0; i < 20; i++) {
      let random = Math.floor(Math.random() * rawTextArray.length);
      chart.push(rawTextArray[random]);
    }
    setImage1(chart[0]);
    setImage2(chart[1]);
    setImage3(chart[2]);
    setImage4(chart[3]);
    setImage5(chart[4]);
    setImage6(chart[5]);
    setImage7(chart[6]);
    setImage8(chart[7]);
    setImage9(chart[8]);
    setImage10(chart[9]);
    setImage11(chart[10]);
    setImage12(chart[11]);
    setImage13(chart[12]);
    setImage14(chart[13]);
    setImage15(chart[14]);
    setImage16(chart[15]);
    setImage17(chart[16]);
    setImage18(chart[17]);
    setImage19(chart[18]);
    setImage20(chart[19]);
  }

  function handleWordFlashing(command) {
    if (number === 2) {
      if (command !== "check") {
        setImage12(
          rawTextArray[Math.floor(Math.random() * rawTextArray.length)]
        );
        setImage13(
          rawTextArray[Math.floor(Math.random() * rawTextArray.length)]
        );
        setTimeout(() => {
          image12Ref.current.style.visibility = "hidden";
          image13Ref.current.style.visibility = "hidden";
          setDisable(false);
        }, time);
      } else {
        setDisable(true);
      }

      image12Ref.current.style.visibility = "visible";
      image13Ref.current.style.visibility = "visible";
    } else {
      if (command !== "check") {
        setImage12(
          rawTextArray[Math.floor(Math.random() * rawTextArray.length)]
        );
        setImage13(
          rawTextArray[Math.floor(Math.random() * rawTextArray.length)]
        );
        setImage14(
          rawTextArray[Math.floor(Math.random() * rawTextArray.length)]
        );
        setTimeout(() => {
          image12Ref.current.style.visibility = "hidden";
          image13Ref.current.style.visibility = "hidden";
          image14Ref.current.style.visibility = "hidden";
          setDisable(false);
        }, time);
      } else {
        setDisable(true);
      }

      image12Ref.current.style.visibility = "visible";
      image13Ref.current.style.visibility = "visible";
      image14Ref.current.style.visibility = "visible";
    }
  }

  function handleSequence(command) {
    if (command !== "check") {
      let word = rawTextArray[Math.floor(Math.random() * rawTextArray.length)];
      setImage13(word);
      if (sequenceCount === 0) {
        setImage12(word);
      } else if (sequenceCount === 2) {
        setImage14(word);
      } else {
        setSeqWord(word);
      }
      image13Ref.current.style.visibility = "visible";
      setTimeout(() => {
        image13Ref.current.style.visibility = "hidden";
        setTimeout(() => {
          sequenceCount++;
          if (sequenceCount < number) {
            handleSequence();
          } else {
            setDisable(false);
          }
        }, 250);
      }, time);
    } else {
      setDisable(false);
      setImage13(seqWord);
      image12Ref.current.style.visibility = "visible";
      image13Ref.current.style.visibility = "visible";
      if (number === 3) {
        image14Ref.current.style.visibility = "visible";
      }
    }
  }

  function displayPicture(buttonName) {
    convertCase();
    if (mode !== "flashing" && mode !== "sequence") {
      fillChart();
      if (mode === "naming") {
        if (running) {
          var highestTimeoutId = setInterval(";");
          for (var i = 0; i < highestTimeoutId; i++) {
            clearInterval(i);
          }
          for (var i = 0; i < 20; i++) {
            myRefs[i].current.style.color = "white";
          }
        }
        setTimeout(() => {
          triggerGreen();
        }, 500);
      }
      setDisplayTime("visible");

      setTimeout(() => {
        if (mode === "beat") {
          if (running) {
            stopNoise();
          }
          playSound();
        }
      }, 500);
    } else {
      invisible();
      if (mode === "flashing") {
        setDisable(true);
        if (buttonName === "check") {
          handleWordFlashing(buttonName);
        } else {
          handleWordFlashing("next");
        }
      }
      if (mode === "sequence") {
        setDisable(true);
        if (buttonName === "check") {
          handleSequence("check");
        } else {
          handleSequence("next");
        }
      }
    }
  }

  function invisible() {
    for (let i = 0; i < myRefs.length; i++) {
      myRefs[i].current.style.visibility = "hidden";
    }
  }

  function convertCase() {
    if (fontCase === "lower") {
      for (let i = 0; i < myRefs.length; i++) {
        myRefs[i].current.style.textTransform = "lowercase";
      }
    } else if (fontCase === "upper") {
      for (let i = 0; i < myRefs.length; i++) {
        myRefs[i].current.style.textTransform = "uppercase";
      }
    } else {
      for (let i = 0; i < myRefs.length; i++) {
        if (Math.random() < 0.5) {
          myRefs[i].current.style.textTransform = "lowercase";
        } else {
          myRefs[i].current.style.textTransform = "uppercase";
        }
      }
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
      <FlashingPictureButtons
        flashRate={setTime}
        flashBool={time}
        hiddenLetterDisplay="block"
        changeList={setWordList}
        wordList={wordList}
        size={size}
        changeLevel={setSize}
        changeMode={setMode}
        mode={mode}
        changeSound={setSound}
        number={number}
        changeNumber={setNumber}
        changeArray={setRawTextArray}
        fontBool={fontCase}
        changeFont={setFontCase}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div style={{ fontSize: size }} className="whiteStyle">
          <div>
            <div
              ref={image1Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image1 + " "}
            </div>
            <div
              ref={image2Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image2 + " "}
            </div>
            <div
              ref={image3Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image3 + " "}
            </div>
            <div
              ref={image4Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image4 + " "}
            </div>
            <div
              ref={image5Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image5 + " "}
            </div>
          </div>
          <div>
            <div
              ref={image6Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image6 + " "}
            </div>
            <div
              ref={image7Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image7 + " "}
            </div>
            <div
              ref={image8Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image8 + " "}
            </div>
            <div
              ref={image9Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image9 + " "}
            </div>
            <div
              ref={image10Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image10 + " "}
            </div>
          </div>
          <div>
            <div
              ref={image11Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image11 + " "}
            </div>
            <div
              ref={image12Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image12 + " "}
            </div>
            <div
              ref={image13Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image13 + " "}
            </div>
            <div
              ref={image14Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image14 + " "}
            </div>
            <div
              ref={image15Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image15 + " "}
            </div>
          </div>
          <div>
            <div
              ref={image16Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image16 + " "}
            </div>
            <div
              ref={image17Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image17 + " "}
            </div>
            <div
              ref={image18Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image18 + " "}
            </div>
            <div
              ref={image19Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image19 + " "}
            </div>
            <div
              ref={image20Ref}
              style={{ display: "inline", visibility: displayTime }}
            >
              {image20 + " "}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          disabled={(mode !== "flashing" && mode !== "sequence") || disable}
          onClick={() => {
            displayPicture("check");
          }}
        >
          Check
        </button>
        <button
          onClick={() => {
            displayPicture("next");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
