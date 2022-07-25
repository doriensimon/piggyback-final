import NextCheckButtons from "./nextCheckButtons";
import { useEffect, useState } from "react";
import FlashingButtons from "./flashingButtons";
import SequentialWithChoices from "./sequentialWithChoices";
import FlashingNumbers from "./flashingNumbers";
import FlashingSequential from "./flashingSequential";

export default function Level3_FlashingNumbers() {
  function changeActivitiy(mode) {
    setActString(mode);
  }

  var [activitiy, setActivity] = useState(
    <FlashingNumbers newActivity={changeActivitiy} />
  );
  var [actString, setActString] = useState("Simultaneous");

  useEffect(() => {
    if (actString === "Choices") {
      setActivity(<SequentialWithChoices newActivity={changeActivitiy} />);
    }
    if (actString === "Simultaneous") {
      setActivity(<FlashingNumbers newActivity={changeActivitiy} />);
    }
    if (actString === "Sequential") {
      setActivity(<FlashingSequential newActivity={changeActivitiy} />);
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
