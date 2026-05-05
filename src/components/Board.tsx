import React from 'react'
import Position from "./Position";
import Mill from "./Mill";
import { Game } from "../models/Game";

type Props = {
    game: Game
    handlePieceClick: (index: number) => void
}

const BoardComponent = ({ game, handlePieceClick }: Props, ) => {

    
    return (
        <div className="board bg-amber-100 relative">
            {/* Render Mills */}
            <div>
                {/* Outer */}
                <Mill id="0-6" mill={game.getBoard().getMill("0-6")} position="w-[21.15rem] h-1 top-[1.875rem] left-[1.875rem]" />
                <Mill id="0-42" mill={game.getBoard().getMill("0-42")} position="w-1 h-[21.15rem] top-[1.875rem] left-[1.875rem]" />
                <Mill id="6-48" mill={game.getBoard().getMill("6-48")} position="w-1 h-[21.15rem] top-[1.875rem] right-[1.875rem]" />
                <Mill id="42-48" mill={game.getBoard().getMill("42-48")} position="w-[21.15rem] h-1 bottom-[1.875rem] left-[1.875rem]" />
                {/* Middle */}
                <Mill id="8-12" mill={game.getBoard().getMill("8-12")} position="w-[14.32rem] h-1 top-[5.36rem] left-[5.36rem]" />
                <Mill id="8-36" mill={game.getBoard().getMill("8-36")} position="w-1 h-[14.32rem] top-[5.36rem] left-[5.36rem]" />
                <Mill id="12-40" mill={game.getBoard().getMill("12-40")} position="w-1 h-[14.32rem] top-[5.36rem] right-[5.36rem]" />
                <Mill id="36-40" mill={game.getBoard().getMill("36-40")} position="w-[14.32rem] h-1 bottom-[5.36rem] left-[5.36rem]" />
                {/* Inner */}
                <Mill id="16-18" mill={game.getBoard().getMill("16-18")} position="w-[7.2rem] h-1 top-[8.9rem] left-[8.9rem]" />
                <Mill id="16-30" mill={game.getBoard().getMill("16-30")} position="w-1 h-[7.2rem] top-[8.9rem] left-[8.9rem]" />
                <Mill id="18-32" mill={game.getBoard().getMill("18-32")} position="w-1 h-[7.2rem] top-[8.9rem] right-[8.9rem]" />
                <Mill id="30-32" mill={game.getBoard().getMill("30-32")} position="w-[7.2rem] h-1 bottom-[8.9rem] left-[8.9rem]" />
                {/* Intersecting */}
                <Mill id="3-17" mill={game.getBoard().getMill("3-17")} position="w-1 h-[7.2rem] top-[1.875rem] left-[12.4rem]" />
                <Mill id="21-23" mill={game.getBoard().getMill("21-23")} position="w-[7.2rem] h-1 top-[12.4rem] left-[1.875rem]" />
                <Mill id="25-27" mill={game.getBoard().getMill("25-27")} position="w-[7.2rem] h-1 top-[12.4rem] right-[1.875rem]" />
                <Mill id="31-45" mill={game.getBoard().getMill("31-45")} position="w-1 h-[7.2rem] bottom-[1.875rem] left-[12.4rem]" />
            </div>
            {/* Render Pieces */}
            <div className="grid grid-cols-7 gap-6 w-[25rem] p-4 shadow-[0_0px_0px_16px_rgba(217,119,6,1)] relative rounded">
                {game.getBoard().getPositions().map((position, index) => (
                    <div
                        key={index}
                        id={index.toString()}
                        className={`w-8 h-8 grid place-items-center group ${position && "hover:cursor-pointer"}`}
                        onClick={position ? () => handlePieceClick(index) : undefined}
                    >
                        <Position position={position} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BoardComponent