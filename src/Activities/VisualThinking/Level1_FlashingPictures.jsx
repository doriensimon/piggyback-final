import NextCheckButtons from "./nextCheckButtons";
import FlashingPictureButtons from "./picturesComponent";
import { useEffect, useState } from "react";

export default function Level1_FlashingPictures() {
  var [displayTime, setDisplayTime] = useState(false);
  var [time, setTime] = useState(1000);
  var [image, setImage] = useState("");
  var [dirPath, setDirPath] = useState("/VisualThinking/FlashingPictures/");
  var [count, setCount] = useState(0)

  useEffect(() => {
    setDisplayTime(false);
  }, [time, dirPath]);

  useEffect(() => {
     if (count === 1) {
      setDisplayTime(false)
      setTimeout(() => {
        setDisplayTime(true)
        setTimeout(() => {
          setDisplayTime(false);
        }, time);
      }, 150)
     } else {
       setCount(1)
     }
    
    
  }, [image])


  function flashImage() {
    setDisplayTime(true)
    setTimeout(() => {
      setDisplayTime(false);
    }, time);
  }

  function displayPicture(buttonName, callback) {
    console.log("running displau pic")
    if (buttonName !== "check") {
      let random = Math.floor(Math.random() * 91) + 1;
      setImage(JSON.stringify(random));
      console.log("I'm here")
      // setTimeout(() => {
      //   callback()
      // }, 250)
      
    } else {
      setDisplayTime(true);
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
        hiddenLetter={setDirPath}
        letterBool={dirPath}
        hiddenLetterDisplay="block"
        levelDisplay="none"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {displayTime && <img
          className="flashingPicsImage"
          src={dirPath + image + ".jpg"}
          // style={{ visibility: displayTime }}
        />}
      </div>
      <div>
        <button onClick={() => {displayPicture("check")}}>Check</button>
        <button onClick={() => {displayPicture("next", flashImage)}}>Next</button>
      </div>
    </div>
  );
}
