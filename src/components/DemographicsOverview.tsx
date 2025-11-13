import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

export function DemographicsOverview() {
  return (
    <div>
      <h1 className="text-3xl text-[#315925] mb-8">Demographics Overview</h1>

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
    </div>
  );
}
