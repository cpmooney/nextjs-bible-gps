interface TotalStatComponentProps {
    initialScore: number,
    scoreIncrease: number,
}

export default function TotalStatComponent(props: TotalStatComponentProps) {
    const { initialScore, scoreIncrease } = props;

    const getChangeColorClass = () => {
        if (scoreIncrease < 0) {
            return "text-red-600";
        }
        if (scoreIncrease === 0) {
            return "text-gray-600";
        }
        if (scoreIncrease < 10) {
            return "text-green-600";
        }
        if (scoreIncrease < 30) {
            return "text-lime-600";
        }
        return "text-yellow-600";
    }

    const getTotalScoreColorClass = () => {
      return "text-green-600";
    }

    return (
        <div className="flex flex-row w-96">
    <div className="card bg-base-100 shadow-xl mr-4 mt-4 flex-1">
      <div className="card-body">
        <div className={`justify-center text-6xl ${getChangeColorClass()}`}>
          {scoreIncrease}
        </div>
      </div>
    </div>
    <div className="card bg-base-100 shadow-xl mt-4 flex-1">
      <div className="card-body">
        <div className={`justify-center text-6xl ${getTotalScoreColorClass()}`}>
          {initialScore}
        </div>
        </div>
      </div>
    </div>
    );
}