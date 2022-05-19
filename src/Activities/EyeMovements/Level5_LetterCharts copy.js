import Button from "react-bootstrap/Button";
import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";

class Level5_LetterCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            letters: "abcdefghijklmnopqrstuvwxyz",
            grid: [
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
              ],
              chart: "lowerCase",
              fontSize: 24,
        };
        this.nextActivity = this.nextActivity.bind(this);
        this.setBeatRate = this.setBeatRate.bind(this);
        this.setChart = this.setChart.bind(this);
        this.setCharacterSize = this.setCharacterSize.bind(this);
    }

    componentDidMount() {
        console.log(React.version);
    }

    setChart(chart){
        this.setState({chart: chart})
    }

    setBeatRate(){
        //TODO: requires sounds
    }

    setCharacterSize(size){
        this.setState({fontSize: size})
    }

    nextActivity(e){
        let localChart = this.state.chart;

        let localGrid = this.state.grid;

        for(let i = 0; i < 10; i++){
            for (let j = 0; j < 10; j++){
                var randomNum = Math.floor(Math.random() * 25);
                localGrid[i][j] = this.state.letters[randomNum];
                if(localChart == "upperCase"){
                    localGrid[i][j] = localGrid[i][j].toUpperCase();
                }
                else if (localChart == "mixedCase"){
                    var chart = Math.random();
                    if (chart < 0.5){
                        localGrid[i][j] = localGrid[i][j].toUpperCase();
                    }
                }
            }
        }
        this.setState({grid: localGrid})
    }

    render() {
        return (
            <div className="activity_box">
                <div className="options">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">Beat Rate</Dropdown.Toggle>
                        <Dropdown.Menu className="option_select">
                            <Dropdown.Item onClick={() => this.setBeatRate(1)}  active={this.state.level == 1 ? true : false}>
                                0.50 Second
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                0.60 Second
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                0.70 Second
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                0.80 Second
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                0.90 Second
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                1.00 Second
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                1.20 Seconds
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                1.40 Seconds
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                1.60 Seconds
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                1.80 Seconds
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setBeatRate(2)} active={this.state.level == 2 ? true : false}>
                                2.00 Seconds
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">Chart</Dropdown.Toggle>
                        <Dropdown.Menu className="option_select">
                            <Dropdown.Item onClick={() => this.setChart("upperCase")} active={this.state.numDots == 3 ? true : false}>
                                Upper Case
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setChart("lowerCase")} active={this.state.numDots == 4 ? true : false}>
                                Lower Case
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setChart("mixedCase")} active={this.state.numDots == 5 ? true : false}>
                                Mixed Case
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">Character Size</Dropdown.Toggle>
                        <Dropdown.Menu className="option_select">
                            <Dropdown.Item onClick={() => this.setCharacterSize(24)} active={this.state.numDots == 3 ? true : false}>
                                Small (24 Point)
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setCharacterSize(30)} active={this.state.numDots == 4 ? true : false}>
                                Medium (30 Point)
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setCharacterSize(36)} active={this.state.numDots == 5 ? true : false}>
                                Normal (36 Point)
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setCharacterSize(42)} active={this.state.numDots == 5 ? true : false}>
                                Large (42 Point)
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="container">
                    <div className="grid">
                        <div>{this.state.row1}</div>
                        <div>{this.state.row2}</div>
                        <div>{this.state.row3}</div>
                        <div>{this.state.row4}</div>
                        <div>{this.state.row5}</div>
                        <div>{this.state.row6}</div>
                        <div>{this.state.row7}</div>
                        <div>{this.state.row8}</div>
                        <div>{this.state.row9}</div>
                        <div>{this.state.row10}</div>
                    </div>    
                    <div>
                        <table className="table">
                            <tr className="tableRow">
                                {this.state.grid[0].map((item, index) => {
                                return <td style={{fontSize:this.state.fontSize}} className="tableItem">{item}</td>;
                                })}
                            </tr>
                            <tbody>
                            {this.state.grid.slice(1, this.state.grid.length).map((item, index) => {
                                return (
                                <tr className="tableRow">
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[0]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[1]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[2]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[3]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[4]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[5]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[6]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[7]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[8]}</td>
                                    <td style={{fontSize:this.state.fontSize}} className="tableItem">{item[9]}</td>
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div> 
                </div>
                <div className="button_section">
                    <Button onClick={() => this.nextActivity()}>Next Chart</Button>
                </div>
            </div>
        );
    }
}

export default Level5_LetterCharts;