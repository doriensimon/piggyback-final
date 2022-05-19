import Dropdown from "react-bootstrap/Dropdown";

export default function ClapPatternButtons(props) {
  return (
    <div style={{ display: "flex " }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Number
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              props.changeLevel(4);
            }}
            active={props.elementBool == 4}
          >
            4 Elements
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.changeLevel(5);
            }}
            active={props.elementBool == 5}
          >
            5 Elements
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Claps
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeActive("Normal")}
            active={props.activeBool == "Normal"}
          >
            Normal
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeActive("HighLow")}
            active={props.activeBool == "HighLow"}
          >
            High and Low
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
