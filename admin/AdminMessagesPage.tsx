import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AdminMessagesPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { messages } = context;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Contact Messages</h1>

      <div className="space-y-6">
        {messages.map(message => (
          <div key={message.id} className="bg-base-200 p-6 rounded-xl shadow-subtle border border-base-300">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
              <div>
                <p className="text-xl font-bold text-white">{message.name}</p>
                <a href={`mailto:${message.email}`} className="text-primary hover:underline">{message.email}</a>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <p className="text-gray-400 text-sm">{new Date(message.receivedAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 bg-base-100 p-4 rounded-md">
                <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center p-8 text-gray-400 bg-base-200 rounded-xl border border-base-300">No messages received yet.</p>}
      </div>
    </div>
  );
};

export default AdminMessagesPage;