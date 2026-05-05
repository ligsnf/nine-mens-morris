import React from 'react'
import { Position } from '../models/Position'
import Piece from './Piece'

type Props = {
    position: Position | null
}

const PositionComponent = ({ position }: Props) => {

    let content = <div></div>

    if (position) {
        content = (<div className={`bg-yellow-950 rounded-full w-4 h-4 flex ${position.getIsValidMove() && "group-hover:shadow-[0_0px_4px_4px_rgba(34,197,94,1)]"}`}>
            <div className={`grow rounded-full animate-pulse ${position.getIsValidMove() && "shadow-[0_0px_4px_4px_rgba(34,197,94,1)]"}`}></div>
        </div>)
    } 

    if (position?.getPiece()) {
        content = <Piece piece={position.getPiece()} isValidMove={position.getIsValidMove()} />
    }

    return (
        content
    )
}

export default PositionComponent
