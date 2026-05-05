import { FaUserAlt, FaRobot } from 'react-icons/fa';
import { GameType } from "../models/Game";

type Props = {
    chooseGameMode: (arg0: GameType) => void,
}

const ChooseGameMode = ({ chooseGameMode }: Props) => {
    return (
        <div className="w-full h-full rounded-lg bg-amber-100 text-black border-[16px] border-amber-600 grid items-center">
            <div className="flex flex-col items-center gap-8">
                <p className="text-4xl font-semibold mb-4">CHOOSE GAME MODE</p>
                <div>
                    <button
                        className="bg-amber-500 flex items-center gap-2 text-2xl text-amber-950"
                        onClick={() => chooseGameMode(GameType.Human)}
                    >
                        <FaUserAlt />
                        <p>VS</p>
                        <FaUserAlt />
                    </button>
                </div>
                <div>
                    <button
                        className="bg-amber-500 flex items-center gap-2 text-2xl text-amber-950"
                        onClick={() => chooseGameMode(GameType.Computer)}
                    >
                        <FaUserAlt />
                        <p>VS</p>
                        <FaRobot />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChooseGameMode