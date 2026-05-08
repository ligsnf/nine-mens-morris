import React from "react";
import { Position } from "../models/Position";
import Piece from "./Piece";

type Props = {
  position: Position | null;
};

const PositionComponent = ({ position }: Props) => {
  let content = <div></div>;

  if (position) {
    content = (
      <div
        className={`flex h-4 w-4 rounded-full bg-yellow-950 ${position.getIsValidMove() && "group-hover:shadow-[0_0px_4px_4px_rgba(34,197,94,1)]"}`}
      >
        <div
          className={`grow animate-pulse rounded-full ${position.getIsValidMove() && "shadow-[0_0px_4px_4px_rgba(34,197,94,1)]"}`}
        ></div>
      </div>
    );
  }

  if (position?.getPiece()) {
    content = <Piece piece={position.getPiece()} isValidMove={position.getIsValidMove()} />;
  }

  return content;
};

export default PositionComponent;
