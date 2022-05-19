import NextCheckButtons from "../VisualThinking/nextCheckButtons";
import FlashingPictureButtons from "../VisualThinking/picturesComponent";
import { useState } from "react";

export default function Level1_FlashingPictures() {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(1000);
  var [image, setImage] = useState("");
  var [level, setLevel] = useState("Level1");
  var [last, setLast] = useState(1000);

  function displayPicture(buttonName) {
    setDisplayTime("hidden");
    let max = 6;
    if (level == "level3") {
      max = 7;
    }
    let random = Math.floor(Math.random() * max) + 1;
    if (random == last) {
      if (random > 0) {
        random -= 1;
      }
      if (random == 0) {
        random += 1;
      }
    }
    setLast(random);
    setImage(JSON.stringify(random));
    setTimeout(() => {
      setDisplayTime("visible");
    }, 400);
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
        FlashRateDisplay="none"
        hiddenLetterDisplay="none"
        changeLevel={setLevel}
        levelBool={level}
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
          src={
            "/TurningOnYourBrain/TOYBL2EyeTracing/" +
            level +
            "/" +
            image +
            ".jpg"
          }
          style={{ visibility: displayTime }}
        />
      </div>
      <NextCheckButtons displayFunc={displayPicture} displayCheck="none" />
    </div>
  );
}
