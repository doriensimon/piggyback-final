import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import Dropdown from "react-bootstrap/Dropdown";

export default function BeatActivity() {
  const [play] = useSound("/clickSound.wav");
  var [loop, setLoop] = useState();
  var [loop2, setLoop2] = useState();
  var [beat, setBeat] = useState(false);
  var [triggered, setTriggered] = useState(false);
  var [triggered2, setTriggered2] = useState(false);
  var [time, setTime] = useState(0);

  function beat500() {
    if (!triggered) {
      setLoop(
        setInterval(() => {
          play();
        }, 500)
      );
      setTriggered(true);
      setTime(500);
    } else {
      if (time === 1000) {
        stopIt();
        setLoop(
          setInterval(() => {
            play();
          }, 500)
        );
        setTriggered(true);
        setTime(500);
      }
    }
  }

  function beat1000() {
    if (!triggered) {
      setLoop(
        setInterval(() => {
          play();
        }, 1000)
      );
      setTriggered(true);
      setTime(1000);
    } else {
      if (time === 500) {
        stopIt();
        setLoop(
          setInterval(() => {
            play();
          }, 1000)
        );
        setTriggered(true);
        setTime(1000);
      }
    }
  }

  function stopIt() {
    clearInterval(loop);
    setTriggered(false);
    setTime(0);
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{
            backgroundColor: "white",
            border: "solid",
            borderWidth: "0.5px",
          }}
          //   onClick={() => beatIt()}
        >
          Beat
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => beat500()} active={time === 500}>
            0.5 beats/sec
          </Dropdown.Item>
          <Dropdown.Item onClick={() => beat1000()} active={time === 1000}>
            1 beat/sec
          </Dropdown.Item>
          <Dropdown.Item onClick={() => stopIt()} active={time === 0}>
            No Beat
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
