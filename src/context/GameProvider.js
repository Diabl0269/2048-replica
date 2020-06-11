import React, { createContext, useState, useContext, useEffect } from 'react'
import Game from '../game/Game'
import isMovingKey from '../utils/isMovingKey'
import {
  setHighScoreAsync,
  getHighScoreAsync
} from '../utils/asyncHighScoreStorege/asyncHighScoreStorage'

const GameContext = createContext()
const GameProvider = (props) => {
  const game = new Game()
  const [curScore, setCurScore] = useState(0)
  const [highScore, setHighScore] = useState()
  const [board, setBoard] = useState(game.board)
  const [forceRender, setForceRender] = useState(0)

  useEffect(() => {
    const fetchHighScore = async () => {
      const curHighScore = await getHighScoreAsync()
      setHighScore(curHighScore)
    }
    fetchHighScore()
  }, [])

  const newGame = () => {
    setCurScore(0)
    game.initGame()
    setBoard(game.board)
  }

  const move = async (e) => {
    const { key } = e
    let message
    if (isMovingKey(key)) {
      e.preventDefault()
      const { message: statusMessage } = game.move(key, board)
      message = statusMessage
      const newBoard = new Game(game.board, game.score)
      setBoard(newBoard.board)
    }
    setCurScore(game.score)
    if (curScore > highScore) {
      setHighScore(curScore)
      await setHighScoreAsync(highScore)
    }
    if (message) alert(message)
    setForceRender(forceRender + 1)
  }

  document.onkeydown = move

  return (
    <GameContext.Provider
      value={{ board: board.tiles, newGame, move, curScore, highScore }}
      {...props}
    />
  )
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
