import Button from "react-bootstrap/Button";
import React from "react";
import VisSeqButtons from "./visSeqButtons";

class Level4_VisualSequence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shape1: null,
      shape2: null,
      shape3: null,
      shape4: null,
      shape5: null,
      shape6: null,
      showShape1: "hidden",
      showShape2: "hidden",
      showShape3: "hidden",
      showShape4: "hidden",
      showShape5: "hidden",
      showShape6: "hidden",
      showAll: false,
      disableStart: false,
      disableCheck: true,
      diamond: "/SequencingVision&Learning/shapes/redTriangleSnip.png",
      square: "/SequencingVision&Learning/shapes/yellowSquareSnip.png",
      triangle: "/SequencingVision&Learning/shapes/blueTriangleSnip.png",
      tiltDiamond: "/SequencingVision&Learning/shapes/tiltDiamond.png",
      tiltDiamondLeft: "/SequencingVision&Learning/shapes/tiltDiamondLeft.png",
      sideDiamond: "/SequencingVision&Learning/shapes/sideDiamond.png",
      tiltTriangleRight:
        "/SequencingVision&Learning/shapes/tiltTriangleRight.png",
      tiltTriangleLeft:
        "/SequencingVision&Learning/shapes/tiltTriangleLeft.png",
      tiltSquare: "/SequencingVision&Learning/shapes/tiltSquare.png",
      activity: "Normal",
      number: 3,
      displayTime: 1000,
    };
    this.startActivity = this.startActivity.bind(this);
    this.checkActivity = this.checkActivity.bind(this);
  }

  componentDidMount() {
    console.log(React.version);
  }

  changeAll(change) {
    this.setState({ showShape1: change });
    this.setState({ showShape2: change });
    this.setState({ showShape3: change });
    this.setState({ showShape4: change });
    this.setState({ showShape5: change });
    this.setState({ showShape6: change });
  }

  startActivity(e) {
    console.log(e, "im in the act");
    this.setState({ disableStart: true });
    this.setState({ disableCheck: true });
    if (e >= this.state.number + 1) {
      this.setState({ disableCheck: false });
      return;
    }
    // this.setState({ showAll: false });
    // this.changeAll("hidden");
    if (
      this.state.activity === "Normal" ||
      this.state.activity === "SimNormal"
    ) {
      var shape = Math.floor(Math.random() * 3);
      var options = [
        this.state.diamond,
        this.state.triangle,
        this.state.square,
      ];
    } else {
      var shape = Math.floor(Math.random() * 8);
      var options = [
        this.state.tiltDiamond,
        this.state.tiltDiamondLeft,
        this.state.tiltTriangleRight,
        this.state.tiltSquare,
        this.state.sideDiamond,
        this.state.tiltTriangleLeft,
        this.state.triangle,
        this.state.square,
      ];
    }

    if (this.state.activity === "Normal" || this.state.activity === "Tilted") {
      this.setState({ ["shape" + e]: options[shape] });
      // this.setState({ ["showShape" + e]: "visible" });
      setTimeout(() => {
        this.setState({ ["showShape" + e]: "hidden" });
        console.log(this.state.showShape1);
        this.startActivity(e + 1);
      }, this.state.displayTime);
    } else {
      for (let e = 1; e < options.length + 1; e++) {
        let shape = Math.floor(Math.random() * options.length);
        this.setState({ ["shape" + e]: options[shape] });
      }
      this.changeAll("visible");
      setTimeout(() => {
        console.log("got inside the setTimeout");
        this.changeAll("hidden");
        this.setState({ disableCheck: false });
      }, this.state.displayTime);
    }
  }

  checkActivity() {
    this.changeAll("visible");
    this.setState({ disableCheck: true });
    this.setState({ disableStart: false });
  }

  setNumber = (change) => {
    this.setState({ number: change });
  };

  changeTime = (change) => {
    this.setState({ displayTime: change });
  };

  changeActivity = (change) => {
    this.setState({ activity: change });
  };

  render() {
    return (
      <div className="activity_box">
        <VisSeqButtons
          flashRate={this.changeTime}
          flashBool={this.state.displayTime}
          changeLevel={this.setNumber}
          levelBool={this.state.number}
          hiddenLetter={this.changeActivity}
          letterBool={this.state.activity}
        />
        <div className="white_container">
          {this.state.showShape1 && (
            <div visibility={this.state.showShape1}>
              <img
                className="flashImage"
                src={this.state.shape1}
                visibility={this.state.showShape1}
              />
            </div>
          )}
          {
            <div visibility={this.state.showShape2}>
              <img className="flashImage" src={this.state.shape2} />
            </div>
          }
          {
            <div visibility={this.state.showShape3}>
              <img className="flashImage" src={this.state.shape3} />
            </div>
          }
          {this.state.number > 3 && (
            <div visibility={this.state.showShape4}>
              <img className="flashImage" src={this.state.shape4} />
            </div>
          )}
          {this.state.number > 4 && (
            <div visibility={this.state.showShape5}>
              <img className="flashImage" src={this.state.shape5} />
            </div>
          )}
          {this.state.number > 5 && (
            <div visibility={this.state.showShape6}>
              <img className="flashImage" src={this.state.shape6} />
            </div>
          )}
        </div>
        {/* {
          <div className="white_container_flex">
            <img src={this.state.shape1} />
            <img src={this.state.shape2} />
            <img src={this.state.shape3} />
            {this.state.number > 3 && <img src={this.state.shape4} />}
            {this.state.number > 4 && <img src={this.state.shape5} />}
            {this.state.number > 5 && <img src={this.state.shape6} />}
          </div>
        } */}
        <div className="button_section">
          <button
            disabled={this.state.disableCheck}
            onClick={() => this.checkActivity()}
          >
            Check
          </button>
          <button
            disabled={this.state.disableStart}
            onClick={() => this.startActivity(1)}
          >
            Start
          </button>
        </div>
      </div>
    );
  }
}

export default Level4_VisualSequence;
