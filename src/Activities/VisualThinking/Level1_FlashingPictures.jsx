import NextCheckButtons from "./nextCheckButtons";
import FlashingPictureButtons from "./picturesComponent";
import { useEffect, useState } from "react";

export default function Level1_FlashingPictures() {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(1000);
  var [image, setImage] = useState("");
  var [dirPath, setDirPath] = useState("/VisualThinking/FlashingPictures/");

  useEffect(() => {
    setDisplayTime("hidden");
  }, [time, dirPath]);

  useEffect(() => {
    setDisplayTime("hidden")
    setTimeout(() => {
      setDisplayTime("visible")
    setTimeout(() => {
      setDisplayTime("hidden");
    }, time);
    }, 150)
    
  }, [image])


  function flashImage() {
    setDisplayTime("visible")
    setTimeout(() => {
      setDisplayTime("hidden");
    }, time);
  }

  function displayPicture(buttonName, callback) {
    console.log("running displau pic")
    if (buttonName !== "check") {
      let random = Math.floor(Math.random() * 91) + 1;
      setImage(JSON.stringify(random));
      // setTimeout(() => {
      //   callback()
      // }, 250)
      
    } else {
      setDisplayTime("visible");
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
        <img
          className="flashingPicsImage"
          src={dirPath + image + ".jpg"}
          style={{ visibility: displayTime }}
        />
      </div>
      <div>
        <button onClick={() => {displayPicture("check")}}>Check</button>
        <button onClick={() => {displayPicture("next", flashImage)}}>Next</button>
      </div>
    </div>
  );
}
