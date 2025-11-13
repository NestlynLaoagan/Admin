import { useState } from 'react';
import { Plus, Pencil, Trash2, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export function AIChatbot() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 1,
      question: 'How do I register as a member?',
      answer: 'You can register by visiting the barangay hall during office hours or through our online portal.',
      category: 'Registration',
    },
    {
      id: 2,
      question: 'What services does the barangay offer?',
      answer: 'We offer various services including certificates, community programs, health services, and youth development programs.',
      category: 'Services',
    },
    {
      id: 3,
      question: 'What are the office hours?',
      answer: 'Our office is open Monday to Friday, 8:00 AM to 5:00 PM.',
      category: 'General',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setEditingFAQ(null);
    setFormData({ question: '', answer: '', category: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  const handleSave = () => {
    if (editingFAQ) {
      setFaqs(
        faqs.map((f) =>
          f.id === editingFAQ.id
            ? { ...f, ...formData }
            : f
        )
      );
    } else {
      const newFAQ = {
        id: Math.max(...faqs.map((f) => f.id), 0) + 1,
        ...formData,
      };
      setFaqs([...faqs, newFAQ]);
    }
    setIsDialogOpen(false);
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#315925]">AI Chatbot FAQ Management</h1>
        <Button
          onClick={handleAdd}
          className="bg-[#66b539] text-white hover:bg-[#315925]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="bg-[#e8f7dd] p-6 rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-[#66b539]" />
          <h2 className="text-xl text-[#315925]">FAQ Statistics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded">
            <p className="text-gray-600">Total FAQs</p>
            <p className="text-2xl text-[#315925]">{faqs.length}</p>
          </div>
          <div className="bg-white p-4 rounded">
            <p className="text-gray-600">Categories</p>
            <p className="text-2xl text-[#315925]">{categories.length}</p>
          </div>
          <div className="bg-white p-4 rounded">
            <p className="text-gray-600">Active</p>
            <p className="text-2xl text-[#315925]">{faqs.length}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md bg-white"
        />
      </div>

      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <div key={faq.id} className="bg-[#e8f7dd] p-6 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#66b539] text-white px-3 py-1 rounded text-sm">
                    {faq.category}
                  </span>
                </div>
                <h3 className="text-lg text-[#315925] mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => handleEdit(faq)}
                  className="bg-[#66b539] text-white hover:bg-[#315925]"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(faq.id)}
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
              {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Category</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Registration, Services, General"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Question</label>
              <Input
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter the question"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Answer</label>
              <Textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Enter the answer"
                rows={4}
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
