import Button from "react-bootstrap/Button";
import React from "react";
import CodePatternsButtons from "./codePatternsButtons";

class Level1_CodesforClapPatterns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      display0: <div></div>,
      display1: <div></div>,
      display2: <div></div>,
      display3: <div></div>,
      margin0: "0px",
      margin1: "0px",
      margin2: "0px",
      margin3: "0px",
      marginRight0: "0px",
      marginRight1: "0px",
      marginRight2: "0px",
      marginRight3: "0px",
      presentation: "norm",
      beat: "none",
      beatAmount: 4,
    };
    this.nextActivity = this.nextActivity.bind(this);
  }

  audio = new Audio("/clickSound.wav");

  playSound() {
    var soundCounter = 1;
    var soundInterval = setInterval(() => {
      if (soundCounter === this.state.beatAmount) {
        clearInterval(soundInterval);
      }
      this.audio.play();
      soundCounter += 1;
    }, 1000);
  }

  componentDidMount() {
    console.log(React.version);
  }

  changeState = (change) => {
    this.setState({ presentation: change });
  };
  changeBeat = (change) => {
    this.setState({ beat: change });
  };

  nextActivity(e) {
    this.setState({
      margin0: "0px",
      margin1: "0px",
      margin2: "0px",
      margin3: "0px",
      marginRight0: "0px",
      marginRight1: "0px",
      marginRight2: "0px",
      marginRight3: "0px",
    });
    var marginArray = [];
    this.setState({ show: false });
    for (let i = 0; i < 4; i++) {
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
    if (
      this.state.presentation === "highLow" ||
      this.state.presentation === "pause"
    ) {
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
    }
    if (this.state.presentation === "pause") {
      this.setState({ beatAmount: 5 });
      let random = Math.floor(Math.random() * 3) + 1;
      if (random === 1) {
        this.setState({ marginRight0: "50px" });
      }
      if (random === 2) {
        this.setState({ marginRight1: "50px" });
      }
      if (random === 3) {
        this.setState({ marginRight2: "50px" });
      }
    }
    setTimeout(() => {
      this.setState({ show: true });
      if (this.state.beat != "none") {
        this.playSound();
      }
    }, 200);
  }

  render() {
    return (
      <div className="activity_box">
        <CodePatternsButtons
          changePresentation={this.changeState}
          presentationBool={this.state.presentation}
          changeSound={this.changeBeat}
          soundBool={this.state.beat}
        />
        {this.state.show && (
          <div className="container">
            <div
              style={{
                marginTop: this.state.margin0,
                marginRight: this.state.marginRight0,
              }}
            >
              {this.state.display0}
            </div>
            <div
              style={{
                marginTop: this.state.margin1,
                marginRight: this.state.marginRight1,
              }}
            >
              {this.state.display1}
            </div>
            <div
              style={{
                marginTop: this.state.margin2,
                marginRight: this.state.marginRight2,
              }}
            >
              {this.state.display2}
            </div>
            <div
              style={{
                marginTop: this.state.margin3,
                marginRight: this.state.marginRight3,
              }}
            >
              {this.state.display3}
            </div>
          </div>
        )}
        <div className="button_section">
          <button onClick={() => this.nextActivity()}>Next</button>
        </div>
      </div>
    );
  }
}

export default Level1_CodesforClapPatterns;
