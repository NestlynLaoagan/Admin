import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface Report {
  id: number;
  title: string;
  description: string;
  attendees: number;
  image: string;
  date: string;
}

export function Reports() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: 'Medical Mission 2024',
      description: 'Free medical checkup and medicines distribution',
      attendees: 156,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
      date: '2024-10-15',
    },
    {
      id: 2,
      title: 'Youth Sports Festival',
      description: 'Annual youth sports competition',
      attendees: 234,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      date: '2024-09-20',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    attendees: 0,
    image: '',
    date: '',
  });

  const handleAdd = () => {
    setEditingReport(null);
    setFormData({ title: '', description: '', attendees: 0, image: '', date: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (report: Report) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      description: report.description,
      attendees: report.attendees,
      image: report.image,
      date: report.date,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter((r) => r.id !== id));
    }
  };

  const handleSave = () => {
    if (editingReport) {
      setReports(
        reports.map((r) =>
          r.id === editingReport.id
            ? { ...r, ...formData }
            : r
        )
      );
    } else {
      const newReport = {
        id: Math.max(...reports.map((r) => r.id), 0) + 1,
        ...formData,
      };
      setReports([...reports, newReport]);
    }
    setIsDialogOpen(false);
  };

  const totalAttendees = reports.reduce((sum, report) => sum + report.attendees, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#315925]">Accomplished Projects</h1>
        <Button
          onClick={handleAdd}
          className="bg-[#66b539] text-white hover:bg-[#315925]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Report
        </Button>
      </div>

      <div className="bg-[#e8f7dd] p-6 rounded-lg mb-6">
        <h2 className="text-xl text-[#315925] mb-2">Statistics Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded">
            <p className="text-gray-600">Total Projects</p>
            <p className="text-2xl text-[#315925]">{reports.length}</p>
          </div>
          <div className="bg-white p-4 rounded">
            <p className="text-gray-600">Total Attendees</p>
            <p className="text-2xl text-[#315925]">{totalAttendees}</p>
          </div>
          <div className="bg-white p-4 rounded">
            <p className="text-gray-600">Average Attendees</p>
            <p className="text-2xl text-[#315925]">
              {reports.length > 0 ? Math.round(totalAttendees / reports.length) : 0}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-[#e8f7dd] rounded-lg overflow-hidden">
            <ImageWithFallback
              src={report.image}
              alt={report.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg text-[#315925] mb-2">{report.title}</h3>
              <p className="text-gray-700 text-sm mb-2">{report.description}</p>
              <p className="text-sm text-gray-600 mb-1">Date: {report.date}</p>
              <p className="text-sm text-[#66b539] mb-4">Attendees: {report.attendees}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(report)}
                  className="flex-1 bg-[#66b539] text-white hover:bg-[#315925]"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(report.id)}
                  variant="destructive"
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#315925]">
              {editingReport ? 'Edit Report' : 'Add New Report'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Number of Attendees</label>
              <Input
                type="number"
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Image URL</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#66b539] text-white hover:bg-[#315925]"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}