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
      showShape1: null,
      showShape2: null,
      showShape3: null,
      showShape4: null,
      showShape5: null,
      showShape6: null,
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
      white: "/SequencingVision&Learning/shapes/white.png",
      activity: "Normal",
      number: 3,
      displayTime: 1000,
      tempStyle1: "auto",
      tempStyle2: "auto",
      tempStyle3: "auto",
      tempStyle4: "auto",
      tempStyle5: "auto",
      tempStyle6: "auto",
    };
    this.startActivity = this.startActivity.bind(this);
    this.checkActivity = this.checkActivity.bind(this);
  }

  componentDidMount() {
    console.log(React.version);
  }

  changeAll(change) {
    if (change === "visible") {
      this.setState({
        shape1: this.state.showShape1,
        shape2: this.state.showShape2,
        shape3: this.state.showShape3,
        shape4: this.state.showShape4,
        shape5: this.state.showShape5,
        shape6: this.state.showShape6,
      });
    } else if (change === "flash") {
      this.setState(
        {
          shape1: this.state.showShape1,
          shape2: this.state.showShape2,
          shape3: this.state.showShape3,
          shape4: this.state.showShape4,
          shape5: this.state.showShape5,
          shape6: this.state.showShape6,
        },
        this.displayShapes()
      );
    } else {
      this.setState({ shape1: this.state.white });
      this.setState({ shape2: this.state.white });
      this.setState({ shape3: this.state.white });
      this.setState({ shape4: this.state.white });
      this.setState({ shape5: this.state.white });
      this.setState({ shape6: this.state.white });
    }
  }

  startActivity(e) {
    if (e === 1) {
      this.changeAll("none");
    }
    this.setState({ ["tempStyle" + e]: "auto" });
    this.setState({ disableStart: true });
    this.setState({ disableCheck: true });
    if (e >= this.state.number + 1) {
      this.setState({ disableCheck: false });
      return;
    }
    this.setState({ showAll: false });
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
      if (options[shape] === this.state.triangle) {
        console.log("we made it here");
        this.setState({ ["tempStyle" + e]: "100px" });
      }
      this.setState({ ["shape" + e]: options[shape] });
      this.setState({ ["showShape" + e]: options[shape] });
      setTimeout(() => {
        this.setState({ ["shape" + e]: this.state.white });
        this.startActivity(e + 1);
      }, this.state.displayTime);
    } else {
      for (let e = 1; e < this.state.number + 1; e++) {
        let shape = Math.floor(Math.random() * options.length);
        this.setState({ ["showShape" + e]: options[shape] });
      }

      setTimeout(() => {
        this.changeAll("flash");
      }, 200);
    }
  }

  displayShapes() {
    setTimeout(() => {
      this.changeAll("hidden");
      this.setState({ disableCheck: false });
    }, this.state.displayTime);
  }

  checkActivity() {
    this.changeAll("visible");

    this.setState({ disableCheck: true });
    this.setState({ disableStart: false });
  }

  setNumber = (change) => {
    this.setState({ number: change });
    this.changeAll("none");
    this.setState({ disableCheck: true });
    this.setState({ disableStart: false });
  };

  changeTime = (change) => {
    this.setState({ displayTime: change });
    this.changeAll("none");
    this.setState({ disableCheck: true });
    this.setState({ disableStart: false });
  };

  changeActivity = (change) => {
    this.setState({ activity: change });
    this.changeAll("none");
    this.setState({ disableCheck: true });
    this.setState({ disableStart: false });
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
                style={{ height: this.state.tempStyle1 }}
              />
            </div>
          )}
          {
            <div visibility={this.state.showShape2}>
              <img
                className="flashImage"
                src={this.state.shape2}
                style={{ height: this.state.tempStyle2 }}
              />
            </div>
          }
          {
            <div visibility={this.state.showShape3}>
              <img
                className="flashImage"
                src={this.state.shape3}
                style={{ height: this.state.tempStyle3 }}
              />
            </div>
          }
          {this.state.number > 3 && (
            <div visibility={this.state.showShape4}>
              <img
                className="flashImage"
                src={this.state.shape4}
                style={{ height: this.state.tempStyle4 }}
              />
            </div>
          )}
          {this.state.number > 4 && (
            <div visibility={this.state.showShape5}>
              <img
                className="flashImage"
                src={this.state.shape5}
                style={{ height: this.state.tempStyle5 }}
              />
            </div>
          )}
          {this.state.number > 5 && (
            <div visibility={this.state.showShape6}>
              <img
                className="flashImage"
                src={this.state.shape6}
                style={{ height: this.state.tempStyle6 }}
              />
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
