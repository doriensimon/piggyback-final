export default function NextCheckButtons(props) {
  return (
    <div>
      <button
        onClick={() => props.displayFunc("check")}
        style={{ display: props.displayCheck }}
        disabled={props.check}
      >
        Check
      </button>
      <button onClick={() => props.displayFunc("next")}>Next</button>
    </div>
  );
}
