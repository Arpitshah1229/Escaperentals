// const statusColors = {
//   pending: "bg-yellow-100 text-yellow-700",
//   confirmed: "bg-green-100 text-green-700",
//   cancelled: "bg-red-100 text-red-700",
//   active: "bg-green-100 text-green-700",
//   inactive: "bg-gray-200 text-gray-700",
// };

// const StatusBadge = ({ status }) => {
//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
//       {status.toUpperCase()}
//     </span>
//   );
// };

// export default StatusBadge;



const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  approved: "bg-blue-100 text-blue-700",
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-200 text-gray-700",
};

const StatusBadge = ({ status }) => {
  // 🔐 safety guard
  if (!status) return null;

  const normalizedStatus = status.toLowerCase();
  const colorClass =
    statusColors[normalizedStatus] ||
    "bg-gray-100 text-gray-600";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {normalizedStatus.toUpperCase()}
    </span>
  );
};

export default StatusBadge;

