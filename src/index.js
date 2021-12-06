import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*varianta cu functii, useState*/
const Square = ({value, onClick}) => {
    const style = value ? `squares ${value}` : `squares`;
    return (
        <button className={style} onClick={onClick}>
            {value}
        </button>
    )
}

const Board = ({squares, onClick}) => (
    <div className="board">
        {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)}/>
        ))}
    </div>
)

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const x0 = xIsNext ? "X" : "O";

    const handleClick = (i) => {

        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];

        if(winner ||  squares[i]) return;
        squares[i] = x0;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    };

    const renderMoves = () =>
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : "Go to start";
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>
                        {destination}
                    </button>
                </li>
            );
        });

    return (
        <>
            <h1>
                Tic Tac Toe
            </h1>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="info-wrapper">
                <h3>
                    History
                </h3>
                {renderMoves()}
            </div>
            <h3>
                {winner ?"Winner: " + winner : "Next player: " + x0}
            </h3>
        </>
    );
};

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(<Game />, document.getElementById("root"));

//originalul
/*function Square(props) {
    return (
        <button className={props.styleWon} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {

        if ( this.props.w)
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                styleWon = {this.props.styleWon[i]}
            />
        );
    }

    render() {
        const matrix=[]
        for (let i = 0; i < 3; i++) {
            const row = []
            for (let j = 0; j < 3; j++) {
                row.push(this.renderSquare(i * 3 + j))
            }
            matrix.push(<div className="board-row">{row}</div>)
        }
        return matrix;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            styleWon: Array(9).fill(""),
        };
    }

    handleClick(i) {
        const locations = [
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
            [3, 2],
            [1, 3],
            [2, 3],
            [3, 3]
        ];

        const history = this.state.history.slice(0, this.state.stepNumber + 1);;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const styleWon = this.state.styleWon.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                locations: locations[i],
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ===0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            let desc = move ?
                'Go to move #' + move + '->' + history[move].locations :
                'Go to game start';
            if (move === this.state.stepNumber) {
                desc = <b>{ desc }</b>
            }
            return (
                <li key={{move}}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}*/




