const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center hover:shadow-md transition">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>
      <div className="text-blue-600 text-3xl">{icon}</div>
    </div>
  );
};

export default StatCard;
