function StatCard({ title, value, color }) {
  return (
      <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-200 p-6">      <h3 className="text-gray-500 text-sm font-medium">
        {title}
      </h3>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>        {value}
      </h2>
    </div>
  );
}

export default StatCard;