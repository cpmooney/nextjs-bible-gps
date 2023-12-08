import {ChevronDoubleRightIcon} from "@heroicons/react/24/outline";
import { useDeckContext } from "./providers/deck-provider";

export default function ScoreComponent() {
  const {syncScoresToDb, obtainBankedScore, obtainUnbankedScore} = useDeckContext();

  const unbankedScore = obtainUnbankedScore();
  const bankedScore = obtainBankedScore();

  const getChangeColorClass = () => {
    if (unbankedScore < 0) {
      return "text-red-600";
    }
    if (unbankedScore === 0) {
      return "text-gray-600";
    }
    if (unbankedScore < 10) {
      return "text-green-600";
    }
    if (unbankedScore < 30) {
      return "text-lime-600";
    }
    return "text-yellow-600";
  };

  const getTotalScoreColorClass = () => {
    return "text-green-600";
  };

  return (
    <div className="flex flex-row w-96">
      <div className="card bg-base-100 shadow-xl mr-4 mt-4 flex-1">
        <div className="card-body">
          <div className={`justify-center text-5xl ${getChangeColorClass()}`}>
            {unbankedScore}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mr-4">
        <button className="btn btn-btnPrimary" onClick={syncScoresToDb}>
          <ChevronDoubleRightIcon className="w-8 h-8 mr-2" />
        </button>
      </div>
      <div className="card bg-base-100 shadow-xl mt-4 flex-1">
        <div className="card-body">
          <div
            className={`justify-center text-4xl ${getTotalScoreColorClass()}`}
          >
            {bankedScore}
          </div>
        </div>
      </div>
    </div>
  );
}
