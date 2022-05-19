import { useState, useRef, useEffect } from "react";
import NextCheckButtons from "./nextCheckCountLetter";
import useSound from "use-sound";
import CountLetterButtons from "./countLetterButtons";
import { prependOnceListener } from "process";
// import clickSound from "";

export default function Level2_NamingPictures(props) {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(props.flashBool);
  var [row, setRow] = useState(4);
  var [mode, setMode] = useState("JumpingSymbols");
  var [last, setLast] = useState("");
  var [presentation, setPresentation] = useState(props.letterBool);
  var [answer, setAnswer] = useState(null);
  var [display, setDisplay] = useState(false);
  var [finished, setFinished] = useState(false);
  var [counts, setCounts] = useState(0);
  var [next, setNext] = useState(false);
  var [check, setCheck] = useState(false);
  var [interupt, setInterupt] = useState(true);
  var [text, setText] = useState("");
  var [placeholder, setPlaceholder] = useState("letter");
  //   var [interupt, setInterupt] = useState(true);

  // image refs for each individual image
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
  const image21Ref = useRef();
  const image22Ref = useRef();
  const image23Ref = useRef();
  const image24Ref = useRef();
  const image25Ref = useRef();
  const image26Ref = useRef();
  const image27Ref = useRef();
  const image28Ref = useRef();
  const image29Ref = useRef();
  const image30Ref = useRef();
  const image31Ref = useRef();
  const image32Ref = useRef();
  const image33Ref = useRef();
  const image34Ref = useRef();
  const image35Ref = useRef();
  const image36Ref = useRef();
  const image37Ref = useRef();
  const image38Ref = useRef();
  const image39Ref = useRef();
  const image40Ref = useRef();

  const imageRefs = [
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
    image21Ref,
    image22Ref,
    image23Ref,
    image24Ref,
    image25Ref,
    image26Ref,
    image27Ref,
    image28Ref,
    image29Ref,
    image30Ref,
    image31Ref,
    image32Ref,
    image33Ref,
    image34Ref,
    image35Ref,
    image36Ref,
    image37Ref,
    image38Ref,
    image39Ref,
    image40Ref,
  ];

  // images needed for rows and stuff
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
  var [image21, setImage21] = useState("");
  var [image22, setImage22] = useState("");
  var [image23, setImage23] = useState("");
  var [image24, setImage24] = useState("");
  var [image25, setImage25] = useState("");
  var [image26, setImage26] = useState("");
  var [image27, setImage27] = useState("");
  var [image28, setImage28] = useState("");
  var [image29, setImage29] = useState("");
  var [image30, setImage30] = useState("");
  var [image31, setImage31] = useState("");
  var [image32, setImage32] = useState("");
  var [image33, setImage33] = useState("");
  var [image34, setImage34] = useState("");
  var [image35, setImage35] = useState("");
  var [image36, setImage36] = useState("");
  var [image37, setImage37] = useState("");
  var [image38, setImage38] = useState("");
  var [image39, setImage39] = useState("");
  var [image40, setImage40] = useState("");
  var [timer, setTimer] = useState(30);

  const [play] = useSound("/clickSound.wav");

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

  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var imageArray = [];

  async function newImageArray() {
    if (presentation === "1Letter") {
      let randomStart = Math.floor(Math.random() * alphabet.length);
      var answer = alphabet[randomStart];
      console.log(answer);
      setAnswer(answer);
      setText(answer);
      let count = 0;
      for (let i = 1; i < row + 1; i++) {
        for (let j = 0; j < 10; j++) {
          let inputA = Math.floor(Math.random() * 3);
          if (inputA === 0) {
            imageArray.push(answer);
            count++;
          } else {
            imageArray.push(
              alphabet[Math.floor(Math.random() * alphabet.length)]
            );
          }
        }
      }
      setCounts(count);
    } else if (presentation === "2Letter") {
      let random = Math.floor(Math.random() * alphabet.length);
      let random2 = Math.floor(Math.random() * alphabet.length);
      let answerOne = alphabet[random];
      let answerTwo = alphabet[random2];
      var answer = answerOne + answerTwo;
      setAnswer(answerOne + answerTwo);
      setText(answerOne + answerTwo);
      let count = 0;
      for (let i = 0; i < 40; i++) {
        let inputA = Math.floor(Math.random() * 3);
        if (inputA === 0) {
          imageArray.push(answerOne + answerTwo);
          count++;
        } else {
          imageArray.push(
            alphabet[Math.floor(Math.random() * alphabet.length)] +
              alphabet[Math.floor(Math.random() * alphabet.length)]
          );
        }
      }
      setCounts(count);
    } else {
      let random = Math.floor(Math.random() * words.length);
      var answer = words[random];
      setAnswer(answer);
      setText(answer);
      let count = 0;
      for (let i = 0; i < 40; i++) {
        let inputA = Math.floor(Math.random() * 3);
        if (inputA === 0) {
          imageArray.push(answer);
          count++;
        } else {
          imageArray.push(words[Math.floor(Math.random() * words.length)]);
        }
      }
      setCounts(count);
    }
    setImage1(imageArray[0]);
    setImage2(imageArray[1]);
    setImage3(imageArray[2]);
    setImage4(imageArray[3]);
    setImage5(imageArray[4]);
    setImage6(imageArray[5]);
    setImage7(imageArray[6]);
    setImage8(imageArray[7]);
    setImage9(imageArray[8]);
    setImage10(imageArray[9]);
    if (row > 1) {
      setImage11(imageArray[10]);
      setImage12(imageArray[11]);
      setImage13(imageArray[12]);
      setImage14(imageArray[13]);
      setImage15(imageArray[14]);
      setImage16(imageArray[15]);
      setImage17(imageArray[16]);
      setImage18(imageArray[17]);
      setImage19(imageArray[18]);
      setImage20(imageArray[19]);
    }
    if (row > 2) {
      setImage21(imageArray[20]);
      setImage22(imageArray[21]);
      setImage23(imageArray[22]);
      setImage24(imageArray[23]);
      setImage25(imageArray[24]);
      setImage26(imageArray[25]);
      setImage27(imageArray[26]);
      setImage28(imageArray[27]);
      setImage29(imageArray[28]);
      setImage30(imageArray[29]);
    }
    if (row > 3) {
      setImage31(imageArray[30]);
      setImage32(imageArray[31]);
      setImage33(imageArray[32]);
      setImage34(imageArray[33]);
      setImage35(imageArray[34]);
      setImage36(imageArray[35]);
      setImage37(imageArray[36]);
      setImage38(imageArray[37]);
      setImage39(imageArray[38]);
      setImage40(imageArray[39]);
    }
    console.log(answer);
    return answer;
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

  function makeVisible(state) {
    for (let i = 0; i < row * 10; i++) {
      let ref = imageRefs[i];
      ref.current.style.visibility = state;
    }
  }

  var counter = 0;
  var answers = 0;
  function handleFlash(reference, pause) {
    setTimeout(() => {
      reference.current.style.visibility = "visible";
    }, pause * time);
    setTimeout(() => {
      reference.current.style.visibility = "hidden";
    }, (pause + 1) * time);
  }

  function jumpSymbols(answer, doneNow) {
    // makeVisible("hidden");
    if (doneNow) {
      makeVisible("hidden");
      setCounts(answers);
      setNext(false);
      setCheck(false);
    } else {
      var ref = imageRefs[counter];
      console.log();
      setTimeout(() => {
        console.log("visible");
        ref.current.style.visibility = "visible";
        console.log(ref.current.childNodes[0].data);
        counter++;
        console.log(counter);
        if (current30 < timer && counter < 40) {
          if (ref.current.childNodes[0].data === answer) {
            answers++;
          }
          jumpSymbols(answer, false);
        } else {
          console.log("now we stopping this");
          jumpSymbols(answer, true);
        }
      }, time + 150);
      setTimeout(() => {
        makeVisible("hidden");
      }, time);
    }
  }

  async function displayPicture(buttonName) {
    setNext(true);
    setInterupt(true);
    setDisplay(true);
    setFinished(false);
    setCheck(true);
    makeVisible("hidden");
    if (mode === "ToABeat") {
      setTimeout(() => {
        var soundCounter = 1;
        var soundInterval = setInterval(() => {
          if (soundCounter === 10 * row) {
            clearInterval(soundInterval);
          }
          play();
          soundCounter += 1;
        }, 1000);
      }, 500);
    }
    if (buttonName === "next" && last === "check") {
      makeVisible("hidden");
    }
    if (mode == "JumpingSymbols" && buttonName != "check") {
      let ansKey = await newImageArray();
      console.log(ansKey);
      setTimeout(() => {
        second30Timer();
        setInterupt(false);
        setDisplay(false);

        jumpSymbols(ansKey, false);
      }, 1000);
    } else if (mode == "JumpingSymbols" && buttonName === "check") {
      makeVisible("visible");
      setLast("check");
    } else {
      if (buttonName !== "check") {
        await newImageArray();

        setTimeout(() => {
          makeVisible("visible");
        }, 1000);
      } else {
        setDisplayTime("visible");
        setLast("check");
      }
    }
  }

  useEffect(() => {
    console.log("inside the useEffect");
    makeVisible("hidden");
    if (presentation === "1Letter") {
      setPlaceholder("letter");
    } else if (presentation === "2Letter") {
      setPlaceholder("letters");
    } else {
      setPlaceholder("word");
    }
  }, [row, presentation]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CountLetterButtons
        flashRate={setTime}
        flashBool={time}
        hiddenLetter={setPresentation}
        letterBool={presentation}
        changeLevel={props.changeLevel}
        levelBool={props.levelBool}
        changeDuration={setTimer}
        durationBool={timer}
        durationDisplay={false}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div>
          {finished && (
            <div className="startText">
              The {placeholder}{" "}
              {<p style={{ display: "inline", color: "white" }}>{answer}</p>}{" "}
              appeared{" "}
              {<p style={{ display: "inline", color: "white" }}>{counts}</p>}{" "}
              times
            </div>
          )}
          {display && (
            <p className="startText">
              Count how many times you see the {placeholder}...
            </p>
          )}
          {interupt && (
            <p id="countLetText" style={{ textAlign: "center" }}>
              {text}
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p
              ref={image1Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image1}
            </p>
            <p
              ref={image2Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image2}
            </p>
            <p
              ref={image3Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image3}
            </p>
            <p
              ref={image4Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image4}
            </p>
            <p
              ref={image5Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image5}
            </p>
            <p
              ref={image6Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image6}
            </p>
            <p
              ref={image7Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image7}
            </p>
            <p
              ref={image8Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image8}
            </p>
            <p
              ref={image9Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image9}
            </p>
            <p
              ref={image10Ref}
              className="namingNum"
              style={{ visibility: displayTime }}
            >
              {image10}
            </p>
          </div>
          {row >= 2 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p
                ref={image11Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image11}
              </p>
              <p
                ref={image12Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image12}
              </p>
              <p
                ref={image13Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image13}
              </p>
              <p
                ref={image14Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image14}
              </p>
              <p
                ref={image15Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image15}
              </p>
              <p
                ref={image16Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image16}
              </p>
              <p
                ref={image17Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image17}
              </p>
              <p
                ref={image18Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image18}
              </p>
              <p
                ref={image19Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image19}
              </p>
              <p
                ref={image20Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image20}
              </p>
            </div>
          ) : (
            ""
          )}

          {row >= 3 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p
                ref={image21Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image21}
              </p>
              <p
                ref={image22Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image22}
              </p>
              <p
                ref={image23Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image23}
              </p>
              <p
                ref={image24Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image24}
              </p>
              <p
                ref={image25Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image25}
              </p>
              <p
                ref={image26Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image26}
              </p>
              <p
                ref={image27Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image27}
              </p>
              <p
                ref={image28Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image28}
              </p>
              <p
                ref={image29Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image29}
              </p>
              <p
                ref={image30Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image30}
              </p>
            </div>
          ) : (
            ""
          )}
          {row === 4 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p
                ref={image31Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image31}
              </p>
              <p
                ref={image32Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image32}
              </p>
              <p
                ref={image33Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image33}
              </p>
              <p
                ref={image34Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image34}
              </p>
              <p
                ref={image35Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image35}
              </p>
              <p
                ref={image36Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image36}
              </p>
              <p
                ref={image37Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image37}
              </p>
              <p
                ref={image38Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image38}
              </p>
              <p
                ref={image39Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image39}
              </p>
              <p
                ref={image40Ref}
                className="namingNum"
                style={{ visibility: displayTime }}
              >
                {image40}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <NextCheckButtons
        displayFunc={displayPicture}
        displayAnswer={setFinished}
        disableCheck={check}
        disableNext={next}
      />
    </div>
  );
}
