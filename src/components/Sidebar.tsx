interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'profiling', label: 'Profiling Summary' },
    { id: 'projects', label: 'Projects' },
    { id: 'reports', label: 'Reports' },
    { id: 'events', label: 'Events' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'ai-chatbot', label: 'AI-chatbot' },
  ];

  return (
    <aside className="w-60 bg-[#315925] text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-center mb-8">
          BARANGAY
          <br />
          BAKAKENG
          <br />
          CENTRAL
        </h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left px-6 py-3 transition-colors ${
              activeSection === item.id
                ? 'bg-[#66b539] bg-opacity-60'
                : 'hover:bg-[#66b539] hover:bg-opacity-60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}