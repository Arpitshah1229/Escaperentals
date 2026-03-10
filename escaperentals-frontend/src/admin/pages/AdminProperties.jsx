import { useEffect, useState } from "react";
import api from "../../services/api";
import StatusBadge from "../components/StatusBadge";
import "./AdminProperties.css";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = () => {
    api
      .get("/properties/admin/properties/")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const approveProperty = (id) => {
    api
      .post(`/properties/admin/properties/${id}/approve/`)
      .then(() => fetchProperties());
  };

  const rejectProperty = (id) => {
    api
      .post(`/properties/admin/properties/${id}/reject/`)
      .then(() => fetchProperties());
  };

  return (
    <div className="admin-properties">
      <h3>All Properties</h3>

      <div className="admin-properties-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Host</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>

                <td className="property-title">{p.title}</td>

                <td>{p.host}</td>

                <td>{p.location}</td>

                <td className="property-price">₹{p.price_per_night}</td>

                <td>
                  <StatusBadge status={p.is_approved ? "approved" : "pending"} />
                </td>

                <td>
                  <div className="property-actions">
                    {!p.is_approved && (
                      <button
                        className="btn-approve"
                        onClick={() => approveProperty(p.id)}
                      >
                        Approve
                      </button>
                    )}

                    {p.is_approved && (
                      <button
                        className="btn-reject"
                        onClick={() => rejectProperty(p.id)}
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default AdminProperties;





// import StatusBadge from "../components/StatusBadge";
// import api from "../../services/api";
// import { useEffect, useState } from "react";

// const AdminProperties = () => {
//   const [properties, setProperties] = useState([]);

//   const fetchProperties = () => {
//     api
//       .get("/properties/admin/properties/")
//       .then((res) => setProperties(res.data))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const approveProperty = (id) => {
//     api
//       .post(`/properties/admin/properties/${id}/approve/`)
//       .then(() => fetchProperties());
//   };

//   const rejectProperty = (id) => {
//     api
//       .post(`/properties/admin/properties/${id}/reject/`)
//       .then(() => fetchProperties());
//   };


//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <h2 className="text-lg font-semibold mb-4">Properties</h2>

//       <table className="w-full text-sm">
//         <thead className="text-gray-500 border-b">
//           <tr>
//             <th className="py-2">Title</th>
//             <th>Host</th>
//             <th>Price</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {properties.map(p => (
//             <tr key={p.id} className="border-b">
//               <td className="py-3">{p.title}</td>
//               <td>{p.host}</td>
//               <td>₹{p.price}</td>
//               <td><StatusBadge status={p.status} /></td>
//               <td className="space-x-2">
//                 <button className="text-green-600 text-xs">Approve</button>
//                 <button className="text-red-500 text-xs">Disable</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminProperties;
