import Dropdown from "react-bootstrap/Dropdown";

export default function CodedMovementButtons(props) {
  return (
    <div style={{ display: "flex" }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Presentation
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changePresentation("norm")}
            active={props.presentationBool === "norm"}
          >
            Horizontal
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changePresentation("highLow")}
            active={props.presentationBool === "highLow"}
          >
            Horizontal - High/Low
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changePresentation("pause")}
            active={props.presentationBool === "pause"}
          >
            Horizontal - High/Low and Pause
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Beat
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeSound("beat")}
            active={props.soundBool === "beat"}
          >
            Use Beat
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSound("none")}
            active={props.soundBool === "none"}
          >
            Don't Use Beat
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
