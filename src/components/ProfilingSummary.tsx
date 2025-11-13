import { useState } from 'react';
import { Search, Mail, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockAccounts = [
  { id: 1, name: 'Juan Dela Cruz', age: 25, gender: 'Male', email: 'juan@email.com', contact: '09171234567' },
  { id: 2, name: 'Maria Santos', age: 32, gender: 'Female', email: 'maria@email.com', contact: '09181234567' },
  { id: 3, name: 'Pedro Reyes', age: 19, gender: 'Male', email: 'pedro@email.com', contact: '09191234567' },
  { id: 4, name: 'Ana Garcia', age: 45, gender: 'Female', email: 'ana@email.com', contact: '09201234567' },
  { id: 5, name: 'Jose Mendoza', age: 28, gender: 'Male', email: 'jose@email.com', contact: '09211234567' },
];

const ageData = [
  { range: '15-24', count: 145 },
  { range: '25-34', count: 230 },
  { range: '35-44', count: 189 },
  { range: '45-54', count: 156 },
  { range: '55+', count: 98 },
];

const genderData = [
  { name: 'Male', value: 567 },
  { name: 'Female', value: 667 },
];

const COLORS = ['#66b539', '#315925'];

export function ProfilingSummary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = mockAccounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl text-[#315925] mb-8">Profiling Summary</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#e8f7dd] p-6 rounded-lg">
          <h2 className="text-xl text-[#315925] mb-4">Age Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#66b539" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#e8f7dd] p-6 rounded-lg">
          <h2 className="text-xl text-[#315925] mb-4">Gender Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#e8f7dd] p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-[#315925]">Registered Accounts</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#66b539]">
                <th className="text-left p-3 text-[#315925]">Name</th>
                <th className="text-left p-3 text-[#315925]">Age</th>
                <th className="text-left p-3 text-[#315925]">Gender</th>
                <th className="text-left p-3 text-[#315925]">Email</th>
                <th className="text-left p-3 text-[#315925]">Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b border-gray-200 hover:bg-white transition-colors">
                  <td className="p-3 text-gray-700">{account.name}</td>
                  <td className="p-3 text-gray-700">{account.age}</td>
                  <td className="p-3 text-gray-700">{account.gender}</td>
                  <td className="p-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#66b539]" />
                      {account.email}
                    </div>
                  </td>
                  <td className="p-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#66b539]" />
                      {account.contact}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-gray-600">
          Total Registered Accounts: {mockAccounts.length}
        </div>
      </div>
    </div>
  );
}
