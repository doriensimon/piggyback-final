export default function NextCheckCountLetter(props) {
  return (
    <div>
      <button
        onClick={() => props.displayAnswer(true)}
        style={{ display: props.displayCheck }}
        disabled={props.disableCheck}
      >
        Check
      </button>
      <button onClick={() => props.displayFunc()} disabled={props.disableNext}>
        Next
      </button>
    </div>
  );
}
