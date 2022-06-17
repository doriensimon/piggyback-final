import Dropdown from "react-bootstrap/Dropdown";

export default function RotatingFlippingButtons(props) {
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
      <Dropdown style={{ display: props.levelDisplay }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Rotation
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {props.changeLevel("scaleY(-1)");}}
            active={props.levelBool === "scaleY(-1)"}
          >
            Up Side Down
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {props.changeLevel("scaleX(-1)");}}
            active={props.levelBool === "scaleX(-1)"}
          >
            Flipped Sideways
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {props.changeLevel("rotate(90deg)");}}
            active={props.levelBool === "rotate(90deg)"}
          >
            Rotated Quarter Turn Clockwise
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {props.changeLevel("rotate(180deg)");}}
            active={props.levelBool === "rotate(180deg)"}
          >
            Rotated Half A Turn
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <Dropdown style={{ display: props.hiddenLetterDisplay }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Choices
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item
            onClick={() => {props.changeLevel("scaleY(-1)"); props.changeChoice(true)}}
            active={props.levelBool === "scaleY(-1)" && props.choiceBool}
          >
            Up Side Down
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {props.changeLevel("scaleX(-1)"); props.changeChoice(true)}}
            active={props.levelBool === "scaleX(-1)" && props.choiceBool}
          >
            Flipped Sideways
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {props.changeLevel("rotate(90deg)"); props.changeChoice(true)}}
            active={props.levelBool === "rotate(90deg)" && props.choiceBool}
          >
            Rotated Quarter Turn Clockwise
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {props.changeLevel("rotate(180deg)"); props.changeChoice(true)}}
            active={props.levelBool === "rotate(180deg)" && props.choiceBool}
          >
            Rotated Half A Turn
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Presentation
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeChoice(false)}
            active={!props.choiceBool}
          >
            Flashing
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeChoice(true)}
            active={props.choiceBool}
          >
            Choices
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Level
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeImage("auto")}
            active={props.imageBool === "auto"}
          >
            Level 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeImage("50%")}
            active={props.imageBool === "50%"}
          >
            Level 2
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
