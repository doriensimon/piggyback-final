import Button from "react-bootstrap/Button";
import React from 'react';
import { random } from "lodash";
import MenuOptions from "./flashingWords2Buttons"

class Level6_FlashingWords2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityComplete: false,
            activityStarted: false,
            currentIndex: 0,
            currentCorrectWord: "",
            display: 5,
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
            flashRate: 500,
            fontSize: "3em",
            check: false,

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

    changeFlash = (change) => {
        this.setState({flashRate: change})
    }

    changeSize = (change) => {
        this.setState({fontSize: change})
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    nextSet(index){
        if (index === 0) {
            this.setState({wordArrays: this.shuffle(this.state.wordArrays)})
            this.setState({activityStarted: true})
            this.setState({activityComplete: false})
            this.setState({totalCorrect: 0 })
        }
        this.setState({ activityStarted: true });
        this.setState({currentIndex: index})
        let randomIndex = Math.floor(Math.random() * 4)
        let correctWordArray = this.state.correctWordArray
        correctWordArray[index] = randomIndex
        let currArray = this.state.wordArrays[index]
        this.shuffle(currArray)
        let correctWord = currArray[randomIndex]
        this.setState({currentCorrectWord: correctWord})


        setTimeout(() => {
            this.setState({display: 2})
        }, this.state.flashRate);

        this.setState({display: 1})
        this.setState({word0: currArray[0]})
        this.setState({word1: currArray[1]})
        this.setState({word2: currArray[2]})
        this.setState({word3: currArray[3]})

        this.setState({correctWordArray: correctWordArray})
    }

    clickWord(e){
        if(this.state.correctWordArray[this.state.currentIndex] == e){
            this.setState({totalCorrect: this.state.totalCorrect + 1 })
            this.setState({["word" + e + "answer"]: "greentext"})
            this.setState({display: 3})
        } else{
            this.setState({["word" + e + "answer"]: "redtext"})
            this.setState({display: 4})
        }
        
        if(this.state.currentIndex == this.state.correctWordArray.length - 1){
            console.log("we got up in here man")
            this.setState({["word" + e + "answer"]: "whitetext"})
            this.setState({activityComplete: true})
            this.setState({activityStarted: false})
            this.setState({ currentIndex: 0 });
        } else{
            this.setState({["word" + e + "answer"]: "whitetext"})
            this.setState({ activityStarted: false });
            this.setState({currentIndex: this.state.currentIndex + 1})
        }
    }

    redo() {
        if (this.state.activityComplete) {
          this.setState({ activityComplete: false });
        }
        // setTimeout(() => {
        //   this.setState({ display: 0 });
        // }, this.state.displayTime);
        this.setState({ display: 1 });
        this.setState({check: true})
      }

    render() {
        return (
            <div className="activity_box">
                <MenuOptions 
                flashRate={this.changeFlash}
                flashBool={this.state.flashRate}
                changeActivity={this.changeSize}
                activityBool={this.state.fontSize}/>
                <div className="container">
                    {this.state.display == 3 && !this.state.activityComplete && (
                        <div id="correctText">Correct!</div>)}
                    {this.state.display == 4 && !this.state.activityComplete && (
                        <div id="incorrectText">Incorrect!</div>)}
                    {this.state.display == 1 && !this.state.activityComplete && <div className="whiteTextStyle" style={{fontSize: this.state.fontSize}}>{this.state.currentCorrectWord}</div>}
                    {this.state.display == 0 && !this.state.activityComplete && <div style={{marginTop: "-25%"}}>
                        <div onClick={() => this.clickWord(0)} id={this.state.word0answer} style={{fontSize: this.state.fontSize}}>{this.state.word0}</div>
                        <div onClick={() => this.clickWord(1)} id={this.state.word1answer} style={{fontSize: this.state.fontSize}}>{this.state.word1}</div>
                        <div onClick={() => this.clickWord(2)} id={this.state.word2answer} style={{fontSize: this.state.fontSize}}>{this.state.word2}</div>
                        <div onClick={() => this.clickWord(3)} id={this.state.word3answer} style={{fontSize: this.state.fontSize}}>{this.state.word3}</div>
                    </div>}
                    {this.state.activityComplete && <div id="whitetext">You scored {this.state.totalCorrect} out of {this.state.wordArrays.length} <br/> {this.state.totalCorrect==this.state.wordArrays.length ? "Good job!" : "Keep trying!"}</div>}
                </div>
                <div className="button_section">
                    <button onClick={() => this.redo()}
            disabled={!(this.state.display === 4)}>Check</button>
                    <button disabled={this.state.activityStarted} onClick={() => {this.nextSet(this.state.currentIndex); this.setState({check: false})}}>Next</button>
                    <button disabled={this.state.display !== 2} onClick={() => {
                        this.setState({display: 0})
                    }}>Display</button>
                </div>
            </div>
        );
    }
}

export default Level6_FlashingWords2;