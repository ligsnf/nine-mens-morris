import { Piece, PieceColour } from './Piece';

export class Position {
    //Attributes for the position class
    private piece: Piece | undefined;
    private neighbours: number[];
    private isValidMove?: boolean;

    constructor(piece?: Piece) {
        this.piece = piece;
        this.neighbours = [];
    }

    //Getter for the neighbouring positions
    getNeighbours(): number[] {
        return this.neighbours;
    }

    //Setter for neighbouring positions
    setNeighbours(neighbours: number[]) {
        this.neighbours = neighbours;
    }

    //Getter for the piece on the position
    getPiece(): Piece | undefined {
        return this.piece;
    }

    //Setter for the piece on the position
    setPiece(piece: Piece) {
        this.piece = piece;
    }

    //Setter to unset the piece on the position
    unsetPiece() {
        this.piece = undefined;
    }

    //Getter for whether the move to be on the position is valid
    getIsValidMove(): boolean | undefined {
        return this.isValidMove;
    }

    //Setter for whether the move to be on the position is valid
    setIsValidMove(isValidMove: boolean) {
        this.isValidMove = isValidMove;
    }
}

