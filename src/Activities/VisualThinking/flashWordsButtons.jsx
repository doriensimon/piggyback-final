import Dropdown from "react-bootstrap/Dropdown";
// import Dropdown from "react-multilevel-dropdown";

export default function FlashingPictureButtons(props) {
  return (
    <div style={{ display: "flex" }}>
      <Dropdown style={{ display: props.FlashRateDisplay }}>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{ fontSize: "10pt" }}
        >
          Flash Rate
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.flashRate(250)}
            active={props.flashBool === 250}
          >
            0.25
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(500)}
            active={props.flashBool === 500}
          >
            0.50
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(600)}
            active={props.flashBool === 600}
          >
            0.60
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(700)}
            active={props.flashBool === 700}
          >
            0.70
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(800)}
            active={props.flashBool === 800}
          >
            0.80
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(900)}
            active={props.flashBool === 900}
          >
            0.90
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(1000)}
            active={props.flashBool === 1000}
          >
            1.00
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(1200)}
            active={props.flashBool === 1200}
          >
            1.20
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(1400)}
            active={props.flashBool === 1400}
          >
            1.40
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(1600)}
            active={props.flashBool === 1600}
          >
            1.60
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(1800)}
            active={props.flashBool === 1800}
          >
            1.80
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(2000)}
            active={props.flashBool === 2000}
          >
            2.00
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown style={{ display: props.hiddenLetterDisplay }}>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{ fontSize: "10pt" }}
        >
          Word List
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.hiddenLetter("twoThree")}
            active={props.letterBool === "twoThree"}
          >
            2 and 3 letter words
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.hiddenLetter("fourLetter")}
            active={props.letterBool === "fourLetter"}
          >
            4 letter words
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.hiddenLetter("fiveLetter")}
            active={props.letterBool === "fiveLetter"}
          >
            5+ letter words
          </Dropdown.Item>
          <Dropdown.Divider />
          {(props.letterBool === "fourLetter" ||
            (props.letterBool === "fiveLetter" &&
              props.levelBool === false)) && (
            <div>
              <Dropdown.Item
                onClick={() => props.changeGroup("A")}
                active={props.groupBool === "A"}
              >
                A
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.changeGroup("B")}
                active={props.groupBool === "B"}
              >
                B
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.changeGroup("C")}
                active={props.groupBool === "C"}
              >
                C
              </Dropdown.Item>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown style={{ display: props.levelDisplay }}>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{ fontSize: "10pt" }}
        >
          Number of Words
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeLevel(false)}
            active={props.levelBool === false}
          >
            one
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeLevel(true)}
            active={props.levelBool === true}
          >
            two
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          disabled={props.durationDisplay}
          style={{ fontSize: "10pt" }}
        >
          Presentation
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeActivity("Simultaneous")}
            active={props.durationBool === "Simultaneous"}
          >
            Simultaneous
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeActivity("Choices")}
            active={props.durationBool === "Choices"}
          >
            Simultaneous with choices
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown style={{ display: props.levelDisplay }}>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          disabled={props.durationBool !== "Choices"}
          style={{ fontSize: "10pt" }}
        >
          Choices Display
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeDisplay("Manual")}
            active={props.displayBool === "Manual"}
          >
            Manual
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeDisplay(10)}
            active={props.displayBool !== "Manual"}
          >
            Automatic
          </Dropdown.Item>
          <Dropdown.Divider />
          {props.displayBool !== "Manual" && (
            <div>
              <Dropdown.Item
                onClick={() => props.changeDisplay(10)}
                active={props.displayBool === 10}
              >
                10 seconds
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.changeDisplay(20)}
                active={props.displayBool === 20}
              >
                20 seconds
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.changeDisplay(30)}
                active={props.displayBool === 30}
              >
                30 seconds
              </Dropdown.Item>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown style={{ display: props.levelDisplay }}>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{ fontSize: "10pt" }}
        >
          Letter Case
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeCase("Upper")}
            active={props.caseBool === "Upper"}
          >
            Upper
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeCase("Lower")}
            active={props.caseBool === "Lower"}
          >
            Lower
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeCase("Mixed")}
            active={props.caseBool === "Mixed"}
          >
            Mixed
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown style={{ display: props.levelDisplay }}>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{ fontSize: "10pt" }}
        >
          Character Size
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeSize("24pt")}
            active={props.sizeBool === "24pt"}
          >
            Small (24 point)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSize("36pt")}
            active={props.sizeBool === "36pt"}
          >
            Normal (36 point)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSize("48pt")}
            active={props.sizeBool === "48pt"}
          >
            Medium (48 point)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSize("60pt")}
            active={props.sizeBool === "60pt"}
          >
            Large (60 point)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
