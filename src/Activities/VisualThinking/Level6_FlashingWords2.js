import Button from "react-bootstrap/Button";
import React from 'react';
import { random } from "lodash";

class Level6_FlashingWords2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityComplete: false,
            activityStarted: false,
            currentIndex: 0,
            currentCorrectWord: "",
            display: 0,
            wordArrays: [["out", "ours", "ouch", "our"],
                        ["neat", "need", "needle", "needy"],
                        ["stir", "stint", "stilt", "still"],
                        ["should", "shout", "showed", "shoulder"],
                        ["reel", "real", "read", "rear"],
                        ["toe", "the", "tie", "she"],
                        ["draws", "drawn", "draw", "dray"],
                        ["can", "con", "cans", "car"],
                        ["that", "then", "thin", "than"],
                        ["cause", "curse", "cues", "case"],
                    ],
            correctWordArray: [],
            totalCorrect: 0,
            word0answer: "whitetext",
            word1answer: "whitetext",
            word2answer: "whitetext",
            word3answer: "whitetext",
            currentWordOrientation: "normalOrientation",
        };
        this.startActivity = this.startActivity.bind(this);
        this.clickWord = this.clickWord.bind(this);
        this.nextSet = this.nextSet.bind(this);
    }

    componentDidMount() {
        console.log(React.version);
        console.log("in flashing words 2")
        this.setState({correctWordArray: new Array(this.state.wordArrays.length).fill(0)});
    }

    startActivity(e){
        this.setState({activityStarted: true})
        this.setState({activityComplete: false})
        this.setState({totalCorrect: 0 })
        this.nextSet(0)
    }

    nextSet(index){
        let orientation = Math.random()
        if (orientation <= 0.2){
            this.setState({currentWordOrientation: "normalOrientation"})
        } else if(orientation <= 0.4){
            this.setState({currentWordOrientation: "flippedOrientation"})
        }else if (orientation <= 0.6){
            this.setState({currentWordOrientation: "rotate90Orientation"})
        } else if(orientation <= 0.8){
            this.setState({currentWordOrientation: "rotate180Orientation"})
        }else{
            this.setState({currentWordOrientation: "rotate270Orientation"})
        }

        this.setState({currentIndex: index})
        let randomIndex = Math.floor(Math.random() * 4)
        let correctWordArray = this.state.correctWordArray
        correctWordArray[index] = randomIndex
        let correctWord = this.state.wordArrays[index][randomIndex]
        this.setState({currentCorrectWord: correctWord})

        setTimeout(() => {
            this.setState({display: 0})
        }, 1000);

        this.setState({display: 1})
        this.setState({word0: this.state.wordArrays[index][0]})
        this.setState({word1: this.state.wordArrays[index][1]})
        this.setState({word2: this.state.wordArrays[index][2]})
        this.setState({word3: this.state.wordArrays[index][3]})

        this.setState({correctWordArray: correctWordArray})
    }

    clickWord(e){
        if(this.state.correctWordArray[this.state.currentIndex] == e){
            this.setState({totalCorrect: this.state.totalCorrect + 1 })
            this.setState({["word" + e + "answer"]: "greentext"})
        } else{
            this.setState({["word" + e + "answer"]: "redtext"})
        }
        setTimeout(() => {
            if(this.state.currentIndex == this.state.correctWordArray.length - 1){
                this.setState({["word" + e + "answer"]: "whitetext"})
                this.setState({activityComplete: true})
                this.setState({activityStarted: false})
            } else{
                this.setState({["word" + e + "answer"]: "whitetext"})
                this.nextSet(this.state.currentIndex + 1)
            }
        }, 1000);
    }

    render() {
        return (
            <div className="activity_box">
                <div className="container">
                    {this.state.display == 1 && !this.state.activityComplete && <div id={this.state.currentWordOrientation}>{this.state.currentCorrectWord}</div>}
                    {this.state.display == 0 && !this.state.activityComplete && <div>
                        <div onClick={() => this.clickWord(0)} id={this.state.word0answer}>{this.state.word0}</div>
                        <div onClick={() => this.clickWord(1)} id={this.state.word1answer}>{this.state.word1}</div>
                        <div onClick={() => this.clickWord(2)} id={this.state.word2answer}>{this.state.word2}</div>
                        <div onClick={() => this.clickWord(3)} id={this.state.word3answer}>{this.state.word3}</div>
                    </div>}
                    {this.state.activityComplete && <div id="whitetext">You scored {this.state.totalCorrect} out of {this.state.wordArrays.length} <br/> {this.state.totalCorrect==this.state.wordArrays.length ? "Good job!" : "Keep trying!"}</div>}
                </div>
                <div className="button_section">
                    <Button disabled={this.state.activityStarted} onClick={() => this.startActivity()}>Start</Button>
                </div>
            </div>
        );
    }
}

export default Level6_FlashingWords2;