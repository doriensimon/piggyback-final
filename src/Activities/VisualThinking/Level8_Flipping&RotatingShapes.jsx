import NextCheckButtons from "../VisualThinking/nextCheckButtons";
import FlashingPictureButtons from "../VisualThinking/picturesComponent";
import ToggleOptions from "../VisualThinking/rememberShapesButtons";
import RotatingFlippingButtons from "./rotatingFlippingButtons";
import { useState, useEffect } from "react";
import useSound from "use-sound";

export default function Level1_FlashingPictures() {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(1000);
  var [image, setImage] = useState("");
  var [level, setLevel] = useState("Level3");
  var [last, setLast] = useState(1000);
  var [triggered, setTriggered] = useState(false);
  var [beat, setBeat] = useState(false);
  var [loop, setLoop] = useState();
  var [imageSize, setImageSize] = useState("auto");
  var [display, setDisplay] = useState(2)
  var [correct, setCorrect] = useState("")
  var [rotation, setRotation] = useState("0deg")
  var [border1Color, setBorder1Color] = useState("white")
  var [border2Color, setBorder2Color] = useState('white')
  var [border3Color, setBorder3Color] = useState("white")
  var [border4Color, setBorder4Color] = useState("white")
  var [orientation, setOrientation] = useState("UpSideDown")

  const [play] = useSound("/clickSound.wav");

  useEffect(() => {
    clearInterval(loop);
    setTriggered(false);
  }, [beat]);



  function chooseOption(option) {
    console.log("this is the: ", option)
    if (option === correct) {
        setDisplay(4)
    } else {
        setDisplay(3)
    }
  }


  function displayPicture(buttonName) {
    setRotation("0deg")
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
      let degree = Math.floor(Math.random() * 4) + 1
      console.log(degree, "this the degree")
      if (degree === 1) {
          setCorrect("1")
          setRotation("90deg")
      } else if (degree === 2) {
          setCorrect("2")
          setRotation("180deg")
      } else if (degree === 3 ) {
          setCorrect("3")
          setRotation("270deg")
      } else {
          setCorrect("4")
      }
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
      if (time === "continuous") {
        setDisplayTime("visible");
      } else {
        setTimeout(() => {
          setDisplay(0)
          setTimeout(() => {
            setDisplay(1)
          }, time);
        }, 200);
      }
      
    } else {
      setDisplay(0)
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
      <RotatingFlippingButtons
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
          {display === 4 && <div id="correctText">Correct!</div>}
          {display === 3 && <div id="incorrectText">Incorrect!</div>}
        {display === 0 && <img
          className="flashingPicsImage"
          src={
            "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
          }
          style={{ height: imageSize, width: "auto", transform: 'rotate(' + rotation + ')' }}
        />}
        {display === 1 && <div>
            <div style={{display: "flex"}}>
                <div onClick={() => chooseOption("1")} style={{backgroundColor: 'white', height: '100px', width: '100px', margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid', borderWidth: '3px', borderColor: border1Color}}><img
                className="flashingPicsImage"
                src={
                    "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
                }
                style={{height: '50px', width: "auto", transform: 'rotate(90deg)' }}
                /></div>
                <div onClick={() => chooseOption("2")} style={{backgroundColor: 'white', height: "100px", width: '100px', margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid', borderWidth: '3px', borderColor: border2Color}}><img
                className="flashingPicsImage"
                src={
                    "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
                }
                style={{height: '50px', width: "auto", transform: 'rotate(180deg)' }}
                /></div>
            </div>
            <div style={{display: "flex"}}>
                <div onClick={() => chooseOption("3")} style={{backgroundColor: 'white', height: "100px", width: '100px', margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid', borderWidth: '3px', borderColor: border3Color}}><img
                className="flashingPicsImage"
                src={
                    "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
                }
                style={{height: '50px', width: "auto", transform: 'rotate(270deg)' }}
                /></div>
                <div onClick={() => chooseOption("4")} style={{backgroundColor: 'white', height: "100px", width: '100px', margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid', borderWidth: '3px', borderColor: border4Color}}><img
                className="flashingPicsImage"
                src={
                    "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
                }
                style={{height: '50px', width: "auto" }}
                /></div>
            </div>
                
        </div>}
      </div>
          <div>
              <button onClick={() => {
                  displayPicture("check")
              }}>Check</button>
              <button onClick={() => {
                  displayPicture("next")
              }}>Next</button>
          </div>
    </div>
  );
}
