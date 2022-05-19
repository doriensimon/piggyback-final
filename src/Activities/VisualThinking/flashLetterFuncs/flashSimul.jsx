import NextCheckButtons from "../nextCheckButtons";
import FlashingButtons from "../flashingButtons";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function Level1_FlashingPictures(props) {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(500);
  var [image, setImage] = useState("");
  var [number, setNumber] = useState(3);
  var [triggered, setTriggered] = useState(false);
  var [beat, setBeat] = useState(false);
  var [loop, setLoop] = useState();
  var actFunc = props.newActivity;

  useEffect(() => {
    setDisplayTime("hidden");
    clearInterval(loop);
    setTriggered(false);
  }, [time, beat]);

  const alph = "abcdefghijklmnopqrstuvwxyz";
  const [play] = useSound("/clickSound.wav");

  function createRandString() {
    let temp = "";
    for (let i = 0; i < number; i++) {
      let random = Math.floor(Math.random() * 26);
      let letter = alph[random];
      temp += letter;
    }
    return temp;
  }

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
    if (buttonName !== "check") {
      let numString = createRandString();
      setImage(numString);

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
      <FlashingButtons
        changeActivity={actFunc}
        flashRate={setTime}
        flashBool={time}
        Number={setNumber}
        numberBool={number}
        addBeat={setBeat}
        beatBool={beat}
        activityBool={"Simultaneous"}
        level="Letters"
      />
      <div
        id="whitetext"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          visibility: displayTime,
        }}
      >
        {image}
      </div>
      <NextCheckButtons displayFunc={displayPicture} />
    </div>
  );
}
