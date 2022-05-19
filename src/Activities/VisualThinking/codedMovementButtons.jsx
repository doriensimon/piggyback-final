import Dropdown from "react-bootstrap/Dropdown";

export default function CodedMovementButtons(props) {
  return (
    <div style={{ display: "flex" }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Activity
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.flash(false)}
            active={!props.flashBool}
          >
            Pictures
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flash(true)}
            active={props.flashBool}
          >
            Flashing Pictures
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Number
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.number(1)}
            active={props.numberBool === 1}
          >
            1 Pictures
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.number(2)}
            active={props.numberBool === 2}
          >
            2 Pictures
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.number(3)}
            active={props.numberBool === 3}
          >
            3 Pictures
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Beat
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.mode("Beat")}
            active={props.modeBool === "Beat"}
          >
            Use Beat
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.mode("NoBeat")}
            active={props.modeBool === "NoBeat"}
          >
            Don't Use Beat
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
