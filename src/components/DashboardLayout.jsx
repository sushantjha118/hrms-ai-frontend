import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const suggestions = [
  "Show me pending leave requests",
  "Who is absent today?",
  "Top performers this quarter",
  "Open job positions",
];

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [chatOpen, setChatOpen]   = useState(false);
  const [messages, setMessages]   = useState([
    { from: "ai", text: "Hi! I'm your HRMS assistant. Ask me anything about your workforce." },
  ]);
  const [input, setInput] = useState("");

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: msg },
      { from: "ai",   text: "I'm still learning! This feature will be fully powered by AI soon. For now, use the dashboard to explore your data." },
    ]);
    setInput("");
  };

  return (
    <div className="bg-surface text-on-surface">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <main className={`transition-all duration-300 min-h-screen ${collapsed ? "ml-16" : "ml-64"}`}>
        <TopBar />
        <div className="p-10 space-y-10">{children}</div>
      </main>

      {/* AI Assistant FAB */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        {/* Chat Panel */}
        {chatOpen && (
          <div className="w-80 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/20 flex flex-col overflow-hidden"
            style={{ height: "420px" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-on-primary">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="font-headline font-bold text-sm">HRMS Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:opacity-70 transition-opacity">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-primary text-on-primary rounded-br-none"
                      : "bg-surface-container text-on-surface rounded-bl-none"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-outline-variant/20 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask something..."
                className="flex-1 text-sm px-3 py-2 bg-surface-container-low rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder:text-outline"
              />
              <button onClick={() => send()}
                className="p-2 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        )}

        {/* FAB Button */}
        <button onClick={() => setChatOpen((o) => !o)}
          className="w-14 h-14 rounded-full bg-primary shadow-xl shadow-primary/30 flex items-center justify-center text-on-primary hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {chatOpen ? "close" : "auto_awesome"}
          </span>
        </button>
      </div>
    </div>
  );
}
