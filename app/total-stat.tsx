interface TotalStatComponentProps {
    totalScore: number,
    scoreIncrease: number,
}

export default function TotalStatComponent(props: TotalStatComponentProps) {
    const { totalScore, scoreIncrease } = props;
    return (
        <div className="flex flex-row w-96">
    <div className="card bg-base-100 shadow-xl mt-4 mr-4 flex-1">
      <div className="card-body">
        <div className="justify-center text-6xl">
          {totalScore}
        </div>
        </div>
      </div>
    <div className="card bg-base-100 shadow-xl mt-4 flex-1">
      <div className="card-body">
        <div className="justify-center text-6xl">
          {scoreIncrease}
        </div>
      </div>
    </div>
    </div>
    );
}