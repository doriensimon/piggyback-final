import Dropdown from "react-bootstrap/Dropdown";

export default function FlashingPictureButtons(props) {
  return (
    <div style={{ display: "flex" }}>
      <Dropdown style={{ display: props.FlashRateDisplay }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
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
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Activity
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.hiddenLetter("Normal")}
            active={props.letterBool === "Normal"}
          >
            Normal
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.hiddenLetter("Tilted")}
            active={props.letterBool === "Tilted"}
          >
            Tilted
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.hiddenLetter("SimNormal")}
            active={props.letterBool === "SimNormal"}
          >
            All at once, Normal
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.hiddenLetter("SimTilted")}
            active={props.letterBool === "SimTilted"}
          >
            All at once, Tilted
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Number
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeLevel(3)}
            active={props.levelBool === 3}
          >
            3 shapes
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeLevel(4)}
            active={props.levelBool === 4}
          >
            4 shapes
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeLevel(5)}
            active={props.levelBool === 5}
          >
            5 shapes
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeLevel(6)}
            active={props.levelBool === 6}
          >
            6 shapes
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
