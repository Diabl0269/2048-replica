import React, { createContext, useState, useContext, useEffect } from 'react'
import { Alert } from 'react-native'
import Game from '../game/Game'
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

  const move = async (direction) => {
    const { message } = game.move(direction, board)
    setBoard(game.board)
    setCurScore(game.score)
    if (curScore > highScore) {
      setHighScore(curScore)
      await setHighScoreAsync(highScore)
    }
    if (message) Alert.alert(message)
  }

  return (
    <GameContext.Provider
      value={{ board: board.tiles, newGame, move, curScore, highScore }}
      {...props}
    />
  )
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
