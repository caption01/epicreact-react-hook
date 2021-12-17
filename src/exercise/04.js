// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import { useState, useEffect } from 'react'

const newSquares = Array(9).fill(null)

// const serializer = (obj) => JSON.stringify(obj)
// const deSerializer = (serialized) => JSON.parse(serialized)

// const useLocalStorageState = (key, initialValue = '') => {
//   const [state, setState] = useState(initialValue)

//   useEffect(() => {
//     const serialed = serializer(state)
//     window.localStorage.setItem(key, serialed)
//   }, [key, state])
  
//   return [state, setState]
// }

function Board({ squares, setSquares}) {

  function selectSquare(square) {
    const winner = calculateWinner(squares)

    if (winner) return 

    const nextValue = calculateNextValue(squares)

    let nextSquares = [...squares]
    nextSquares[square] = nextValue
  
    setSquares(nextSquares)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function renderMoves(steps, moveIndex, onMoveClick){
  const moves = steps.map((item, index) => {
    const current = moveIndex === index
    const text = index ? 'Game To Move #' : 'Go To game start'

    return (
      <li key={index}>
        <button disabled={current} onClick={() => onMoveClick(index)}>
          {text} {current ? '(current)' : null}
        </button>
      </li>
    )
  })

  return moves
}

function Game() {
  const [steps, setSteps] = useState([newSquares])
  const [moveIndex, setMoveIndex] = useState(0)

  const currentSquares = steps[moveIndex]

  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)

  const status = calculateStatus(winner, currentSquares, nextValue)
  const moves = renderMoves(steps, moveIndex, setMoveIndex)

  function handleSetCurrentSquares(nextSquares){
    const nextMove = moveIndex + 1

    const nextSteps = [...steps.slice(0, nextMove), nextSquares]

    setMoveIndex(nextMove)
    setSteps(nextSteps)
  }

  function reset(){
    setMoveIndex(0)
    setSteps([newSquares])
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} setSquares={handleSetCurrentSquares} />
        <button className="restart" onClick={reset}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
