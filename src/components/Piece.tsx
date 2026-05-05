import React from 'react'
import { Piece, PieceColour } from '../models/Piece'

type Props = {
    piece: Piece | undefined,
    isValidMove: boolean | undefined
}

const PieceComponent = ({ piece, isValidMove }: Props) => {

    let pieceColour, pieceLetter
    if (piece) {
        switch (piece.getColour()) {
            case PieceColour.White:
                pieceColour = 'bg-white text-black'
                pieceLetter = 'W'
                break;
            case PieceColour.Black:
                pieceColour = 'bg-black text-white'
                pieceLetter = 'B'
                break;
            default:
                break;
        }
    }

    let selectedShadow
    if (piece?.getIsSelected() || isValidMove) {
        selectedShadow = "shadow-[0_0px_4px_4px_rgba(34,197,94,1)]"
    } else {
        selectedShadow = "shadow-[1px_2px_8px_2px_rgba(0,0,0,0.3)]"
    }

    return (
        <div className={`${pieceColour} ${selectedShadow} rounded-full w-8 h-8 grid items-center group-hover:shadow-[0_0px_4px_4px_rgba(34,197,94,1)]`}>{pieceLetter}</div>
    )
}

export default PieceComponent