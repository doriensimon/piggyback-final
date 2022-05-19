import NextCheckButtons from "../VisualThinking/nextCheckButtons";
import FlashingPictureButtons from "./NamingPicturesButtons";
import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
// import clickSound from "";

export default function Level2_NamingPictures() {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [time, setTime] = useState(1000);
  var [row, setRow] = useState(1);
  var [mode, setMode] = useState("Normal");
  var [last, setLast] = useState("");

  // image refs for each individual image
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4Ref = useRef();
  const image5Ref = useRef();
  const image6Ref = useRef();
  const image7Ref = useRef();
  const image8Ref = useRef();
  const image9Ref = useRef();
  const image10Ref = useRef();
  const image11Ref = useRef();
  const image12Ref = useRef();
  const image13Ref = useRef();
  const image14Ref = useRef();
  const image15Ref = useRef();
  const image16Ref = useRef();
  const image17Ref = useRef();
  const image18Ref = useRef();
  const image19Ref = useRef();
  const image20Ref = useRef();

  const imageRefs = [
    image1Ref,
    image2Ref,
    image3Ref,
    image4Ref,
    image5Ref,
    image6Ref,
    image7Ref,
    image8Ref,
    image9Ref,
    image10Ref,
    image11Ref,
    image12Ref,
    image13Ref,
    image14Ref,
    image15Ref,
    image16Ref,
    image17Ref,
    image18Ref,
    image19Ref,
    image20Ref,
  ];

  // images needed for rows and stuff
  var [image1, setImage1] = useState("");
  var [image2, setImage2] = useState("");
  var [image3, setImage3] = useState("");
  var [image4, setImage4] = useState("");
  var [image5, setImage5] = useState("");
  var [image6, setImage6] = useState("");
  var [image7, setImage7] = useState("");
  var [image8, setImage8] = useState("");
  var [image9, setImage9] = useState("");
  var [image10, setImage10] = useState("");
  var [image11, setImage11] = useState("");
  var [image12, setImage12] = useState("");
  var [image13, setImage13] = useState("");
  var [image14, setImage14] = useState("");
  var [image15, setImage15] = useState("");
  var [image16, setImage16] = useState("");
  var [image17, setImage17] = useState("");
  var [image18, setImage18] = useState("");
  var [image19, setImage19] = useState("");
  var [image20, setImage20] = useState("");

  const [play] = useSound("/clickSound.wav");

  var imageArray = [];
  async function newImageArray() {
    for (let i = 1; i < row + 1; i++) {
      for (let j = 0; j < 5; j++) {
        let random = Math.floor(Math.random() * 25) + 1;
        imageArray.push(JSON.stringify(random));
      }
    }
    setImage1(imageArray[0]);
    setImage2(imageArray[1]);
    setImage3(imageArray[2]);
    setImage4(imageArray[3]);
    setImage5(imageArray[4]);
    if (row > 1) {
      setImage6(imageArray[5]);
      setImage7(imageArray[6]);
      setImage8(imageArray[7]);
      setImage9(imageArray[8]);
      setImage10(imageArray[9]);
    }
    if (row > 2) {
      setImage11(imageArray[10]);
      setImage12(imageArray[11]);
      setImage13(imageArray[12]);
      setImage14(imageArray[13]);
      setImage15(imageArray[14]);
    }
    if (row > 3) {
      setImage16(imageArray[15]);
      setImage17(imageArray[16]);
      setImage18(imageArray[17]);
      setImage19(imageArray[18]);
      setImage20(imageArray[19]);
    }
    return;
  }

  function makeVisible(state) {
    for (let i = 0; i < row * 5; i++) {
      let ref = imageRefs[i];
      ref.current.style.visibility = state;
    }
  }

  function handleFlash(reference, pause) {
    // if (pause == 0) {
    //   setTimeout(() => {
    //     reference.current.style.visibility = "visible";
    //   }, pause * time + 300);
    // } else {
    setTimeout(() => {
      reference.current.style.visibility = "visible";
    }, pause * time);
    // }
    setTimeout(() => {
      reference.current.style.visibility = "hidden";
    }, (pause + 1) * time);
  }

  function jumpSymbols() {
    makeVisible("hidden");
    for (let i = 0; i < row * 5; i++) {
      var ref = imageRefs[i];
      handleFlash(ref, i);
    }
  }

  async function displayPicture(buttonName) {
    makeVisible("hidden");
    if (mode === "ToABeat") {
      setTimeout(() => {
        var soundCounter = 1;
        var soundInterval = setInterval(() => {
          if (soundCounter === 5 * row) {
            clearInterval(soundInterval);
          }
          play();
          soundCounter += 1;
        }, 1000);
      }, 500);
    }
    if (buttonName === "next" && last === "check") {
      makeVisible("hidden");
    }
    if (mode == "JumpingSymbols" && buttonName != "check") {
      await newImageArray();
      setTimeout(() => {
        jumpSymbols();
      }, 1000);
    } else if (mode == "JumpingSymbols" && buttonName === "check") {
      makeVisible("visible");
      setLast("check");
    } else {
      if (buttonName !== "check") {
        await newImageArray();

        setTimeout(() => {
          makeVisible("visible");
        }, 1000);
      } else {
        setDisplayTime("visible");
        setLast("check");
      }
    }
  }

  useEffect(() => {
    makeVisible("hidden");
  }, [row]);

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
        hiddenLetterDisplay="block"
        ChangeRow={setRow}
        rowBool={row}
        changeMode={setMode}
        modeBool={mode}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              ref={image1Ref}
              className="namingPics"
              src={"/EyeMovements/NamingPictures/" + image1 + ".jpg"}
              style={{ visibility: displayTime }}
            />
            <img
              ref={image2Ref}
              className="namingPics"
              src={"/EyeMovements/NamingPictures/" + image2 + ".jpg"}
              style={{ visibility: displayTime }}
            />
            <img
              ref={image3Ref}
              className="namingPics"
              src={"/EyeMovements/NamingPictures/" + image3 + ".jpg"}
              style={{ visibility: displayTime }}
            />
            <img
              ref={image4Ref}
              className="namingPics"
              src={"/EyeMovements/NamingPictures/" + image4 + ".jpg"}
              style={{ visibility: displayTime }}
            />
            <img
              ref={image5Ref}
              className="namingPics"
              src={"/EyeMovements/NamingPictures/" + image5 + ".jpg"}
              style={{ visibility: displayTime }}
            />
          </div>
          {row >= 2 ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                ref={image6Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image6 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image7Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image7 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image8Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image8 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image9Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image9 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image10Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image10 + ".jpg"}
                style={{ visibility: displayTime }}
              />
            </div>
          ) : (
            ""
          )}

          {row >= 3 ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                ref={image11Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image11 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image12Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image12 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image13Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image13 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image14Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image14 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image15Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image15 + ".jpg"}
                style={{ visibility: displayTime }}
              />
            </div>
          ) : (
            ""
          )}
          {row === 4 ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                ref={image16Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image16 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image17Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image17 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image18Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image18 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image19Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image19 + ".jpg"}
                style={{ visibility: displayTime }}
              />
              <img
                ref={image20Ref}
                className="namingPics"
                src={"/EyeMovements/NamingPictures/" + image20 + ".jpg"}
                style={{ visibility: displayTime }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <NextCheckButtons displayFunc={displayPicture} />
    </div>
  );
}
