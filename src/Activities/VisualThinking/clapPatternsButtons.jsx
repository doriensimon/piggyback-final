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
            onClick={() => props.flashRate(100)}
            active={props.flashBool === 100}
          >
            Continuous
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.flashRate(100)}
            active={props.flashBool === 100}
          >
            0.10
          </Dropdown.Item>
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
            onClick={() => props.activityChange("norm")}
            active={props.activityBool === "norm"}
          >
            Single and Double Claps
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.activityChange("highLow")}
            active={props.activityBool === "highLow"}
          >
            High and Low Claps
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.activityChange("soft")}
            active={props.activityBool === "soft"}
          >
            High, Low, Loud, and Soft claps
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Number
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.Number(3)}
            active={props.numberBool === 3}
          >
            3 Claps
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.Number(4)}
            active={props.numberBool === 4}
          >
            4 Claps
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.Number(5)}
            active={props.numberBool === 5}
          >
            5 Claps
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {!props.guideOption && (
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            disabled={props.guideOption}
          >
            Guide Line
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                props.showGuide({
                  backgroundImage: `url("/VisualThinking/guidelines.PNG")`,
                  backgroundPosition: "0px -25px",
                })
              }
              active={props.guideBool}
            >
              Use Guideline
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.showGuide({})}
              active={!props.guideBool}
            >
              Don't Use Guideline
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Beat
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => props.addBeat(true)}
            active={props.beatBool}
          >
            Use Beat
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => props.addBeat(false)}
            active={!props.beatBool}
          >
            Don't Use Beat
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
