import { useEffect, useState } from "react";
import SimChoice from "./flashWordFuncs/SimChoice";
import Sim from "./flashWordFuncs/Sim";

export default function Level3_FlashingNumbers() {
  function changeActivitiy(mode) {
    setActString(mode);
  }

  var [activitiy, setActivity] = useState(
    <SimChoice newActivity={changeActivitiy} />
  );
  var [flash, setFlash] = useState(500);
  var [list, setList] = useState("twoThree");
  var [word, setWord] = useState(false);
  var [font, setFont] = useState("Lower");
  var [size, setSize] = useState("36pt");

  useEffect(() => {
    console.log("this does work");
  }, [flash, list, word, font, size]);

  var [actString, setActString] = useState("Simultaneous");

  useEffect(() => {
    if (actString === "Choices") {
      setActivity(
        <SimChoice
          newActivity={changeActivitiy}
          changeSize={setSize}
          size={size}
          changeFont={setFont}
          font={font}
          changeWord={setWord}
          word={word}
          list={list}
          changeList={setList}
          flash={flash}
          changeFlash={setFlash}
        />
      );
    }
    if (actString === "Simultaneous") {
      setActivity(
        <Sim
          newActivity={changeActivitiy}
          changeSize={setSize}
          size={size}
          changeFont={setFont}
          font={font}
          changeWord={setWord}
          word={word}
          list={list}
          changeList={setList}
          flash={flash}
          changeFlash={setFlash}
        />
      );
    }
  }, [actString]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {activitiy}
    </div>
  );
}
