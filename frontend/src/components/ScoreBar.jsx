export default function ScoreBar({ score, max = 10, label }) {
  const pct = Math.round((score / max) * 100);

  const color =
    score >= 8
      ? "bg-green-500"
      : score >= 5
      ? "bg-yellow-400"
      : "bg-red-400";

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
          <span>{label}</span>
          <span>
            {score}/{max}
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
