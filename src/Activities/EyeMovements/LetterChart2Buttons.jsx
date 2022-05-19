import Dropdown from "react-bootstrap/Dropdown";

export default function LetterChart2Buttons(props) {
  return (
    <div style={{ display: "flex" }}>
      <Dropdown style={{ display: props.FlashRateDisplay }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Beat Rate/Flash Rate
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeSound(!props.soundBool)}
            active={!props.soundBool}
          >
            Silent
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
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Word Spacing
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              props.changeSpacing("3em");
              props.changeMargin("0em");
            }}
            active={props.spaceBool === "3em"}
          >
            In Columns
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.changeSpacing("auto");
              props.changeMargin("1em");
            }}
            active={props.spaceBool === "auto"}
          >
            Normal Spacing
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Pattern Highlight
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeFlash("FirstLast")}
            active={props.triggerBool === "FirstLast"}
          >
            Highlist first letter of each word
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeFlash("Second")}
            active={props.triggerBool === "Second"}
          >
            Highlight entire word
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeFlash("Off")}
            active={props.triggerBool === "Off"}
          >
            Off
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
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
            onClick={() => props.changeSize("30pt")}
            active={props.sizeBool === "30pt"}
          >
            Medium (30 point)
          </Dropdown.Item>

          <Dropdown.Item
            onClick={() => props.changeSize("36pt")}
            active={props.sizeBool === "36pt"}
          >
            Normal (36 point)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeSize("42pt")}
            active={props.sizeBool === "42pt"}
          >
            Large (42 point)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
