import NextCheckButtons from "../VisualThinking/nextCheckButtons";
import FlashingPictureButtons from "../VisualThinking/picturesComponent";
import ToggleOptions from "../VisualThinking/rememberShapesButtons";
import { useState, useEffect } from "react";
import useSound from "use-sound";

export default function Level1_FlashingPictures() {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(1000);
  var [image, setImage] = useState("");
  var [level, setLevel] = useState("Level1");
  var [last, setLast] = useState(1000);
  var [triggered, setTriggered] = useState(false);
  var [beat, setBeat] = useState(false);
  var [loop, setLoop] = useState();
  var [imageSize, setImageSize] = useState("auto");

  const [play] = useSound("/clickSound.wav");

  useEffect(() => {
    clearInterval(loop);
    setTriggered(false);
  }, [beat]);

  function displayPicture(buttonName) {
    if (beat && !triggered) {
      setLoop(
        setInterval(() => {
          play();
        }, 1000)
      );
      setTriggered(true);
    }

    setDisplayTime("hidden");
    let max;
    if (buttonName !== "check") {
      if (level === "Level1") {
        max = 38;
      }
      if (level == "Level2") {
        max = 60;
      }
      if (level == "Level3") {
        max = 29;
      }
      if (level == "Level4") {
        max = 57;
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
        setTimeout(() => {
          setDisplayTime("hidden");
        }, time);
      }, 600);
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
      <ToggleOptions
        flashRate={setTime}
        flashBool={time}
        changeLevel={setLevel}
        levelBool={level}
        useBeat={setBeat}
        beatBool={beat}
        imageBool={imageSize}
        changeImage={setImageSize}
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
          src={
            "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
          }
          style={{ visibility: displayTime, height: imageSize, width: "auto" }}
        />
      </div>
      <NextCheckButtons displayFunc={displayPicture} displayCheck="inline" />
    </div>
  );
}
