import NextCheckButtons from "./nextCheckButtons";
import CodedMovementButtons from "./codedMovementButtons";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function Level1_FlashingPictures() {
  var [displayTime, setDisplayTime] = useState("none");
  var [displayTime1, setDisplayTime1] = useState("none");
  var [displayTime2, setDisplayTime2] = useState("none");
  var [time, setTime] = useState(1000);
  var [image, setImage] = useState("");
  var [image1, setImage1] = useState("");
  var [image2, setImage2] = useState("");
  var [dirPath, setDirPath] = useState("/VisualThinking/CodedMovement/");
  var [flash, setFlash] = useState(false);
  var [row, setRow] = useState(1);
  var [mode, setMode] = useState("NoBeat");
  var [triggered, setTriggered] = useState(false);
  var [loop, setLoop] = useState();
  var [disableCheck, setDisableCheck] = useState(true);

  var imageArray = [];

  const [play] = useSound("/clickSound.wav");

  function display(state) {
    setDisplayTime(state);
    if (row > 1) {
      setDisplayTime1(state);
    }
    if (row > 2) {
      setDisplayTime2(state);
    }
  }

  async function newImageArray() {
    display("none");
    for (let i = 1; i < row + 1; i++) {
      let random = Math.floor(Math.random() * 3) + 1;
      imageArray.push(JSON.stringify(random));
    }
    setImage(imageArray[0]);
    setImage1(imageArray[1]);
    setImage2(imageArray[2]);
    return;
  }

  useEffect(() => {
    setDisplayTime("none");
    setDisplayTime1("none");
    setDisplayTime2("none");
    clearInterval(loop);
    setTriggered(false);
    if (flash) {
      setDisableCheck(false);
    } else {
      setDisableCheck(true);
    }
  }, [flash, mode, row]);

  async function displayPicture(buttonName) {
    if (mode === "Beat" && !triggered) {
      setLoop(
        setInterval(() => {
          play();
        }, 1000)
      );
      setTriggered(true);
    }

    if (flash) {
      if (buttonName !== "check") {
        await newImageArray();
        setTimeout(() => {
          display("block");
        }, 200);
        setTimeout(() => {
          display("none");
        }, time);
      } else {
        display("block");
      }
    } else {
      await newImageArray();
      setTimeout(() => {
        display("block");
      }, 200);
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
      <CodedMovementButtons
        flash={setFlash}
        flashBool={flash}
        number={setRow}
        numberBool={row}
        mode={setMode}
        modeBool={mode}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
          width: "80%",
        }}
      >
        <img
          className="flashingPicsImage"
          src={dirPath + image + ".png"}
          style={{ display: displayTime, height: "200px", width: "200px" }}
        />
        <img
          className="flashingPicsImage"
          src={dirPath + image1 + ".png"}
          style={{ display: displayTime1, height: "200px", width: "200px" }}
        />
        <img
          className="flashingPicsImage"
          src={dirPath + image2 + ".png"}
          style={{ display: displayTime2, height: "200px", width: "200px" }}
        />
      </div>
      <NextCheckButtons displayFunc={displayPicture} check={disableCheck} />
    </div>
  );
}
