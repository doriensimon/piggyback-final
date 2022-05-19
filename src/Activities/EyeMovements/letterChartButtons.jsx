import Dropdown from "react-bootstrap/Dropdown";

export default function LetterChartButtons(props) {
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
            onClick={() => {
              props.flashRate(500);
            }}
            active={props.flashBool === 500}
          >
            0.50
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(600);
            }}
            active={props.flashBool === 600}
          >
            0.60
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(700);
            }}
            active={props.flashBool === 700}
          >
            0.70
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(800);
            }}
            active={props.flashBool === 800}
          >
            0.80
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(900);
            }}
            active={props.flashBool === 900}
          >
            0.90
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(1000);
            }}
            active={props.flashBool === 1000}
          >
            1.00
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(1200);
            }}
            active={props.flashBool === 1200}
          >
            1.20
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(1400);
            }}
            active={props.flashBool === 1400}
          >
            1.40
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(1600);
            }}
            active={props.flashBool === 1600}
          >
            1.60
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(1800);
            }}
            active={props.flashBool === 1800}
          >
            1.80
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.flashRate(2000);
            }}
            active={props.flashBool === 2000}
          >
            2.00
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown style={{ display: props.hiddenLetterDisplay }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Chart Size
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              props.ChangeRow(3);
              if (props.triggerBool !== "Off") {
                props.changeFlash("FirstLast");
              }
            }}
            active={props.rowBool === 3}
          >
            3x3
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.ChangeRow(4)}
            active={props.rowBool === 4}
          >
            4x4
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.ChangeRow(5)}
            active={props.rowBool === 5}
          >
            5x5
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.ChangeRow(8)}
            active={props.rowBool === 8}
          >
            8x8
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.ChangeRow(10)}
            active={props.rowBool === 10}
          >
            10x10
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Letter Spacing
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeSpacing("0px")}
            active={props.spaceBool === "0px"}
          >
            Single
          </Dropdown.Item>
          {props.rowBool !== 10 && (
            <Dropdown.Item
              onClick={() => props.changeSpacing("32px")}
              active={props.spaceBool === "32px"}
            >
              Double
            </Dropdown.Item>
          )}
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
            First and last column
          </Dropdown.Item>
          {props.rowBool !== 3 && (
            <Dropdown.Item
              onClick={() => props.changeFlash("Second")}
              active={props.triggerBool === "Second"}
            >
              Second and second last column
            </Dropdown.Item>
          )}
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
          Chart
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.changeMode("lowercase")}
            active={props.modeBool === "lowercase"}
          >
            Lowercase
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.changeMode("uppercase")}
            active={props.modeBool === "uppercase"}
          >
            Uppercase
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
          {(props.rowBool === 3 ||
            props.rowBool === 5 ||
            props.rowBool === 4) && (
            <div>
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
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
