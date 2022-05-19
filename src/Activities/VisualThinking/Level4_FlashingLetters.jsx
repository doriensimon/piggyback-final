import NextCheckButtons from "./nextCheckButtons";
import FlashingPictureButtons from "./picturesComponent";
import { useEffect, useState } from "react";
import FlashingButtons from "./flashingButtons";
import SimulChoice from "./flashLetterFuncs/simulChoice";
import FlashSimul from "./flashLetterFuncs/flashSimul";
import SeqFlash from "./flashLetterFuncs/SeqFlash";

export default function Level3_FlashingNumbers() {
  function changeActivitiy(mode) {
    setActString(mode);
  }

  var [activitiy, setActivity] = useState(
    <FlashSimul newActivity={changeActivitiy} />
  );
  var [actString, setActString] = useState("Simultaneous");

  useEffect(() => {
    if (actString === "Choices") {
      setActivity(<SimulChoice newActivity={changeActivitiy} />);
    }
    if (actString === "Simultaneous") {
      setActivity(<FlashSimul newActivity={changeActivitiy} />);
    }
    if (actString === "Sequential") {
      setActivity(<SeqFlash newActivity={changeActivitiy} />);
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
