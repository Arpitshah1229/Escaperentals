import StatusBadge from "../components/StatusBadge";
import { useState, useEffect } from "react";
import api from "../../services/api"
// import StatusBadge from "../components/StatusBadge";
import "./Users.css";
const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/users/admin/users/")
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        // <div className="bg-white rounded-xl shadow-sm p-6">
        //     <h2 className="text-[32px] font-semibold mb-4 p-[50px] mt-[50px]">Users</h2>

        //     <table className="w-full text-sm">
        //         <thead className="text-gray-500 border-b">
        //             <tr>
        //                 <th className="py-2">Name</th>
        //                 <th>Email</th>
        //                 <th>Role</th>
        //                 <th>Status</th>
        //                 <th>Action</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {users.map(u => (
        //                 <tr key={u.id} className="border-b">
        //                     {/* <td className="py-3">{u.username}</td> */}
        //                     <td className="py-3">
        //                         {u.first_name || u.last_name
        //                             ? `${u.first_name} ${u.last_name}`
        //                             : u.username}
        //                     </td>
        //                     <td>{u.email}</td>
        //                     <td>{u.role}</td>
        //                     <td><StatusBadge status={u.is_active ? "active" : "inactive"} /></td>
        //                     <td>
        //                         <button className="text-red-500 hover:underline text-xs">Block</button>
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>



        <div className="users-page">
            <div className="users-card">
                <h2 className="users-title">Users</h2>

                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>
                                    {u.first_name || u.last_name
                                        ? `${u.first_name} ${u.last_name}`
                                        : u.username}
                                </td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <StatusBadge
                                        status={u.is_active ? "active" : "inactive"}
                                    />
                                </td>
                                <td>
                                    <button className="block-btn">
                                        Block
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
