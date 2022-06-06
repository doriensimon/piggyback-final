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
  var [transform1, setTransform1] = useState("")
  var [transform2, setTransform2] = useState("")
  var [transform3, setTransform3] = useState("")
  var [transform4, setTransform4] = useState("")
  var [move, setMove] = useState("rotate(90deg)")
  var [choice, setChoice] = useState(false)
  var [correctCount, setCorrectCount] = useState(0)
  var [totalCount, setTotalCount] = useState(1)

  const rotateList = ["rotate(90deg)", "rotate(180deg)", "scaleX(-1)", "scaleY(-1)"]


  const [play] = useSound("/clickSound.wav");

  useEffect(() => {
    clearInterval(loop);
    setTriggered(false);
  }, [beat]);

  useEffect(() => {
    setDisplay(2)
  }, [time, move, level, choice])



  function chooseOption(option) {
    console.log(totalCount, "this is the count")
    console.log(correct, option)
    if (JSON.parse(option) === JSON.parse(correct)) {
        setDisplay(4)
        setTotalCount(totalCount + 1)
        setCorrectCount(correctCount + 1)
    } else {
        setDisplay(3)
        setTotalCount(totalCount + 1)
    }
    if (totalCount === 5) {
      setDisplay(5)
      setTotalCount(0)
    }
  }


  function displayPicture(buttonName) {
    setDisplayTime("hidden");
    setDisplay(2)
    if (totalCount === 0) {
      setCorrectCount(0)
    }
    setRotation("none")

    
    let max;
    if (buttonName !== "check") {

      if (level === "Level1") {
        max = 38;
      }
      if (level == "Level2") {
        max = 60;
      }
      if (level == "Level3") {
        max = 28;
      }
      if (level == "Level4") {
        max = 57;
      }
      let random = Math.floor(Math.random() * max) + 1;
      setLast(random);
      setImage(JSON.stringify(random));
      console.log(random," this is the broken image")

      if (!choice) {
        setTimeout(() => {
          setDisplay(0)
          setTimeout(() => {
            setDisplay(2)
          }, time);
        }, 200);
      } else {

        rotateList.sort(() => Math.random() - 0.5)
        setCorrect(JSON.stringify(rotateList.indexOf(move)))
        setTransform1(rotateList[0])
        setTransform2(rotateList[1])
        setTransform3(rotateList[2])
        setTransform4(rotateList[3])
        setTimeout(() => {
          setDisplay(0)
          setTimeout(() => {
            setDisplay(1)
          }, time);
        }, 200);
      }

      
    } else {
      
        setRotation(move)
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
        changeLevel={setMove}
        levelBool={move}
        changeChoice={setChoice}
        choiceBool={choice}
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
        {display === 5 && <div className="whiteTextStyle">You scored {correctCount} out of 5 Good Job!!</div>}
          {display === 4 && <div id="correctText">Correct!</div>}
          {display === 3 && <div id="incorrectText">Incorrect!</div>}
        {display === 0 && <img
          className="flashingPicsImage"
          src={
            "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
          }
          style={{ height: imageSize, width: "auto", transform: rotation}}
        />}
        {display === 1 && <div>
            <div style={{display: "flex"}}>
                <div onClick={() => chooseOption("0")} style={{backgroundColor: 'white', height: '100px', width: '100px', margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid', borderWidth: '3px', borderColor: border1Color}}><img
                className="flashingPicsImage"
                src={
                    "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
                }
                style={{height: '50px', width: "auto", transform: transform1  }}
                /></div>
                <div onClick={() => chooseOption("1")} style={{backgroundColor: 'white', height: "100px", width: '100px', margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid', borderWidth: '3px', borderColor: border2Color}}><img
                className="flashingPicsImage"
                src={
                    "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
                }
                style={{height: '50px', width: "auto", transform: transform2 }}
                /></div>
            </div>
            <div style={{display: "flex"}}>
                <div onClick={() => chooseOption("2")} style={{backgroundColor: 'white', height: "100px", width: '100px', margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid', borderWidth: '3px', borderColor: border3Color}}><img
                className="flashingPicsImage"
                src={
                    "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
                }
                style={{height: '50px', width: "auto", transform: transform3 }}
                /></div>
                <div onClick={() => chooseOption("3")} style={{backgroundColor: 'white', height: "100px", width: '100px', margin: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid', borderWidth: '3px', borderColor: border4Color}}><img
                className="flashingPicsImage"
                src={
                    "/VisualThinking/RememberingShapes/" + level + "/" + image + ".jpg"
                }
                style={{height: '50px', width: "auto", transform: transform4 }}
                /></div>
            </div>
                
        </div>}
      </div>
          <div>
              <button disabled={(display === 0) || (choice && (display === 0 || display === 1))} onClick={() => {
                  displayPicture("check")
              }}>Check</button>
              <button onClick={() => {
                  displayPicture("next")
              }}>Next</button>
          </div>
    </div>
  );
}
