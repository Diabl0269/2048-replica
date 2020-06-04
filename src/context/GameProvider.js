import React, { createContext, useState, useContext } from 'react'
import Game from '../game/Game'
import isMovingKey from '../utils/isMovingKey'

const GameContext = createContext()
const GameProvider = (props) => {
  const game = new Game()
  const [board, setBoard] = useState(game.board)

  //Should find another solution for rendernig
  const [forceRender, setRender] = useState('x')

  const newGame = () => {
    //Should find another solution for rendernig
    setRender('y')
    game.initGame()
    setBoard(game.board)
  }

  document.onkeydown = ({ key }) => {
    if (isMovingKey(key)) {
      game.move(key, board)
      setBoard(game.board.tiles)
      
      setRender('y')
    }
  }

  return <GameContext.Provider value={{ board: board.tiles, newGame }} {...props} />
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
