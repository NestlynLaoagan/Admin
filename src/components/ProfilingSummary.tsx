import { useState } from 'react';
import { Search, Mail, Phone, Download } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const mockAccounts = [
  { id: 1, name: 'Juan Dela Cruz', age: 25, gender: 'Male', email: 'juan@email.com', contact: '09171234567', civilStatus: 'Single', workStatus: 'Employed', education: 'College Grad', youthGroup: 'Core Youth (18-30)', youthClassification: 'Working Youth', skVoter: 'Registered', nationalVoter: 'Registered' },
  { id: 2, name: 'Maria Santos', age: 32, gender: 'Female', email: 'maria@email.com', contact: '09181234567', civilStatus: 'Married', workStatus: 'Self-employed', education: 'College Grad', youthGroup: 'N/A', youthClassification: 'N/A', skVoter: 'N/A', nationalVoter: 'Registered' },
  { id: 3, name: 'Pedro Reyes', age: 19, gender: 'Male', email: 'pedro@email.com', contact: '09191234567', civilStatus: 'Single', workStatus: 'Looking for Job', education: 'High School Grad', youthGroup: 'Core Youth (18-30)', youthClassification: 'Out of School Youth', skVoter: 'Registered', nationalVoter: 'Unregistered' },
  { id: 4, name: 'Ana Garcia', age: 45, gender: 'Female', email: 'ana@email.com', contact: '09201234567', civilStatus: 'Widowed', workStatus: 'Unemployed', education: 'High School Grad', youthGroup: 'N/A', youthClassification: 'N/A', skVoter: 'N/A', nationalVoter: 'Registered' },
  { id: 5, name: 'Jose Mendoza', age: 28, gender: 'Male', email: 'jose@email.com', contact: '09211234567', civilStatus: 'Live-in', workStatus: 'Employed', education: 'Vocational Grad', youthGroup: 'Core Youth (18-30)', youthClassification: 'Working Youth', skVoter: 'Unregistered', nationalVoter: 'Registered' },
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

const civilStatusData = [
  { status: 'Single', count: 456 },
  { status: 'Married', count: 389 },
  { status: 'Widowed', count: 67 },
  { status: 'Divorced', count: 23 },
  { status: 'Separated', count: 18 },
  { status: 'Live-in', count: 45 },
];

const workStatusData = [
  { status: 'Employed', count: 512 },
  { status: 'Unemployed', count: 134 },
  { status: 'Self-employed', count: 267 },
  { status: 'Looking for Job', count: 85 },
];

const youthAgeGroupData = [
  { group: 'Child Youth (15-17)', count: 89 },
  { group: 'Core Youth (18-30)', count: 234 },
];

const youthClassificationData = [
  { name: 'In School Youth', value: 156 },
  { name: 'Out of School Youth', value: 89 },
  { name: 'Working Youth', value: 78 },
];

const educationalBackgroundData = [
  { level: 'Elementary Level', count: 45 },
  { level: 'Elementary Grad', count: 78 },
  { level: 'High School Level', count: 89 },
  { level: 'High School Grad', count: 234 },
  { level: 'Vocational Grad', count: 123 },
  { level: 'College Level', count: 156 },
  { level: 'College Grad', count: 289 },
  { level: 'Masters Level', count: 34 },
  { level: 'Masters Grad', count: 23 },
];

const votersData = [
  { category: 'Registered SK Voters', count: 234 },
  { category: 'Unregistered SK Voters', count: 89 },
  { category: 'Registered National Voters', count: 756 },
  { category: 'Unregistered National Voters', count: 156 },
];

const COLORS = ['#66b539', '#315925', '#8bc34a', '#558b2f'];

export function ProfilingSummary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = mockAccounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadAsCSV = () => {
    // Prepare CSV content
    const headers = [
      'Name', 'Age', 'Gender', 'Email', 'Contact', 'Civil Status', 
      'Work Status', 'Education', 'Youth Group', 'Youth Classification', 
      'SK Voter', 'National Voter'
    ];
    
    const csvContent = [
      headers.join(','),
      ...mockAccounts.map(account => [
        account.name,
        account.age,
        account.gender,
        account.email,
        account.contact,
        account.civilStatus,
        account.workStatus,
        account.education,
        account.youthGroup,
        account.youthClassification,
        account.skVoter,
        account.nationalVoter
      ].join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `barangay_profiling_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#315925]">Profiling Summary</h1>
        <Button
          onClick={downloadAsCSV}
          className="bg-[#66b539] text-white hover:bg-[#315925]"
        >
          <Download className="w-4 h-4 mr-2" />
          Download as Spreadsheet
        </Button>
      </div>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="data">Data Summary</TabsTrigger>
          <TabsTrigger value="demographics">Demographics Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="data">
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
        </TabsContent>

        <TabsContent value="demographics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#e8f7dd] p-6 rounded-lg">
              <h2 className="text-xl text-[#315925] mb-4">Civil Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={civilStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#66b539" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#e8f7dd] p-6 rounded-lg">
              <h2 className="text-xl text-[#315925] mb-4">Work Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#315925" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#e8f7dd] p-6 rounded-lg">
              <h2 className="text-xl text-[#315925] mb-4">Youth Age Group</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={youthAgeGroupData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#66b539" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#e8f7dd] p-6 rounded-lg">
              <h2 className="text-xl text-[#315925] mb-4">Youth Classification</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={youthClassificationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {youthClassificationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#e8f7dd] p-6 rounded-lg">
              <h2 className="text-xl text-[#315925] mb-4">Educational Background</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={educationalBackgroundData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="level" angle={-45} textAnchor="end" height={120} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#66b539" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#e8f7dd] p-6 rounded-lg">
              <h2 className="text-xl text-[#315925] mb-4">Voter Registration Status</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={votersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={120} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#315925" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
