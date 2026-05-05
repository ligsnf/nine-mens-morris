import { Piece, PieceColour } from './Piece'
import { Mill } from './Mill'
import { Position } from './Position'
import { Player } from './Player'
import { RuleChecker } from './RuleChecker'

export class Board {
    //Delcaring all the required class attributes
    private positions: (Position | null)[]
    private mills: { [key: string]: Mill }
    private selectedPiece: number
    private IsMoveSuccess: boolean
    private validMoves: number[]
    private ruleChecker: RuleChecker
    private validPositionsIndex: number[]

    //Constructor for the board class
    constructor() {
        this.positions = Array(49).fill(null)
        this.ruleChecker = new RuleChecker(this);

        const validPositions = [0, 3, 6, 8, 10, 12, 16, 17, 18, 21, 22, 23, 25, 26, 27, 30, 31, 32, 36, 38, 40, 42, 45, 48]
        const neighbours = [[3, 21], [0, 6, 10], [3, 27], [10, 22], [3, 8, 12, 17], [10, 26], [17, 23], [10, 16, 18], [17, 25], [0, 22, 42], [8, 21, 23, 36], [16, 22, 30], [18, 26, 32], [12, 25, 27, 40], [6, 26, 48], [23, 31], [30, 32, 38], [25, 31], [22, 38], [31, 36, 40, 45], [26, 38], [21, 45], [38, 42, 48], [27, 45]]


        this.validPositionsIndex = validPositions;
        //For all the valid positions, initialise a position object and set its neighbours
        for (let i = 0; i < validPositions.length; i++) {
            const index = validPositions[i]
            this.positions[index] = new Position()
            this.positions[index]?.setNeighbours(neighbours[i])
        }

        //Define each mill based on the positions and reference them by a key
        this.mills = {
            '0-6': new Mill([this.getPosition(0), this.getPosition(3), this.getPosition(6)]),
            '0-42': new Mill([this.getPosition(0), this.getPosition(21), this.getPosition(42)]),
            '6-48': new Mill([this.getPosition(6), this.getPosition(27), this.getPosition(48)]),
            '42-48': new Mill([this.getPosition(42), this.getPosition(45), this.getPosition(48)]),
            '8-12': new Mill([this.getPosition(8), this.getPosition(10), this.getPosition(12)]),
            '8-36': new Mill([this.getPosition(8), this.getPosition(22), this.getPosition(36)]),
            '12-40': new Mill([this.getPosition(12), this.getPosition(26), this.getPosition(40)]),
            '36-40': new Mill([this.getPosition(36), this.getPosition(38), this.getPosition(40)]),
            '16-18': new Mill([this.getPosition(16), this.getPosition(17), this.getPosition(18)]),
            '16-30': new Mill([this.getPosition(16), this.getPosition(23), this.getPosition(30)]),
            '18-32': new Mill([this.getPosition(18), this.getPosition(25), this.getPosition(32)]),
            '30-32': new Mill([this.getPosition(30), this.getPosition(31), this.getPosition(32)]),
            '3-17': new Mill([this.getPosition(3), this.getPosition(10), this.getPosition(17)]),
            '21-23': new Mill([this.getPosition(21), this.getPosition(22), this.getPosition(23)]),
            '25-27': new Mill([this.getPosition(25), this.getPosition(26), this.getPosition(27)]),
            '31-45': new Mill([this.getPosition(31), this.getPosition(38), this.getPosition(45)]),
        }

        //Initialise variables to keep track of the selected piece and valid moves
        this.IsMoveSuccess = false
        this.selectedPiece = -1
        this.validMoves = []
    }

    // Helper method to get positions
    public getPositions(): (Position | null)[] {
        return this.positions
    }

    // Helper method to get the position at a given row and column
    public getPosition(index: number): Position {
        const position = this.positions[index]
        // Alert if position is null
        if (position === null) {
            throw new Error(`No position found at index ${index}`)
        }
        return position
    }

    // Helper method to get the mill from a key
    public getMill(key: string): Mill {
        return this.mills[key]
    }

    // Helper method to get the piece at a given row and column
    private getPiece(index: number): Piece | undefined {
        return this.getPosition(index).getPiece()
    }

    // Set a piece on the board
    setPiece(index: number, currentPlayer: Player) {
        const position = this.getPosition(index)
        if (position.getPiece()) {
            throw new Error(`There is already a piece at (${index})`)
        } else {
            position.setPiece(new Piece(currentPlayer.getColour()))
        }
    }

    // Unset a piece on the board
    unsetPiece(index: number) {
        const position = this.getPosition(index)
        if (!position.getPiece()) {
            throw new Error(`There is no piece at (${index})`)
        } else {
            position.unsetPiece()
        }
    }


    // Place a piece on the board
    placeSelectedPiece(index: number, currentPlayer: Player) {
        const position = this.getPosition(index)
        if (!this.ruleChecker.getValidPlacements().includes(index)) {
            throw new Error("There is already a piece there.")
        }

        position.setPiece(new Piece(currentPlayer.getColour()))
        this.IsMoveSuccess = true
        currentPlayer.decrementPiecesLeft();
        currentPlayer.incrementPiecesOnBoard();
    }

    // Remove opponent's piece
    removeSelectedPiece(index: number, currentPlayer: Player, opponentPlayer: Player) {
        const position = this.getPosition(index)
        if (!this.ruleChecker.getValidRemovals(currentPlayer).includes(index)) {
            throw new Error("You can only remove a piece that is highlighted green.")
        }

        position.unsetPiece()
        this.IsMoveSuccess = true
        currentPlayer.incrementPiecesTaken()
        opponentPlayer.decrementPiecesOnBoard()
        currentPlayer.unsetMoveType()
    }

    // Select, slide or fly a piece on the board
    moveSelectedPiece(index: number, currentPlayer: Player) {
        const position = this.getPosition(index)
        // Select a piece on the board
        if (this.selectedPiece == -1 || currentPlayer.getColour() == position.getPiece()?.getColour()) {
            this.checkSelectedPiece(index, currentPlayer)
            this.setIsMoveSuccess(false);
            return
        }
        // Move a piece on the board
        if (!this.validMoves.includes(index)) {
            throw new Error("You can only move to a position highlighted green.")
        }
        else {
            if (!position.getPiece()) {
                //Remove the piece from old position
                this.getPosition(this.getSelectedPiece()).unsetPiece()
                //Place the piece in new position
                position.setPiece(new Piece(currentPlayer.getColour()))
                this.IsMoveSuccess = true
                this.unsetSelectedPiece()
            }
        }
    }

    // Select a piece on the board
    checkSelectedPiece(index: number, currentPlayer: Player) {
        if (!this.ruleChecker.getValidSelections(currentPlayer).includes(index)) {
            throw new Error("Please select a piece that is your colour.")
        }
        //This function will check if the interaction with a piece is valid
        switch (currentPlayer.getMoveType()) {
            case "slide":
                this.validMoves = this.ruleChecker.getValidSlideDestinations(currentPlayer, index)
                if (this.ruleChecker.getValidSlideDestinations(currentPlayer, index).length == 0) {
                    throw new Error("Cannot select piece: no valid move for this piece.")
                }
                break;
            case "fly":
                this.validMoves = this.ruleChecker.getValidPlacements()
                if (this.ruleChecker.getValidPlacements().length == 0) {
                    throw new Error("Cannot select piece: no valid move for this piece.")
                }
                break;
            default:
                throw new Error("Please choose your move type.")
                break;
        }
        this.setSelectedPiece(index)
    }

    //This function will determine all the valid moves for a player and highlight the relevant positions for that particular move
    showValidMoves(currentPlayer: Player) {
        //Depending on the move type, get the valid moves for the player by calling the rule checker
        switch (currentPlayer.getMoveType()) {
            case "remove":
                this.validMoves = this.ruleChecker.getValidRemovals(currentPlayer)
                break;
            case "place":
                this.validMoves = this.ruleChecker.getValidPlacements()
                break;
            case "slide":
                if (this.selectedPiece != -1) {
                    this.validMoves = this.ruleChecker.getValidSlideDestinations(currentPlayer, this.selectedPiece)
                } else {
                    this.validMoves = []
                }
                break;
            case "fly":
                if (this.selectedPiece != -1) {
                    this.validMoves = this.ruleChecker.getValidPlacements()
                } else {
                    this.validMoves = []
                }
                break;
            default:
                break;
        }
        //Highlight all the valid moves for the player
        for (const index of this.validMoves) {
            this.getPosition(index).setIsValidMove(true)
        }
    }

    //This function will clear all the valid moves for a player
    clearValidMoves() {
        //This for loop will clear all the valid moves for the current player
        for (const index of this.validPositionsIndex) {
            this.getPosition(index).setIsValidMove(false)
        }
    }

    // this function clears the valid moves from previous turn and shows the valid moves for the current turn
    refreshValidMoves(currentPlayer: Player) {
        this.clearValidMoves()
        this.showValidMoves(currentPlayer)
    }

    //This function handles the interaction of selecting a piece
    setSelectedPiece(index: number) {
        if (this.selectedPiece != -1) {
            this.getPiece(this.selectedPiece)?.setIsSelected(false)
        }
        this.getPiece(index)?.setIsSelected(true)
        this.selectedPiece = index
    }

    //This function will unset the selected piece
    unsetSelectedPiece() {
        this.getPiece(this.selectedPiece)?.setIsSelected(false)
        this.selectedPiece = -1
    }

    //Getter for the current selected piece
    getSelectedPiece(): number {
        return this.selectedPiece
    }

    //Getter for whether the execution of the move was successful
    getIsMoveSuccess(): boolean {
        return this.IsMoveSuccess
    }
    //Setter for whether the execution of the move was successful
    setIsMoveSuccess(isMoved: boolean) {
        this.IsMoveSuccess = isMoved
    }

    //Getter for the valid moves
    getValidPosition(): number[] {
        return this.validPositionsIndex;
    }

    //Getter for the rule checker
    getRuleChecker(): RuleChecker {
        return this.ruleChecker;
    }

}
