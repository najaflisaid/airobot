import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../lib/data";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => { (async () => setUsers(await fetchUsers()))(); }, []);

  return (
    <div>
      <h1 className="display-title text-4xl mb-8">Users</h1>
      <div className="bg-[#FCF7E8] text-[#1C1A17] hard-border rounded-2xl overflow-hidden" style={{ boxShadow: "4px 4px 0 0 #000" }}>
        <table className="w-full text-sm">
          <thead className="border-b-2 border-[#1C1A17] text-left">
            <tr><th className="p-4 font-extrabold">Name</th><th className="p-4 font-extrabold">Email</th><th className="p-4 font-extrabold">Role</th><th className="p-4 font-extrabold">Joined</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[#e5dfce] last:border-0">
                <td className="p-4 font-bold">{u.name}</td>
                <td className="p-4 font-medium">{u.email}</td>
                <td className="p-4"><span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg hard-border ${u.role === "admin" ? "eggi-yellow" : "bg-white"}`}>{u.role}</span></td>
                <td className="p-4 font-medium text-[#7a7266]">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="p-4 font-semibold text-[#7a7266]">No users yet.</p>}
      </div>
    </div>
  );
};

export default AdminUsers;
