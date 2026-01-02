const GameHeader = ({ moves,score}:{moves:number,score:number}) => {
  return (
      <div className="rounded-2xl p-6 items-center bg-blue-900 rounded-md">
        <h1 className="p-6 text-3xl text-center font-bold text-white items-center roungded-lg">
         🎮 Memory Card Game
        </h1>
        <div className="flex stats justify-center gap-4 items-center">
            <div className="stat-item">
                <span className="text-indigo-500">Score:</span>
                <span>{score}</span>
            </div>
            <div className="stat-item">
                <span className="text-indigo-500">Moves:</span> <span>{moves}</span>
            </div>
        </div>
      </div>
  )
}

export default GameHeader