import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AdminCustomersPage: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) return null;
  const { users } = context;

  // Filter out admin user if needed, assuming admin has a specific email or role
  const customers = users.filter(u => u.email !== 'admin@test.com');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Customer Accounts</h1>

      <div className="bg-base-200 rounded-xl shadow-subtle overflow-x-auto border border-base-300">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-base-300">
              <th className="p-4 font-semibold text-gray-400">User ID</th>
              <th className="p-4 font-semibold text-gray-400">Name</th>
              <th className="p-4 font-semibold text-gray-400">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="border-b border-base-300 last:border-0 hover:bg-base-300/50">
                <td className="p-4 text-gray-400 font-mono text-sm">{customer.id}</td>
                <td className="p-4 text-gray-200 font-semibold">{customer.name}</td>
                <td className="p-4 text-gray-300">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
         {customers.length === 0 && <p className="text-center p-8 text-gray-400">No customers have registered yet.</p>}
      </div>
    </div>
  );
};

export default AdminCustomersPage;
