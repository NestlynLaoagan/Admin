import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function Dashboard() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [stats, setStats] = useState({
    upcomingEvents: '12',
    finishedProjects: '45',
    communityMembers: '1,234',
    announcements: '8',
  });
  const [tempValue, setTempValue] = useState('');

  const handleEdit = (field: keyof typeof stats) => {
    setIsEditing(field);
    setTempValue(stats[field]);
  };

  const handleSave = (field: keyof typeof stats) => {
    setStats({ ...stats, [field]: tempValue });
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setTempValue('');
  };

  const StatCard = ({ title, value, field }: { title: string; value: string; field: keyof typeof stats }) => (
    <div className="bg-[#e8f7dd] p-6 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-700">{title}</h3>
        <button
          onClick={() => handleEdit(field)}
          className="text-[#315925] hover:text-[#66b539] transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>
      {isEditing === field ? (
        <div className="space-y-2">
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="bg-white"
          />
          <div className="flex gap-2">
            <Button
              onClick={() => handleSave(field)}
              className="bg-[#66b539] text-white hover:bg-[#315925] flex-1"
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-3xl text-[#315925]">{value}</p>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl text-[#315925] mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Upcoming Events" value={stats.upcomingEvents} field="upcomingEvents" />
        <StatCard title="Finished Projects" value={stats.finishedProjects} field="finishedProjects" />
        <StatCard title="Community Members" value={stats.communityMembers} field="communityMembers" />
        <StatCard title="Announcements" value={stats.announcements} field="announcements" />
      </div>

      <div className="bg-[#e8f7dd] p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-[#315925]">Recent Announcements</h2>
          <Button className="bg-[#66b539] text-white hover:bg-[#315925]">
            Add Announcement
          </Button>
        </div>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded">
            <p className="text-gray-700">Community meeting scheduled for next week</p>
            <p className="text-sm text-gray-500 mt-1">Posted 2 days ago</p>
          </div>
          <div className="bg-white p-4 rounded">
            <p className="text-gray-700">New vaccination drive announced</p>
            <p className="text-sm text-gray-500 mt-1">Posted 5 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
