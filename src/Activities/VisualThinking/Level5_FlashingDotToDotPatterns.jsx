import Dropdown from "react-bootstrap/Dropdown";

export default function Level5_FlashingDotToDotPatterns() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ display: "flex " }}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Level
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Level 1</Dropdown.Item>
            <Dropdown.Item>Level 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Number
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>3 Dots</Dropdown.Item>
            <Dropdown.Item>4 Dots</Dropdown.Item>
            <Dropdown.Item>5 Dots</Dropdown.Item>
            {true && <Dropdown.Item>6 Dots</Dropdown.Item>}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div id="columnsDotToDot">
        <div className="circRow">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="circRow">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="circRow">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
      <div className="button_section">
        <button>Start</button>
        <button>Check</button>
        <button>Repeat</button>
        <button>Next</button>
      </div>
    </div>
  );
}
