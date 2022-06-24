import Button from "react-bootstrap/Button";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ClapPatternsButton from "./clapPatternsButtons";
import { urlencoded } from "body-parser";

class Level2_FlashingClapPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      display0: <div></div>,
      display1: <div></div>,
      display2: <div></div>,
      display3: <div></div>,
      display4: <div></div>,
      displayNumber: 3,
      margin0: "0px",
      margin1: "0px",
      margin2: "0px",
      margin3: "0px",
      displayTime: 1000,
      activity: "norm",
      number1: "none",
      number2: "none",
      number3: "none",
      beat: false,
      started: false,
      backImage: {},
      guide: true,
    };
    this.nextActivity = this.nextActivity.bind(this);
  }

  audio = new Audio("/clickSound.wav");

  componentDidMount() {
    console.log(React.version);
  }

  runBeat() {
    if (this.state.beat) {
      setTimeout(() => {
        this.audio.play();
        this.runBeat();
      }, 1000);
    }
  }

  changeTime = (change) => {
    this.setState({ displayTime: change });
  };

  changeNumber = (change) => {
    this.setState({ displayNumber: change });
  };

  changeActivity = (change) => {
    this.setState({ activity: change });
    if (change === "norm") {
      this.setState({ backImage: {} });
    }
    if (this.state.guide && change !== "norm") {
      this.setState({
        backImage: {
          backgroundImage: `url("/VisualThinking/guidelines.PNG")`,
          backgroundPosition: "0px -25px",
        },
      });
    }
  };

  changeBeat = (change) => {
    this.setState({ beat: change });
    this.setState({ started: false });
  };

  changeBack = (change) => {
    this.setState({ backImage: change });
    if (Object.keys(change).length > 0) {
      this.setState({ guide: true });
    } else {
      this.setState({ guide: false });
    }
  };

  nextActivity(e) {
    this.setState({ show: false });
    var styles = {
      border: "solid",
      backgroundColor: "white",
      borderColor: "greenyellow",
    };
    var inline = {};
    this.setState({
      margin0: "0px",
      margin1: "0px",
      margin2: "0px",
      margin3: "0px",
    });
    var marginArray = [];
    this.setState({ show: false });
    for (let i = 0; i < this.state.displayNumber; i++) {
      let circle_display = Math.random();
      if (this.state.activity === "soft") {
        let rand = Math.random();
        if (rand < 0.5) {
          inline = {};
        } else {
          inline = styles;
        }
      }
      if (circle_display < 0.5) {
        marginArray.push(0);
        //pair
        this.setState({
          ["display" + i]: (
            <div>
              <span style={inline} className="green_circle"></span>
              <span style={inline} className="green_circle"></span>
            </div>
          ),
        });
      } else {
        marginArray.push(1);
        //single
        this.setState({
          ["display" + i]: (
            <span style={inline} className="green_circle"></span>
          ),
        });
      }
    }
    if (this.state.activity === "highLow" || this.state.activity === "soft") {
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
    if (this.state.displayNumber > 3) {
      this.setState({ number1: "block" });
    }
    if (this.state.displayNumber > 4) {
      this.setState({ number2: "block" });
    }
    setTimeout(() => {
      this.setState({ show: true });
      if (this.state.displayTime !== "continuous") {
        setTimeout(() => {
          this.setState({ show: false });
        }, this.state.displayTime);
      }
    }, 500)
    
    
    if (!this.state.started) {
      this.runBeat();
      this.setState({ started: true });
    }
  }

  render() {
    return (
      <div className="activity_box">
        <ClapPatternsButton
          flashRate={this.changeTime}
          flashBool={this.state.displayTime}
          activityChange={this.changeActivity}
          activityBool={this.state.activity}
          Number={this.changeNumber}
          numberBool={this.state.displayNumber}
          addBeat={this.changeBeat}
          beatBool={this.state.beat}
          showGuide={this.changeBack}
          guideBool={this.state.guide}
          guideOption={this.state.activity === "norm"}
        />
        {this.state.activity !== "norm" && this.state.guide && <hr className="centerLine" style={{position: 'absolute', width: '100%', height: '5px', color: '#fff'}}/>}
        
          <div className="container" id="centeringDots">
            {this.state.show && <div
              style={{
                marginTop: this.state.margin0,
              }}
            >
              {this.state.display0}
            </div>}
            {this.state.show && <div
              style={{
                marginTop: this.state.margin1,
              }}
            >
              {this.state.display1}
            </div>}
            {this.state.show && <div
              style={{
                marginTop: this.state.margin2,
              }}
            >
              {this.state.display2}
            </div>}
            {this.state.show && <div
              style={{
                marginTop: this.state.margin3,
                display: this.state.number1,
              }}
            >
              {this.state.display3}
            </div>}

            {this.state.show && <div
              style={{
                marginTop: this.state.margin3,
                display: this.state.number2,
              }}
            >
              {this.state.display4}
            </div>}
          </div>
        
        <div className="button_section">
          <button disabled={this.state.displayTime === "continuous"} onClick={() => this.setState({ show: true })}>Check</button>
          <button onClick={() => this.nextActivity()}>Next</button>
        </div>
      </div>
    );
  }
}

export default Level2_FlashingClapPictures;
