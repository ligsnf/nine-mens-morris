import { Board } from './Board';
import { PieceColour } from './Piece';
import { Player } from './Player';
import { Position } from './Position';

export class RuleChecker {
    private board: Board;
    private millsFormed: { [key: string]: boolean };

    constructor(board: Board = new Board()) {
        this.board = board;
        this.millsFormed = {
            '0-6': false,
            '0-42': false,
            '6-48': false,
            '42-48': false,
            '8-12': false,
            '8-36': false,
            '12-40': false,
            '36-40': false,
            '16-18': false,
            '16-30': false,
            '18-32': false,
            '30-32': false,
            '3-17': false,
            '21-23': false,
            '25-27': false,
            '31-45': false,
        }
    }

    getBoard(): Board {
        return this.board;
    }

    /*This fuction will return an array of valid moves for a given player, the form of the array is: [from, to].
    if from is undefined, it means the player can place a piece on the board. If to is undefined, it means the player 
    can remove the piece from the board.
    */
    getValidMoves(player: Player, moveMade: boolean): (number | undefined)[][] {
        const validMoves: (number | undefined)[][] = [];
        //If the player has made a move, check if they can remove a piece from the board
        if(moveMade){
            //If a mill is formed from the previous move, the player can remove any piece from the board
            if(this.checkMillFormed()){
                const removalArray: number[] = this.getValidRemovals(player);
                for(let i = 0; i < removalArray.length; i++){
                    validMoves.push([removalArray[i], undefined]);
                }
            }
        }
        else{
            if (player.getPiecesLeft() > 0) {
                //If the player has pieces that are yet to be placed, they can place their pieces on the board
                const placementArray = this.getValidPlacements();
                for (let i = 0; i < placementArray.length; i++) {
                    validMoves.push([undefined, placementArray[i]]);
                }
            }
            else if (player.getPiecesOnBoard() >= 3) {
                //If the player has more than 3 pieces on the board, they can slide their pieces
                const slideArray = this.getValidSlides(player);
                for (let i = 0; i < slideArray.length; i++) {
                    validMoves.push(slideArray[i]);
                }
            }
            else {
                //If the player has less than 3 pieces on the board, they can fly their pieces
                const flightArray = this.getValidFlights(player);
                for (let i = 0; i < flightArray.length; i++) {
                    validMoves.push(flightArray[i]);
                }
            }
        }
        
        return validMoves;
    }

    //This function will return a list of valid positions for a given player to place a piece.
    getValidPlacements(): number[] {
        const validPlacements: number[] = [];
        this.getBoard().getValidPosition().forEach((positionIndex) => {
            //Check if the valid position is empty
            if (this.getBoard().getPosition(positionIndex).getPiece() == undefined) {
                validPlacements.push(positionIndex);
            }
        });
        return validPlacements;
    }

    //This function will return a list of valid indexes of pieces a player can select.
    getValidSelections(player: Player): number[] {
        const validSelections: number[] = [];
        this.getBoard().getValidPosition().forEach((positionIndex) => {
            const currentPosition: Position = this.getBoard().getPosition(positionIndex);
            //Check if the position is not empty and if the colour of the current piece is the same as the players
            if (currentPosition.getPiece() != undefined && player.getColour() == currentPosition.getPiece()?.getColour()) {
                validSelections.push(positionIndex);
            }
        });
        return validSelections;
    }

    //This function will return a list of valid moves for a given player to slide a piece.
    getValidSlides(player: Player): number[][] {
        const validSlides: number[][] = [];
        //For each position on the board, check if the position is empty and if the colour of the current piece is the same as the players
        this.getBoard().getValidPosition().forEach((positionIndex) => {
            const currentPosition: Position = this.getBoard().getPosition(positionIndex);
            currentPosition.getNeighbours().forEach((neighbourIndex) => {
                const neighbourPosition: Position = this.getBoard().getPosition(neighbourIndex);
                //Check if the neighbour position is empty and if the colour of the current piece is the same as the players
                if (neighbourPosition.getPiece() == undefined && player.getColour() == currentPosition.getPiece()?.getColour()) {
                    validSlides.push([positionIndex, neighbourIndex]);
                }
            });
        });
        return validSlides;
    }

    //Similar to getValidSlides but only returns an array of valid destinations for a given position
    getValidSlideDestinations(player: Player, positionIndex: number): number[] {
        const validSlides: number[] = [];
        const currentPosition: Position = this.getBoard().getPosition(positionIndex);
        currentPosition.getNeighbours().forEach((neighbourIndex) => {
            const neighbourPosition: Position = this.getBoard().getPosition(neighbourIndex);
            //Check if the neighbour position is empty and if the colour of the current piece is the same as the players
            if (neighbourPosition.getPiece() == undefined && player.getColour() == currentPosition.getPiece()?.getColour()) {
                validSlides.push(neighbourIndex);
            }
        });
        return validSlides;
    }

    //This function will return a list of valid moves for a given player to fly a piece.
    getValidFlights(player: Player): number[][] {
        const validFlights: number[][] = [];
        this.getBoard().getValidPosition().forEach((positionIndex) => {
            const currentPosition: Position = this.getBoard().getPosition(positionIndex);
            //Check if the current position is empty and if the colour of the current piece is the same as the players
            if (currentPosition.getPiece() == undefined && player.getColour() == currentPosition.getPiece()?.getColour()) {
                validFlights.push([positionIndex]);
            }
        });
        return validFlights;
    }

    //This function will return a list of valid positions for a given player to remove a piece.
    getValidRemovals(player: Player): number[] {
        const validRemovals: number[] = [];
        const validRemovalsMill: number[] = [];
        this.getBoard().getValidPosition().forEach((positionIndex) => {
            const currentPosition: Position = this.getBoard().getPosition(positionIndex);
            //Check if the current position is not empty and if the colour of the current piece is not the same as the players
            if (currentPosition.getPiece() != undefined && player.getColour() != currentPosition.getPiece()?.getColour()) {
                //Check if the piece is in a mill
                var inMill: boolean = false;
                for (const key of Object.keys(this.millsFormed)) {
                    // key has an output of: '0-6', '0-42', '6-48', ...
                    if(this.millsFormed[key]){
                        const currentMill = this.board.getMill(key);
                        if(currentMill.getPositions().includes(currentPosition)){
                            inMill = true;
                        }
                    }
                }
                //Categories the valid removals into two arrays, one for pieces in a mill and one for pieces not in a mill
                if(inMill){
                    validRemovalsMill.push(positionIndex);
                }
                else{
                    validRemovals.push(positionIndex);
                }
                
            }
        });
        //If there no valid single pieces to remove, return the pieces in a mill
        if(validRemovals.length == 0){
            for(let i = 0; i < validRemovalsMill.length; i++){
                validRemovals.push(validRemovalsMill[i]);
            }
        }
        return validRemovals;
    }
    //This function will check if a mill has been formed and return a boolean
    checkMillFormed(): PieceColour | boolean {
        var newMillFormed: boolean = false;
        //This funtion will return the color of the player who formed a mill, otherwise undefined.
        for (const key of Object.keys(this.millsFormed)) {
            // key has an output of: '0-6', '0-42', '6-48', ...
            const currentMill = this.board.getMill(key);
            //If this current mill is formed from the recent move
            if(currentMill.isMillFormed()){
                //If it was not formed in the last move, set the value of the millFormed to true
                if(!this.millsFormed[key]){
                    this.millsFormed[key] = currentMill.isMillFormed();
                    newMillFormed = true;
                }
            }
            else{
                //If this current mill is not formed and the previous mill was formed, set the value of the millFormed to false
                if(this.millsFormed[key]){
                    this.millsFormed[key] = currentMill.isMillFormed();
                }
            }
        }
        return newMillFormed;
    }

}
