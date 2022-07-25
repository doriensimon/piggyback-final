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
      setTimeout(() => {
        console.log("inside the delay")
        setDisplayTime(true)
        setTimeout(() => {
          console.log("now remove it. Inside inner")
          setDisplayTime(false);
        }, time);
      }, 500)
     } else {
       setCount(1)
     }
    
    
  }, [image])

  function displayPicture(buttonName) {

    if (buttonName !== "check") {
      let random = Math.floor(Math.random() * 91) + 1;
      setImage(JSON.stringify(random));  
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
        />}
      </div>
      <div>
        <button onClick={() => {displayPicture("check")}}>Check</button>
        <button onClick={() => {displayPicture("next")}}>Next</button>
      </div>
    </div>
  );
}
