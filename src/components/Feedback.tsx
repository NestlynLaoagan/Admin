import { MessageSquare, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const feedbackData = [
  { id: 1, name: 'Juan Reyes', rating: 5, comment: 'Great community service!', date: '2025-11-10' },
  { id: 2, name: 'Maria Santos', rating: 4, comment: 'Very helpful and responsive', date: '2025-11-09' },
  { id: 3, name: 'Pedro Cruz', rating: 5, comment: 'Excellent programs for youth', date: '2025-11-08' },
  { id: 4, name: 'Ana Garcia', rating: 3, comment: 'Good but needs improvement', date: '2025-11-07' },
  { id: 5, name: 'Jose Mendoza', rating: 5, comment: 'Very satisfied with the services', date: '2025-11-06' },
];

const ratingDistribution = [
  { rating: '5 Stars', count: 156 },
  { rating: '4 Stars', count: 89 },
  { rating: '3 Stars', count: 34 },
  { rating: '2 Stars', count: 12 },
  { rating: '1 Star', count: 5 },
];

const sentimentData = [
  { name: 'Positive', value: 245 },
  { name: 'Neutral', value: 34 },
  { name: 'Negative', value: 17 },
];

const COLORS = ['#66b539', '#ffc107', '#f44336'];

export function Feedback() {
  const averageRating = (
    feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length
  ).toFixed(1);

  return (
    <div>
      <h1 className="text-3xl text-[#315925] mb-8">Feedback & Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#e8f7dd] p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-6 h-6 text-[#66b539]" />
            <h3 className="text-lg text-gray-700">Total Feedback</h3>
          </div>
          <p className="text-3xl text-[#315925]">296</p>
        </div>

        <div className="bg-[#e8f7dd] p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-6 h-6 text-[#66b539]" />
            <h3 className="text-lg text-gray-700">Average Rating</h3>
          </div>
          <p className="text-3xl text-[#315925]">{averageRating} / 5.0</p>
        </div>

        <div className="bg-[#e8f7dd] p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ThumbsUp className="w-6 h-6 text-[#66b539]" />
            <h3 className="text-lg text-gray-700">Satisfaction Rate</h3>
          </div>
          <p className="text-3xl text-[#315925]">82.8%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#e8f7dd] p-6 rounded-lg">
          <h2 className="text-xl text-[#315925] mb-4">Rating Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#66b539" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#e8f7dd] p-6 rounded-lg">
          <h2 className="text-xl text-[#315925] mb-4">Sentiment Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#e8f7dd] p-6 rounded-lg">
        <h2 className="text-xl text-[#315925] mb-4">Recent Feedback</h2>
        <div className="space-y-4">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="bg-white p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[#315925]">{feedback.name}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < feedback.rating
                            ? 'text-[#66b539] fill-[#66b539]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{feedback.date}</span>
              </div>
              <p className="text-gray-700">{feedback.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
