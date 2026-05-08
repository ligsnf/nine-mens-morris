import React from "react";
import { Player } from "../models/Player";

type Props = {
  player: Player;
};

const PiecesLeft = ({ player }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-xs whitespace-break-spaces">{"Pieces\ntaken:"}</p>
        {player.getPiecesTaken()}
      </div>
      <div className="flex h-44 w-16 flex-col gap-0.5 rounded-sm bg-amber-600 p-2 ring-[0.4rem] ring-black/20 ring-inset">
        {/* <div className={`w-full h-4 rounded-sm ${pieceColour}`}></div> */}
        {Array.from({ length: player.getPiecesLeft() }).map((item, index) => (
          <div
            key={index}
            className={`h-4 w-full rounded-lg ${player.getColour() === "white" ? "bg-white" : "bg-black"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PiecesLeft;
