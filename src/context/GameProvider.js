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

  useEffect(() => {
    const fetchHighScore = async () => {
      const curHighScore = await getHighScoreAsync()
      setHighScore(curHighScore)
    }
    fetchHighScore()
  }, [])

  //Should find another solution for rendernig
  const [forceRender, setRender] = useState(false)

  const newGame = () => {
    //Should find another solution for rendernig
    setRender(!forceRender)
    setCurScore(0)
    game.initGame()
    setBoard(game.board)
  }

  const move = async (e) => {
    e.preventDefault()
    const { key } = e
    let message
    if (isMovingKey(key)) {
      const { message: statusMessage} = game.move(key, board)
      message = statusMessage
      setBoard(game.board)
    }
    setCurScore(game.score)
    if (curScore > highScore) {
      setHighScore(curScore)
      await setHighScoreAsync(highScore)
    }
    if (message) alert(message)
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
