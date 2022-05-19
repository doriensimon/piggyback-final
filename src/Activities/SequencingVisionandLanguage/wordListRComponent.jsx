import Dropdown from "react-bootstrap/Dropdown";
// import { LongReal1, LongReal2, LongReal3 } from "./wordList";

export default function FlashingPictureButtons(props) {
  return (
    <div style={{ display: "flex" }}>
      <Dropdown style={{ display: props.FlashRateDisplay }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Beat/Flash Rate
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            active={props.flashBool === 250}
            onClick={() => props.flashRate(250)}
          >
            0.25
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 500}
            onClick={() => props.flashRate(500)}
          >
            0.50
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 600}
            onClick={() => props.flashRate(600)}
          >
            0.60
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 700}
            onClick={() => props.flashRate(700)}
          >
            0.70
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 800}
            onClick={() => props.flashRate(800)}
          >
            0.80
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 900}
            onClick={() => props.flashRate(900)}
          >
            0.90
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 1000}
            onClick={() => props.flashRate(1000)}
          >
            1.00
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 1200}
            onClick={() => props.flashRate(1200)}
          >
            1.20
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 1400}
            onClick={() => props.flashRate(1400)}
          >
            1.40
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 1600}
            onClick={() => props.flashRate(1600)}
          >
            1.60
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 1800}
            onClick={() => props.flashRate(1800)}
          >
            1.80
          </Dropdown.Item>
          <Dropdown.Item
            active={props.flashBool === 2000}
            onClick={() => props.flashRate(2000)}
          >
            2.00
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <Dropdown style={{ display: props.hiddenLetterDisplay }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Word List
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            active={props.wordList === "RW1"}
            onClick={() => {
              props.changeList("RW1");
              props.changeArray(LongReal1);
            }}
          >
            Real Worlds 1
          </Dropdown.Item>
          <Dropdown.Item
            active={props.wordList === "RW2"}
            onClick={() => {
              props.changeList("RW2");
              props.changeArray(LongReal2);
            }}
          >
            Real Words 2
          </Dropdown.Item>
          <Dropdown.Item
            active={props.wordList === "RW3"}
            onClick={() => {
              props.changeList("RW3");
              props.changeArray(LongReal3);
            }}
          >
            Real Words 3
          </Dropdown.Item>
          <Dropdown.Item
            active={props.wordList === "Both"}
            onClick={() => {
              props.changeList("Both");
              props.changeArray(LongReal1.concat(LongReal2).concat(LongReal3));
            }}
          >
            Everything
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Presentation
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            active={props.mode === "normal"}
            onClick={() => props.changeMode("normal")}
          >
            Word Chart
          </Dropdown.Item>
          <Dropdown.Item
            active={props.mode === "beat"}
            onClick={() => props.changeMode("beat")}
          >
            Word Chart To A Beat
          </Dropdown.Item>
          <Dropdown.Item
            active={props.mode === "flashing"}
            onClick={() => props.changeMode("flashing")}
          >
            Flashing Words
          </Dropdown.Item>
          <Dropdown.Item
            active={props.mode === "naming"}
            onClick={() => props.changeMode("naming")}
          >
            Fast Naming
          </Dropdown.Item>
          <Dropdown.Item
            active={props.mode === "sequence"}
            onClick={() => props.changeMode("sequence")}
          >
            Word Sequence
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {(props.mode === "flashing" || props.mode === "sequence") && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Number
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              active={props.number === 2}
              onClick={() => props.changeNumber(2)}
            >
              2
            </Dropdown.Item>
            <Dropdown.Item
              active={props.number === 3}
              onClick={() => props.changeNumber(3)}
            >
              3
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Letter Case
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            active={props.fontBool === "upper"}
            onClick={() => props.changeFont("upper")}
          >
            Upper
          </Dropdown.Item>
          <Dropdown.Item
            active={props.fontBool === "lower"}
            onClick={() => props.changeFont("lower")}
          >
            Lower
          </Dropdown.Item>
          <Dropdown.Item
            active={props.fontBool === "mixed"}
            onClick={() => props.changeFont("mixed")}
          >
            Mixed
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Character Size
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            active={props.size === "24pt"}
            onClick={() => props.changeLevel("24pt")}
          >
            Small (24 point)
          </Dropdown.Item>
          <Dropdown.Item
            active={props.size === "36pt"}
            onClick={() => props.changeLevel("36pt")}
          >
            Normal (36 point)
          </Dropdown.Item>
          {props.fontBool === "lower" && (
            <Dropdown.Item
              active={props.size === "48pt"}
              onClick={() => props.changeLevel("48pt")}
            >
              Medium (48 point)
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
