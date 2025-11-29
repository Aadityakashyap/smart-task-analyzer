const StrategyToggle = ({ strategy, setStrategy }) => {
  const strategies = [
    "Smart Balance",
    "Fastest Wins",
    "High Impact",
    "Deadline Driven",
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <h2 className="heading">Sorting Strategy</h2>
      <select
        value={strategy}
        onChange={(e) => setStrategy(e.target.value)}
        className="input-field"
      >
        {strategies.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <p className="mt-2 text-gray-400">Current strategy: {strategy}</p>
    </div>
  );
};

export default StrategyToggle;
