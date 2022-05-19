import NextCheckButtons from "../VisualThinking/nextCheckButtons";
import FindShapeButtons from "./FindShapeButtons";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
// import FindShapes from "./framerMotion";

export default function Level1_FlashingPictures() {
  var [displayTime, setDisplayTime] = useState("hidden");
  var [image, setImage] = useState("");
  var main = "main";
  var dirPath = "/TurningOnYourBrain/FindShape/";
  var [speed, setSpeed] = useState(10);
  var [triggered, setTriggered] = useState(false);
  const parentRef = useRef(null);
  var [widthPath, setWidth] = useState(500);
  var [start, setStart] = useState(true);

  useEffect(() => {
    setDisplayTime("hidden");
    if (parentRef.current) {
      let parentWidth = parentRef.current.offsetWidth;
      setWidth(parentWidth);
    }
  }, [speed, parentRef]);

  const containVar = {
    path: {
      x: [0, widthPath * 0.9, 0],
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const control = useAnimation();

  // var motionOptions = { duration: speed, repeat: Infinity, ease: "linear" };

  function newSpeed(speed) {
    control.start({
      x: [0, widthPath * 0.9, 0],
      transition: {
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      },
    });
    setSpeed(speed);
  }

  function displayPicture() {
    newSpeed(10);
    let parentWidth = parentRef.current.offsetWidth;
    setWidth(0.8 * parentWidth);
    setImage(main);
    setDisplayTime("visible");
    if (!triggered) {
      setInterval(() => {
        let random = Math.floor(Math.random() * 4) + 1;
        setImage(JSON.stringify(random));
        setTimeout(() => {
          setImage(main);
        }, 2000);
      }, 5000);
      setTriggered(true);
    }
  }

  return (
    <div
      ref={parentRef}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
        // backgroundColor: "red",
      }}
    >
      <FindShapeButtons
        changeSpeed={newSpeed}
        speedSet={setSpeed}
        speedBool={speed}
      />
      <motion.div variants={containVar} animate={control}>
        <img
          className="flashingPicsImage"
          src={dirPath + image + ".png"}
          style={{ visibility: displayTime }}
        />
      </motion.div>
      <NextCheckButtons displayFunc={displayPicture} displayCheck="none" />
    </div>
  );
}
