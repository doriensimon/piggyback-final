import Dropdown from "react-bootstrap/Dropdown";

export default function CodedMovementButtons(props) {
  return (
    <div style={{ display: "flex" }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" disabled>
          Level
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Side To Side</Dropdown.Item>
          <Dropdown.Item>Up And Down</Dropdown.Item>
          <Dropdown.Item>Diagonal</Dropdown.Item>
          <Dropdown.Item>Random</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Speed
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeSpeed(15)}
            active={props.speedBool === 15}
          >
            Slow
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSpeed(10)}
            active={props.speedBool === 10}
          >
            Normal
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSpeed(7)}
            active={props.speedBool === 7}
          >
            Fast
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSpeed(5)}
            active={props.speedBool === 5}
          >
            Faster
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSpeed(2)}
            active={props.speedBool === 2}
          >
            Fastest
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
