interface TotalStatComponentProps {
    initialScore: number,
    scoreIncrease: number,
}

export default function TotalStatComponent(props: TotalStatComponentProps) {
    const { initialScore, scoreIncrease } = props;

    const getChangeColorClass = () => {
        if (scoreIncrease > 0) {
            return "text-green-500";
        } else if (scoreIncrease < 0) {
            return "text-red-500";
        } else {
            return "text-gray-500";
        }
    }

    const getTotalScoreColorClass = () => {
      return "text-green-600";
    }

    return (
        <div className="flex flex-row w-96">
    <div className="card bg-base-100 shadow-xl mt-4 flex-1">
      <div className="card-body">
        <div className={`justify-center text-6xl`}>
          {scoreIncrease}
        </div>
      </div>
    </div>
    <div className="card bg-base-100 shadow-xl mt-4 mr-4 flex-1">
      <div className="card-body">
        <div className={`justify-center text-6xl ${getChangeColorClass()}`}>
          {initialScore}
        </div>
        </div>
      </div>
    </div>
    );
}