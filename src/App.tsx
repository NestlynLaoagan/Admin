import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { ProfilingSummary } from "./components/ProfilingSummary";
import { Projects } from "./components/Projects";
import { Reports } from "./components/Reports";
import { Events } from "./components/Events";
import { Feedback } from "./components/Feedback";
import { AIChatbot } from "./components/AIChatbot";
import { Sidebar } from "./components/Sidebar";
import { Login } from "./components/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <Dashboard />;
      case "profiling":
        return <ProfilingSummary />;
      case "projects":
        return <Projects />;
      case "reports":
        return <Reports />;
      case "events":
        return <Events />;
      case "feedback":
        return <Feedback />;
      case "ai-chatbot":
        return <AIChatbot />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}