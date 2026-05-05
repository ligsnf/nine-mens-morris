import { PieceColour } from './Piece';

export class Player {
    //Attributes for the player class
    private colour: PieceColour;
    private piecesLeft: number;
    private piecesTaken: number;
    private piecesOnBoard: number;
    private isHuman: Boolean;
    private moveType?: string;

    //Constructor for the player class
    constructor(colour: PieceColour, isHuman: Boolean) {
        this.colour = colour;
        this.piecesLeft = 9;
        this.piecesTaken = 0;
        this.piecesOnBoard = 0;
        this.isHuman = isHuman;
    }

    //Getters and Setters
    getMoveType(): string {
        if (this.moveType)
            return this.moveType;
        else
        //Determine the move to play based on the number of pieces left
        if (this.piecesLeft > 0)
            return "place";
        else if (this.piecesOnBoard <= 3)
            return "fly";
        else
            return "slide";
    }

    //Setter to update the move type of the player
    setMoveType(moveType: string) {
        this.moveType = moveType;
    }

    //Setter to unset the move type of the player
    unsetMoveType() {
        this.moveType = undefined;
    }

    //Gettters for the colour of the player
    getColour(): PieceColour {
        return this.colour;
    }

    //Getter for the number of pieces left
    getPiecesLeft(): number {
        return this.piecesLeft;
    }

    //Getter for whether the player is human
    getIsHuman(): Boolean{
        return this.isHuman
    }

    //Setter to reduce the number of pieces left by 1
    decrementPiecesLeft(): void {
        if (this.piecesLeft - 1 !== -1)
            this.piecesLeft--;
    }

    //Getter for the number of pieces taken
    getPiecesTaken(): number {
        return this.piecesTaken;
    }

    //Setter methods to increase the number of pieces taken by 1
    incrementPiecesTaken(): void {
        this.piecesTaken++;
    }

    //Getter for the number of pieces on the board
    getPiecesOnBoard(): number {
        return this.piecesOnBoard;
    }

    //Increment the number of pieces on the board by 1
    incrementPiecesOnBoard(): void {
        this.piecesOnBoard++;
    }

    //Decrease the number of pieces on the board by 1
    decrementPiecesOnBoard(): void {
        this.piecesOnBoard--;
    }

}