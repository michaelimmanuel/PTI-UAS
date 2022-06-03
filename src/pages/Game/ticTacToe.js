import Board from './components/Board'
import Box from './components/Box'
import {useEffect, useState} from 'react'
import './ticTacToe.scss'

const defaultSquare = () => (new Array(9).fill(null));
const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const TicTacToe = ()=> {
    const [squares, setSquares] = useState(defaultSquare());
   
    useEffect( ()=>{
        const computerTurn = squares.filter(square => square !== null).length % 2 === 1;
        
        const linesWon = (a,b,c)=>{
            return lines.filter(squareIndex => {
                const squareVal = squareIndex.map(index => squares[index])
                return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareVal.sort())
            })
        }

        const emptyIndex = squares.map((square, index) => square === null ? index : null).filter(
            val => val !== null);
            
        const playerWon = linesWon("x", "x", "x").length > 0
        const computerWon = linesWon("o", "o", "o").length > 0

        if(playerWon){
            alert('Player Won')
            return;
        }
        if(computerWon){
            alert('Computer Won')
            return;
        }
        const putComputer = index => {
            let newSquares = squares;
            newSquares[index] = 'o';
            setSquares([...newSquares]);
        }
        if(computerTurn){

            const winingLines = linesWon("o", "o", "null");
            if(winingLines.length > 0){
                const winPos = winingLines[0].filter(index => squares[index] === null)[0];
                putComputer(winPos);
                return;
            }

            const lineBlock = linesWon("x", "x", null)
            if(lineBlock.length > 0){
                const blockIndex = lineBlock[0].filter(index => squares[index] === null)[0];
                putComputer(blockIndex);
                return;
            }

            const conditionLines = linesWon("o", null, null);
            if(conditionLines.length > 0){
                const conditionPos = conditionLines[0].filter(index => squares[index] === null)[0];
                putComputer(conditionPos);
                return
            }

            const randomIndex = emptyIndex[Math.floor(Math.random() * emptyIndex.length)];
            // play computer turn
            putComputer(randomIndex);
        }
        
    }, [squares]);

    const handleClick = (index) => {
        const turn = squares.filter(square => square !== null).length % 2 === 0;
        if (turn){
            let newSquares = squares;
            newSquares[index] = 'x';
            setSquares([...newSquares]);
        }
    }

    return (
        <div className='ticTacToe'>
            <Board>
                {squares.map((square,index)=> <Box 
                x={square=== 'x'?1:0}
                o={square=== 'o'?1:0}
                onClick={()=> handleClick(index)}/>)}
            </Board>
        </div>
    )
}

export default TicTacToe;