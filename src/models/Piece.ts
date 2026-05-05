export enum PieceColour {
    White = 'white',
    Black = 'black',
}

export class Piece {
    //Class methods and attributes
    private colour: PieceColour;
    private isSelected: boolean;

    constructor(colour: PieceColour) {
        this.colour = colour;
        this.isSelected = false;
    }

    //Getters for the colour of the piece
    getColour(): PieceColour {
        return this.colour;
    }

    //Getter for whether the piece is selected
    getIsSelected(): boolean {
        return this.isSelected;
    }

    //Setter to update whether the piece is selected
    setIsSelected(isSelected: boolean) {
        this.isSelected = isSelected;
    }
}
