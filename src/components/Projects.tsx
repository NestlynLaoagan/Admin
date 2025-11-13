import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Community Clean-up Drive',
      description: 'Monthly community clean-up initiative',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400',
      date: '2025-11-20',
    },
    {
      id: 2,
      title: 'Youth Leadership Training',
      description: 'Leadership development program for youth',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      date: '2025-12-05',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    date: '',
  });

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', image: '', date: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      date: project.date,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? { ...p, ...formData }
            : p
        )
      );
    } else {
      const newProject = {
        id: Math.max(...projects.map((p) => p.id), 0) + 1,
        ...formData,
      };
      setProjects([...projects, newProject]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#315925]">Upcoming Projects</h1>
        <Button
          onClick={handleAdd}
          className="bg-[#66b539] text-white hover:bg-[#315925]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#e8f7dd] rounded-lg overflow-hidden">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg text-[#315925] mb-2">{project.title}</h3>
              <p className="text-gray-700 text-sm mb-2">{project.description}</p>
              <p className="text-sm text-gray-600 mb-4">Date: {project.date}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(project)}
                  className="flex-1 bg-[#66b539] text-white hover:bg-[#315925]"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(project.id)}
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
              {editingProject ? 'Edit Project' : 'Add New Project'}
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