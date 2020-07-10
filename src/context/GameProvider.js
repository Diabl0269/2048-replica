import React, { createContext, useState, useContext, useEffect } from 'react'
import Game from '../game/Game'
import isMovingKey from '../utils/isMovingKey'
import initBoardArray from '../utils/initBoardArray'
import {
  setHighScoreAsync,
  getHighScoreAsync
} from '../utils/asyncHighScoreStorege/asyncHighScoreStorage'
import { cloneDeep, isEqual } from 'lodash'
import makeParallelAnimations from '../utils/makeParallelAnimations'

const GameContext = createContext()
const GameProvider = (props) => {
  const [curScore, setCurScore] = useState(0)
  const [highScore, setHighScore] = useState()
  const [game, setGame] = useState(new Game())
  const [boardLayoutCoordinates, setBoardLayoutCoordinates] = useState(initBoardArray())
  const [isMoving, setIsMoving] = useState(false)
  // let isMoving = false
  const animationArr = []
  const arr = []

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

  useEffect(() => {
    // makeParallelAnimations(animationArr)
  }, [game])

  const newGame = () => {
    setCurScore(0)
    const newGame = cloneDeep(game)
    newGame.initGame()
    setGame(newGame)
  }

  const move = async (e) => {
    const { key } = e
    let message
    if (isMovingKey(key) && !isMoving) {
      e.preventDefault()
      setIsMoving(true)
      // isMoving = true

      const newGame = cloneDeep(game)
      newGame.board.deleteAllPrevLocations()
      const { message: statusMessage } = newGame.move(key)
      message = statusMessage
      if (!isEqual(game.board.getPiecesLocations(), newGame.board.getPiecesLocations())) {
        setGame(newGame)

        setCurScore(game.score)
        if (curScore > highScore) {
          setHighScore(curScore)
          await setHighScoreAsync(highScore)
        }
      }
      // isMoving = false
      setIsMoving(false)
    }

    if (message) alert(message)
  }

  const fixMergedPieces = () => {
    const newGame = cloneDeep(game)
    newGame.board.fixMergedPieces()
    setGame(newGame)
  }

  const setPieceAnimation = ({ pieceCoords: { x, y }, animation }) => {
    animationArr.push(animation)
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
        fixMergedPieces,
        setPieceAnimation
      }}
      {...props}
    />
  )
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
