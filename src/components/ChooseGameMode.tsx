import { FaUserAlt, FaRobot } from "react-icons/fa";
import { GameType } from "../models/Game";

type Props = {
  chooseGameMode: (arg0: GameType) => void;
};

const ChooseGameMode = ({ chooseGameMode }: Props) => {
  return (
    <div className="grid h-full w-full items-center rounded-lg border-16 border-amber-600 bg-amber-100 text-black">
      <div className="flex flex-col items-center gap-8">
        <p className="mb-4 text-4xl font-semibold">CHOOSE GAME MODE</p>
        <div>
          <button
            className="flex items-center gap-2 bg-amber-500! text-2xl! text-amber-950"
            onClick={() => chooseGameMode(GameType.Human)}
          >
            <FaUserAlt />
            <p>VS</p>
            <FaUserAlt />
          </button>
        </div>
        <div>
          <button
            className="flex items-center gap-2 bg-amber-500! text-2xl! text-amber-950"
            onClick={() => chooseGameMode(GameType.Computer)}
          >
            <FaUserAlt />
            <p>VS</p>
            <FaRobot />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseGameMode;
