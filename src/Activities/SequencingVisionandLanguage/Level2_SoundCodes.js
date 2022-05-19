import Button from "react-bootstrap/Button";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import useSound from "use-sound";

class Level2_SoundCodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      display0: <div></div>,
      display1: <div></div>,
      display2: <div></div>,
      display3: <div></div>,
      display4: <div></div>,
      presentation: 3,
      duration: 0,
      marginArray: ["0px", "0px", "0px", "0px"],
      rightpx0: "0px",
      rightpx1: "0px",
      rightpx2: "0px",
      rightpx3: "0px",
      delay0: 1000,
      delay1: 1000,
      delay2: 1000,
      delay3: 1000,
      selected: "3",
    };
    this.nextActivity = this.nextActivity.bind(this);
    this.playSounds = this.playSounds.bind(this);
  }

  componentDidMount() {
    console.log(React.version);
  }

  audioShort = new Audio("/dialToneTrimmed.mp3");
  audioLong = new Audio("/dialToneLong.mp3");

  fifthDisplay() {
    console.log("sound number 5");
    if (this.state.display4 === "long_rectangle") {
      this.audioLong.play();
    } else {
      this.audioShort.play();
    }
  }

  fourthDisplay() {
    console.log("sound number 4");
    if (this.state.display3 === "long_rectangle") {
      this.audioLong.play();
    } else {
      this.audioShort.play();
    }
    setTimeout(() => {
      console.log(this.state.presentation === 7);
      if (
        (this.state.presentation > 4 && this.state.presentation === 7) ||
        this.state.presentation === 5
      ) {
        this.fifthDisplay();
      }
    }, this.state.delay3);
  }

  thirdDisplay() {
    console.log("sound number 3");
    if (this.state.display2 === "long_rectangle") {
      // this.setState({ duration: 1000 });
      this.audioLong.play();
    } else {
      this.audioShort.play();
    }
    setTimeout(() => {
      if (this.state.presentation > 3) {
        this.fourthDisplay();
      }
    }, this.state.delay2);
  }

  secondDisplay() {
    console.log("sound number 2");
    if (this.state.display1 === "long_rectangle") {
      this.audioLong.play();
    } else {
      this.audioShort.play();
    }
    setTimeout(() => {
      this.thirdDisplay();
    }, this.state.delay1);
  }

  playSounds() {
    // console.log(this.state.delay);
    console.log("sound number one");
    if (this.state.display0 === "long_rectangle") {
      this.audioLong.play();
    } else {
      this.audioShort.play();
    }
    setTimeout(() => {
      this.secondDisplay();
    }, this.state.delay0);
  }

  nextActivity(e) {
    console.log(this.state.presentation);
    this.setState({ display0: "" });
    this.setState({ display1: "" });
    this.setState({ display2: "" });
    this.setState({ display3: "" });
    this.setState({ display4: "" });
    this.setState({ show: false });
    this.setState({ rightpx0: "0px" });
    this.setState({ rightpx1: "0px" });
    this.setState({ rightpx2: "0px" });
    this.setState({ rightpx3: "0px" });
    this.setState({ delay0: 1000 });
    this.setState({ delay1: 1000 });
    this.setState({ delay2: 1000 });
    this.setState({ delay3: 1000 });

    if (this.state.presentation > 5) {
      let random =
        Math.floor(Math.random() * (this.state.presentation - 3)) + 1;
      for (let i = 0; i < this.state.presentation - 2; i++) {
        let circle_display = Math.random();
        console.log(random);
        if (random === 1) {
          this.setState({ rightpx0: "50px" });
          this.setState({ delay0: 2000 });
        }
        if (random === 2) {
          this.setState({ rightpx1: "50px" });
          this.setState({ delay1: 2000 });
        }
        if (random === 3) {
          this.setState({ rightpx2: "50px" });
          this.setState({ delay2: 2000 });
        }
        if (this.state.presentation === 7) {
          if (random === 4) {
            this.setState({ rightpx3: "50px" });
            this.setState({ delay3: 2000 });
          }
        }
        if (circle_display < 0.5) {
          // console.log("long" + i);
          //long
          this.setState({ ["display" + i]: "long_rectangle" });
        } else {
          // console.log("short" + i);
          //short
          this.setState({ ["display" + i]: "short_rectangle" });
        }
      }
    } else {
      for (let i = 0; i < this.state.presentation; i++) {
        let circle_display = Math.random();
        if (circle_display < 0.5) {
          // console.log("long" + i);
          //long
          this.setState({ ["display" + i]: "long_rectangle" });
        } else {
          // console.log("short" + i);
          //short
          this.setState({ ["display" + i]: "short_rectangle" });
        }
      }
    }

    // if (this.state.display2 === "long_rectangle") {
    //   this.setState({ duration: 1000 });
    // }
    setTimeout(() => {
      this.playSounds();
    }, 200);

    console.log("the wait is: ", 1000 * this.state.presentation);
    setTimeout(() => {
      this.setState({ show: true });
    }, 1000 * this.state.presentation);
  }

  render() {
    return (
      <div className="activity_box">
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Presentation
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => this.setState({ presentation: 3 })}
                active={this.state.selected === "3"}
              >
                Three sounds and steps
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  this.setState({ presentation: 4, selected: "4" })
                }
                active={this.state.selected === "4"}
              >
                Four sounds and steps
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  this.setState({ presentation: 5, selected: "5" })
                }
                active={this.state.selected === "5"}
              >
                Five sounds and steps
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  this.setState({ presentation: 6, selected: "6" })
                }
                active={this.state.selected === "6"}
              >
                Four sounds with a pause, step and wait
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  this.setState({ presentation: 7, selected: "7" })
                }
                active={this.state.selected === "7"}
              >
                Five sounds with a pause, step and wait
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {this.state.show && (
          <div className="container">
            <div
              style={{ marginRight: this.state.rightpx0 }}
              className={this.state.display0}
            />
            <div
              style={{ marginRight: this.state.rightpx1 }}
              className={this.state.display1}
            />
            <div
              style={{ marginRight: this.state.rightpx2 }}
              className={this.state.display2}
            />
            <div
              style={{ marginRight: this.state.rightpx3 }}
              className={this.state.display3}
            />
            <div className={this.state.display4} />
          </div>
        )}
        <div className="button_section">
          <button onClick={() => this.nextActivity()}>Start</button>
        </div>
      </div>
    );
  }
}

export default Level2_SoundCodes;
