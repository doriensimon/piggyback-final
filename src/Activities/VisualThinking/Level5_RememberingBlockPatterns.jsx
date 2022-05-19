import { useState } from "react";
import NextCheckButtons from "./nextCheckButtons";
import BlockPatternsButtons from "./blockPatternsButtons";

export default function Level5_RememberingBlockPatterns() {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(1000);
  var [image, setImage] = useState("");

  function displayPicture(buttonName) {
    if (buttonName !== "check") {
      let random = Math.floor(Math.random() * 80) + 1;
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
      <BlockPatternsButtons flashRate={setTime} flashBool={time} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40%",
          width: "50%",
          margin: "auto",
          backgroundColor: "white",
        }}
      >
        <img
          src={"/VisualThinking/RememberingBlockPatterns/" + image + ".jpg"}
          style={{ visibility: displayTime }}
        />
      </div>
      <NextCheckButtons displayFunc={displayPicture} />
    </div>
  );
}
