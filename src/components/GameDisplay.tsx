import { useState, useEffect } from "react";
import { Game, GameType } from "../models/Game";
import { Piece } from "../models/Piece";
import Board from "./Board";
import GameOverModal from "./GameOverModal";
import ErrorAlert from "./ErrorAlert";
import PiecesLeft from "./PiecesLeft";
import PieceUI from "./Piece";
import ChooseGameMode from "./ChooseGameMode";

const GameDisplay = () => {
  // Initialize the game
  const [gameMode, setGameMode] = useState(GameType.Unset);
  const [game, setGame] = useState(new Game(gameMode));
  const [showGameOver, setShowGameOver] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("false");

  useEffect(() => {
    if (game.getIsGameOver()) {
      setShowGameOver(true);
    }

    return () => { };
  }, [game]);

  const startNewGame = () => {
    setGameMode(GameType.Unset);
  };

  const chooseGameMode = (gameMode: GameType) => {
    setGameMode(gameMode);
    setGame(new Game(gameMode));
  };

  const handlePieceClick = (index: number) => {
    if (game.getIsGameOver()) {
      return;
    } // cannot click if game is over
    // Handle move based on move type
    try {
      switch (game.getCurrentPlayer().getMoveType()) {
        case "remove":
          game
            .getBoard()
            .removeSelectedPiece(
              index,
              game.getCurrentPlayer(),
              game.getOtherPlayer()
            );
          break;
        case "place":
          game.getBoard().placeSelectedPiece(index, game.getCurrentPlayer());
          break;
        case "slide":
          game.getBoard().moveSelectedPiece(index, game.getCurrentPlayer());
          break;
        case "fly":
          game.getBoard().moveSelectedPiece(index, game.getCurrentPlayer());
          break;
        default:
          break;
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      setShowErrorAlert(true);
      game.getBoard().setIsMoveSuccess(false);
    }
    if (game.getBoard().getIsMoveSuccess()) {
      game.getBoard().setIsMoveSuccess(false);
      game.checkMillFormed();
    }
    game.getBoard().refreshValidMoves(game.getCurrentPlayer());
    updateGameState();
  };

  const updateGameState = () => {
    // Update the game state
    const gameState = game.getState();
    setGame(new Game(gameMode, gameState));
  }

  // Text to show above board
  let statusText;
  if (!game.getIsGameOver()) {
    switch (game.getCurrentPlayer().getMoveType()) {
      case "remove":
        statusText = "Remove opponent's piece";
        break;
      case "place":
        statusText = "Place a piece";
        break;
      case "slide":
        if (game.getBoard().getSelectedPiece() == -1) {
          statusText = "Select a piece";
        } else {
          statusText = "Move your piece";
        }
        break;
      case "fly":
        if (game.getBoard().getSelectedPiece() == -1) {
          statusText = "Select a piece";
        } else {
          statusText = "Move your piece";
        }
        break;
      default:
        break;
    }
  } else {
    statusText = game.checkGameOver(
      game.getCurrentPlayer(),
      game.getOtherPlayer()
    );
  }

  // Render the game board
  return (
    <>
      {showGameOver && (
        <GameOverModal
          setShowModal={setShowGameOver}
          setNewGame={startNewGame}
          gameOverMessage={game.checkGameOver(
            game.getCurrentPlayer(),
            game.getOtherPlayer()
          )}
          winningPlayer={game.getWinner()}
        />
      )}
      {showErrorAlert && (
        <ErrorAlert setShowAlert={setShowErrorAlert} errorMsg={errorMsg} />
      )}
      <div className="flex flex-col items-center justify-center relative">
        {gameMode == GameType.Unset && (
          <div className="absolute inset-0 z-10">
            <ChooseGameMode chooseGameMode={chooseGameMode} />
          </div>
        )}
        <div className="mb-10 flex bg-amber-100 p-4 rounded text-black w-96">
          <div className="flex-1">
            <PieceUI
              piece={new Piece(game.getCurrentPlayer().getColour())}
              isValidMove={false}
            />
          </div>
          <h3 className="flex-[10] justify-center text-lg">{statusText}</h3>
        </div>
        <section className="flex justify-between gap-12">
          <div className="grid items-center">
            <PiecesLeft player={game.getPlayerWhite()} />
          </div>
          <Board game={game} handlePieceClick={handlePieceClick} />
          <div className="grid items-center">
            <PiecesLeft player={game.getPlayerBlack()} />
          </div>
        </section>
        <button className="mt-8" onClick={startNewGame}>
          Reset
        </button>
      </div>
    </>
  );
};

export default GameDisplay;
