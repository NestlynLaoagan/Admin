import { useState } from 'react';
import { Plus, Pencil, Trash2, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Community Assembly Meeting',
      description: 'Monthly community meeting to discuss upcoming projects',
      date: '2025-11-25',
      time: '14:00',
      location: 'Barangay Hall',
    },
    {
      id: 2,
      title: 'Christmas Party Planning',
      description: 'Planning session for the annual Christmas celebration',
      date: '2025-12-01',
      time: '10:00',
      location: 'Community Center',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  const handleAdd = () => {
    setEditingEvent(null);
    setFormData({ title: '', description: '', date: '', time: '', location: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const handleSave = () => {
    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id
            ? { ...e, ...formData }
            : e
        )
      );
    } else {
      const newEvent = {
        id: Math.max(...events.map((e) => e.id), 0) + 1,
        ...formData,
      };
      setEvents([...events, newEvent]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#315925]">Events Management</h1>
        <Button
          onClick={handleAdd}
          className="bg-[#66b539] text-white hover:bg-[#315925]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-[#e8f7dd] p-6 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#66b539]" />
                  <h3 className="text-xl text-[#315925]">{event.title}</h3>
                </div>
                <p className="text-gray-700 mb-3">{event.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Date:</span> {event.date}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> {event.time}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {event.location}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => handleEdit(event)}
                  className="bg-[#66b539] text-white hover:bg-[#315925]"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(event.id)}
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4" />
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
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Event title"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Event description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Time</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Event location"
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
