import React, { createContext, useState, useContext, useEffect } from 'react'
import { Alert, Platform } from 'react-native'
import Game from '../game/Game'
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

  const move = async (direction) => {
    const newGame = cloneDeep(game)

    newGame.board.deleteAllPrevLocations()
    const { message } = newGame.move(direction)

    if (!isEqual(game.board.getPiecesLocations(), newGame.board.getPiecesLocations())) {
      setGame(newGame)
      setCurScore(newGame.score)
      if (curScore > highScore) {
        setHighScore(curScore)
        await setHighScoreAsync(highScore)
      }
    }

    if (message) Alert.alert(message)
  }

  const fixMergedPieces = () => {
    const newGame = cloneDeep(game)
    newGame.board.fixMergedPieces()
    setGame(newGame)
  }

  const setBoardCoordinates = ({ x, y, coordinates }) => {
    const newBoardCoords = boardLayoutCoordinates
    newBoardCoords[y][x] = coordinates
    setBoardLayoutCoordinates(newBoardCoords)
  }

  const setPieceAnimation = ({ pieceCoords: { x, y }, animation }) => {
    game.board.tiles[y][x].animation = animation
  }

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
        setPieceAnimation,
        fixMergedPieces
      }}
      {...props}
    />
  )
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
