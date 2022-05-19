import Button from "react-bootstrap/Button";
import React from "react";
import ClapPatternButtons from "./clapPatternButtons";

class Level5_ClapPatterns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      display0: <div></div>,
      display1: <div></div>,
      display2: <div></div>,
      display3: <div></div>,
      display4: <div></div>,
      margin0: "0px",
      margin1: "0px",
      margin2: "0px",
      margin3: "0px",
      margin4: "0px",
      element: 4,
      active: "Normal",
    };
    this.nextActivity = this.nextActivity.bind(this);
  }

  componentDidMount() {
    console.log(React.version);
  }

  nextActivity(e) {
    this.setState({
      margin0: "0px",
      margin1: "0px",
      margin2: "0px",
      margin3: "0px",
      margin4: "0px",
    });
    var marginArray = [];
    this.setState({ show: false });
    for (let i = 0; i < this.state.element; i++) {
      let circle_display = Math.random();
      if (circle_display < 0.5) {
        marginArray.push(0);
        //pair
        this.setState({
          ["display" + i]: (
            <div>
              <span className="green_circle"></span>
              <span className="green_circle"></span>
            </div>
          ),
        });
      } else {
        marginArray.push(1);
        //single
        this.setState({
          ["display" + i]: <span className="green_circle"></span>,
        });
      }
    }
    if (this.state.active === "HighLow") {
      if (marginArray[0] === 1) {
        this.setState({ margin0: "50px" });
      }
      if (marginArray[1] === 1) {
        this.setState({ margin1: "50px" });
      }
      if (marginArray[2] === 1) {
        this.setState({ margin2: "50px" });
      }
      if (marginArray[3] === 1) {
        this.setState({ margin3: "50px" });
      }
      if (marginArray[4] === 1) {
        this.setState({ margin4: "50px" });
      }
    }
    this.setState({ show: true });
  }

  setElement = (change) => {
    this.setState({ show: false });
    this.setState({ element: change });
  };

  setActive = (change) => {
    this.setState({ show: false });
    this.setState({ active: change });
  };

  render() {
    return (
      <div className="activity_box">
        <ClapPatternButtons
          changeLevel={this.setElement}
          elementBool={this.state.element}
          changeActive={this.setActive}
          activeBool={this.state.active}
        />
        {this.state.show && (
          <div className="container">
            <div style={{ marginTop: this.state.margin0 }}>
              {this.state.display0}
            </div>
            <div style={{ marginTop: this.state.margin1 }}>
              {this.state.display1}
            </div>
            <div style={{ marginTop: this.state.margin2 }}>
              {this.state.display2}
            </div>
            <div style={{ marginTop: this.state.margin3 }}>
              {this.state.display3}
            </div>
            {this.state.element === 5 && (
              <div style={{ marginTop: this.state.margin4 }}>
                {this.state.display4}
              </div>
            )}
          </div>
        )}
        <div className="button_section">
          <button onClick={() => this.nextActivity()}>Next</button>
        </div>
      </div>
    );
  }
}

export default Level5_ClapPatterns;
