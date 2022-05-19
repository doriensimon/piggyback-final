import Dropdown from "react-bootstrap/Dropdown";

export default function MemoryDotsButtons(props) {
  return (
    <div style={{ display: "flex " }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Level
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              props.changeLevel(1);
              props.changeVis("hidden");
            }}
            active={props.levelBool == 1 ? true : false}
          >
            Level 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.changeLevel(2);
              props.changeVis("visible");
            }}
            active={props.levelBool == 2 ? true : false}
          >
            Level 2
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Number
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeNumDots(3)}
            active={props.numDotsBool == 3 ? true : false}
          >
            3 Dots
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeNumDots(4)}
            active={props.numDotsBool == 4 ? true : false}
          >
            4 Dots
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeNumDots(5)}
            active={props.numDotsBool == 5 ? true : false}
          >
            5 Dots
          </Dropdown.Item>
          {props.levelBool === 2 && (
            <Dropdown.Item
              onClick={() => props.changeNumDots(6)}
              active={props.numDotsBool == 6 ? true : false}
            >
              6 Dots
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
