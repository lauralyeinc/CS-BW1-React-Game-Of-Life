import React, { Component } from 'react';
import '../styling/game.css';
import Cell from './cell.js';
import Menu from './Menu.js';

// presets 
import { preset1 } from './presets/preset1';
import { preset2 } from './presets/preset2';
import { preset3 } from './presets/preset3';


const cell_size = 20;
const width = 800;
const height = 600;

class Game extends Component {
    constructor() {
        super();
        this.rows = height/cell_size;
        this.cols = width/cell_size;
        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: [],
        interval: 100,
        isRunning: false,
        generationCount: 0,
        boardColor: true
    }

    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];

            for (let x = 0; x < this.cols; x++ ) {
                board[y][x] = false; 
            }
        }
        return board;
    }

    // creates the cell list from the board state
    makeCells() {
        let cells = [];

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells; 
    }

    // calcuates position of the board elements
    getElementOffset() {
        const rect = this.boardRef.getBoudingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    // get the click position of the board element
    handleClick = event => {
        const elemOffset = this.getElementOffset();

        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y; 

        const x = Math.floor(offsetX/cell_size);
        const y = Math.floor(offsetY/cell_size);

        if (this.state.isRunning === false && 
            x >= 0 &&
            x <= this.cols &&
            y >= 0 &&
            y <= this.rows) {
                this.board[y][x] = !this.board[y][x];
            }
            this.setState({ cells: this.makeCells() });
    }

    runGame = () => {
        this.setState({
            isRunning: true
        });

        this.runIteration();
    }

    stopGame = () => {
        this.setState({
            isRunning: false
        });

        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runIteration() {
        let newBoard = this.makeEmptyBoard();

        // rules of the game
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {

                let neighbors = this.calculateNeighbors(this.board, x, y);

                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }
        this.board = newBoard; 

        this.setState({
            cells: this.makeCells()
        });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
            this.state.generationCount++
        }, this.state.interval);
    }

    calculateNeighbors(board, x, y) {
        let neighbors = 0;

        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]; 

        for (let i = 0; i < dirs.length; i ++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1]; 

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }
        return neighbors; 
    }

    handleIntervalChange = event => {
        this.setState({
            interval: event.target.value
        });
    }

    //randomize cells 
    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.5);
            }
        }
        this.setState({ cells: this.makeCells() }); 
    }

    // clear the cells 
    handleClear = () => {
        this.board = this.makeEmptyBoard();
        // this.setState({ generationCount: 0}) ??
        this.setState({
            cells: this.makeCells()
        });
    }

    // Preset 1
    preset1 = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {

            this.board[y][x] = preset1[y][x];
            }
        }
        this.setState({ cells: this.makeCells() });
    }

  // Preset 2
    preset2 = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {

            this.board[y][x] = preset2[y][x];
            }
        }
        this.setState({ cells: this.makeCells() });
    }

  // Presets 3
    preset3 = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {

            this.board[y][x] = preset3[y][x];
            }
        }
        this.setState({ cells: this.makeCells() });
    }


    render() {
        const { cells, isRunning, interval } = this.state;
        
        return(
            <div className='main-area'>
                <div className='title-board'>
                    <h1> Conway's Game of Life</h1>

                    <div className='board' style={{
                        width: width,
                        height: height,
                        backgroundSize: `${cell_size}px ${cell_size}px`
                    }}
                    onClick={this.handleClick}
                    ref={event => {this.boardRef = event
                    }}>

                        {cells.map(cell => {
                            return (
                                <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
                            )})}
                    </div>
                </div>

                <div className='controls'>
                    <p> Generate # {this.state.generationCount} </p> <br /> 

                    <p> Update Every<br /> <input value={interval} onChange={this.handleIntervalChange} /><br/> msec</p>

                    {isRunning ? (
                        <button className='button' onClick={this.stopGame}> Stop </button> 
                            ):(
                        <button className='button' onClick={TouchList.runGame}>Start</button>
                    )}
                    <button className="button" onClick={this.handleClear}> Clear </button>
                    <button className='button' onClick={this.isRunning ? '' : this.handleRandom}> Random </button>

                    <button className="button" onClick={isRunning ? '' : this.preset1}>Preset 1</button>
                    <button className="button" onClick={isRunning ? '' : this.preset2}>Preset 2</button>
                    <button className="button" onClick={isRunning ? '' : this.preset3}>Preset 3</button>
                </div>

                <div className='rightside'>
                    <Menu />
                </div>
            </div>
        )
    }
}

export default Game; 

