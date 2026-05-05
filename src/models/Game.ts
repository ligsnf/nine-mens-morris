import { Board } from './Board';
import { PieceColour } from './Piece';
import { Player } from './Player';

interface GameState {
    board: Board
    playerWhite: Player;
    playerBlack: Player;
    currentPlayer: Player;
    winner: Player | undefined;
    isGameOver: boolean;
}

export enum GameType {
    Unset = 'unset', // game type hasn't been set yet
    Human = 'human',
    Computer = 'computer',
}
export class Game {
    //Initialise class attributes
    private state: GameState;
    private gameMode: GameType;

    constructor(gameMode: GameType, state?: GameState) {
        this.gameMode = gameMode;

        if (state) {
            this.state = state
            return
        }
        //Initialise players based on game mode (Human or Computer)
        const playerWhite = new Player(PieceColour.White, true);
        var playerBlack: Player;
        if (this.gameMode == 'human') {
            playerBlack = new Player(PieceColour.Black, true);
        }
        else {
            playerBlack = new Player(PieceColour.Black, false);
        }

        //Initialise game state for a new game
        const defaultState: GameState = {
            board: new Board(),
            playerWhite: playerWhite,
            playerBlack: playerBlack,
            currentPlayer: playerWhite,
            winner: undefined,
            isGameOver: false,
        }
        //Set the initiliased game state
        this.state = defaultState
        this.state.board.showValidMoves(this.state.currentPlayer)
    }

    //Getter for game state
    getState(): GameState {
        return this.state;
    }

    //Getter for board
    getBoard(): Board {
        return this.state.board;
    }

    //Getter for current player
    getCurrentPlayer(): Player {
        return this.state.currentPlayer;
    }

    //Setter for current player
    setCurrentPlayer(player: Player) {
        this.state.currentPlayer = player;
    }

    //Getter for other player
    getOtherPlayer(): Player {
        if (this.state.currentPlayer === this.state.playerWhite) {
            return this.state.playerBlack;
        } else {
            return this.state.playerWhite;
        }
    }

    //This function will switch the current player to the other player
    updateCurrentPlayer() {
        this.state.currentPlayer = this.getOtherPlayer();
    }

    //Getter for game mode
    getGameMode(): GameType {
        return this.gameMode;
    }

    //Getter for player white
    getPlayerWhite(): Player {
        return this.state.playerWhite;
    }

    //Getter for player black
    getPlayerBlack(): Player {
        return this.state.playerBlack;
    }

    //Getter for winner
    getWinner(): Player | undefined {
        return this.state.winner;
    }

    //This function will retirn whether the game is over based on the game state
    getIsGameOver(): boolean {
        return this.state.isGameOver;
    }

    //Getter for rule checker
    getRuleChecker() {
        return this.state.board.getRuleChecker();
    }

    //Check if mill is formed and handle the case
    checkMillFormed() {
        const ruleChecker = this.getRuleChecker();
        //If a mill is formed, the current player gets to remove a piece. Else, the other player gets to play
        if (ruleChecker.checkMillFormed()) {
            this.state.currentPlayer.setMoveType("remove");
        } else {
            this.updateCurrentPlayer();
            //Before handing over the turn, check if the game is over
            this.checkGameOver(this.state.currentPlayer, this.getOtherPlayer());
            if (this.getIsGameOver()) {
                return
            }
            //If the other player is a computer, play a move for the computer
            if (!this.state.currentPlayer.getIsHuman()) {
                this.playComputerMove();
            }
        }
    }

    // Play a move for the computer
    playComputerMove() {
        const ruleChecker = this.getRuleChecker();
        let index;
        let selectedPiece;
        //Based on the state of the game and the move type of the current player, play a move for the computer
        switch (this.getCurrentPlayer().getMoveType()) {
            //If the current computer is able to place a piece, place a piece at a random valid location
            case "place":
                index = this.getRandom(ruleChecker.getValidPlacements())
                if (index !== undefined) {
                    this.state.board.placeSelectedPiece(index, this.getCurrentPlayer());
                }
                break;
            //If the current computer is able to slide a piece, slide a random piece to a random valid location
            case "slide":
                selectedPiece = this.getRandom(ruleChecker.getValidSlides(this.state.currentPlayer));
                if (selectedPiece !== undefined) {
                    this.state.board.checkSelectedPiece(selectedPiece[0], this.state.currentPlayer);
                    this.state.board.setSelectedPiece(selectedPiece[0]);
                    index = selectedPiece[1];
                    if (index !== undefined) {
                        this.state.board.moveSelectedPiece(index, this.state.currentPlayer);
                    }
                }
                break;
            //If the current computer is able to fly a piece, fly a random piece to a random valid location
            case "fly":
                index = this.getRandom(ruleChecker.getValidPlacements())
                selectedPiece = this.getRandom(ruleChecker.getValidSelections(this.state.currentPlayer));
                if (selectedPiece !== undefined) {
                    this.state.board.checkSelectedPiece(selectedPiece, this.state.currentPlayer);
                    this.state.board.setSelectedPiece(selectedPiece);
                    if (index !== undefined) {
                        this.state.board.moveSelectedPiece(index, this.state.currentPlayer);
                    }
                }
                break;
            default:
                break;
        }
        //If a mill is formed as a result of the computer's move, remove a random piece from the other player
        if (ruleChecker.checkMillFormed()) {
            const validRemovalIndexes = ruleChecker.getValidRemovals(this.state.currentPlayer);
            index = this.getRandom(validRemovalIndexes);
            if (index !== undefined) {
                this.state.board.removeSelectedPiece(index, this.getCurrentPlayer(), this.getOtherPlayer());
            }
        }
        //Switch over to the human player 
        this.updateCurrentPlayer();
        //Check game over after updating player
        this.checkGameOver(this.state.currentPlayer, this.getOtherPlayer());
        if (this.getIsGameOver()) {
            return
        }
    }

    // check if game is over and handle the case
    checkGameOver(currentPlayer: Player, otherPlayer: Player): string {
        let winMessage: string = ""
        //Check if any player has run out of pieces
        if (currentPlayer.getPiecesOnBoard() < 3 && currentPlayer.getPiecesLeft() === 0) {
            this.state.winner = otherPlayer;
            this.state.isGameOver = true;
            winMessage = `${currentPlayer.getColour()} has less than 3 pieces left`
        } else if (this.getRuleChecker().getValidMoves(currentPlayer, false).length === 0) {
            //If the current player has no valid moves, the other player wins
            this.state.winner = otherPlayer;
            this.state.isGameOver = true;
            winMessage = `${currentPlayer.getColour()} has no valid moves`
        } else {
            // game continues
        }
        return winMessage
    }

    //Return a random element from an array
    getRandom<T>(array: T[]): T | undefined {
        const filteredArray = array.filter(item => item !== undefined);
        const randomIndex = Math.floor(Math.random() * filteredArray.length);
        return filteredArray[randomIndex];
    }
}