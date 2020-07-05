import React, { createContext, useState, useContext, useEffect } from 'react'
import Game from '../game/Game'
import isMovingKey from '../utils/isMovingKey'
import initBoardArray from '../utils/initBoardArray'
import {
  setHighScoreAsync,
  getHighScoreAsync
} from '../utils/asyncHighScoreStorege/asyncHighScoreStorage'
import { cloneDeep } from 'lodash'
import makeParallelAnimations from '../utils/makeParallelAnimations'

const GameContext = createContext()
const GameProvider = (props) => {
  const [curScore, setCurScore] = useState(0)
  const [highScore, setHighScore] = useState()
  const [game, setGame] = useState(new Game())
  const [boardLayoutCoordinates, setBoardLayoutCoordinates] = useState(initBoardArray())
  const [appearAnimations, setAppearAnimations] = useState([])

  const setBoardCoordinates = ({ x, y, coordinates }) => {
    const newBoardCoords = boardLayoutCoordinates
    newBoardCoords[y][x] = coordinates
    setBoardLayoutCoordinates(newBoardCoords)
  }

  useEffect(() => {
    const fetchHighScore = async () => {
      const curHighScore = await getHighScoreAsync()
      setHighScore(curHighScore)
    }
    fetchHighScore()
  }, [])

  const newGame = () => {
    setCurScore(0)
    const newGame = cloneDeep(game)
    newGame.initGame()
    setGame(newGame)
  }

  const setPieceMovingAnimation = ({ pieceCoords: { x, y }, animation }) => {
    game.board.tiles[y][x].animation = animation
  }

  const move = async (e) => {
    const { key } = e
    let message

    if (isMovingKey(key)) {
      e.preventDefault()

      const newGame = cloneDeep(game)

      const { message: statusMessage } = newGame.move(key)
      message = statusMessage
      newGame.board.tiles = await makeParallelAnimations(newGame.board.tiles)
      setGame(newGame)
    }

    setCurScore(game.score)
    if (curScore > highScore) {
      setHighScore(curScore)
      await setHighScoreAsync(highScore)
    }

    if (message) alert(message)
  }

  const addAppearAnimation = (animation) => {
    console.log(animation)

    // const newAppearAnimations = cloneDeep(appearAnimations).concat([animation])

    // const newAppearAnimations = appearAnimations.concat([animation])
    // console.log(newAppearAnimations)
    setAppearAnimations(1)
  }

  document.onkeydown = move

  return (
    <GameContext.Provider
      value={{
        board: game.board.tiles,
        newGame,
        move,
        curScore,
        highScore,
        boardLayoutCoordinates,
        setBoardCoordinates,
        setPieceMovingAnimation,
        addAppearAnimation
      }}
      {...props}
    />
  )
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
