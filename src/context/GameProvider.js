import React, { createContext, useState, useContext } from 'react'
import Game from '../game/Game'
import isMovingKey from '../utils/isMovingKey'

const GameContext = createContext()
const GameProvider = (props) => {
  const game = new Game()
  const [board, setBoard] = useState(game.board)

  //Should find another solution for rendernig
  const [forceRender, setRender] = useState(false)

  const newGame = () => {
    //Should find another solution for rendernig
    setRender(!forceRender)

    game.initGame()
    setBoard(game.board)
  }

  const move = (e) => {
    e.preventDefault()
    const { key } = e
    if (isMovingKey(key)) {
      game.move(key, board)
      setBoard(game.board)
    }
  }

  return <GameContext.Provider value={{ board: board.tiles, newGame, move }} {...props} />
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
