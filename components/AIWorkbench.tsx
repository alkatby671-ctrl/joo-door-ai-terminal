'use client';

import { useCallback, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Bot, Code2, FileCode2, ImageIcon, LayoutTemplate, Send, Sparkles, TerminalSquare, Video, Wand2 } from 'lucide-react';

const initialFiles = {
  'src/App.tsx': `export default function App() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 32 }}>
      <h1>Joo Door AI IDE</h1>
      <p>Welcome to your smart development workspace.</p>
    </main>
  );
}`,
  'src/styles.css': `body {
  margin: 0;
  background: #111827;
  color: #e5e7eb;
  font-family: Arial, sans-serif;
}

main {
  min-height: 100vh;
  display: grid;
  place-items: center;
}`,
  'index.html': `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #0f172a, #1d4ed8);
        color: white;
        display: grid;
        place-items: center;
        min-height: 100vh;
        margin: 0;
      }
      .card {
        background: rgba(255,255,255,0.08);
        padding: 32px;
        border-radius: 18px;
        box-shadow: 0 0 30px rgba(0,0,0,0.2);
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Live Preview</h1>
      <p>AI-powered design and development workspace.</p>
    </div>
  </body>
</html>`,
};

const fileExtensions: Record<string, string> = {
  tsx: 'typescript',
  ts: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  html: 'html',
  css: 'css',
  md: 'markdown',
};

export default function AIWorkbench() {
  const [files, setFiles] = useState<Record<string, string>>(initialFiles);
  const [selectedFile, setSelectedFile] = useState('src/App.tsx');
  const [chat, setChat] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'مرحبًا، أنا مساعدك التقني في Joo Door AI IDE. يمكنك طلب تصحيح الأكواد، إنشاء واجهات، أو تنفيذ مشروع كامل.' },
  ]);
  const [input, setInput] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '$ help',
    'Available commands: ls, cat <file>, open <file>, preview, clear, help',
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const fileList = useMemo(() => Object.keys(files), [files]);
  const activeFile = files[selectedFile] ?? '';
  const extension = selectedFile.split('.').pop() || 'tsx';
  const language = fileExtensions[extension] ?? 'plaintext';

  const updateFile = useCallback((path: string, newValue: string) => {
    setFiles((prev) => ({ ...prev, [path]: newValue }));
  }, []);

  const previewHtml = useMemo(() => {
    const html = files['index.html'] ?? '';
    const style = files['src/styles.css'] ?? '';
    const app = files['src/App.tsx'] ?? '';

    return `
      <html>
        <head>
          <style>${style}</style>
        </head>
        <body>
          <div id="root">${app.replace(/export default function App\(\) \{/, '').replace(/\n\s*return \(/, '').replace(/\);\n\}/, '')}</div>
        </body>
      </html>
    `;
  }, [files]);

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setChat((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chat, userMessage] }),
      });

      const data = await res.json();
      const reply = data.reply ?? 'No response available';
      setChat((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setChat((prev) => [...prev, { role: 'assistant', content: 'حدثت مشكلة في الاتصال بالخدمة. حاول مرة أخرى.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTerminalRun = async () => {
    const command = terminalInput.trim();
    if (!command) return;

    const nextLogs = [...terminalLogs, `$ ${command}`];

    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });

      const data = await res.json();
      const output = Array.isArray(data.output) ? data.output : [data.output ?? 'No output'];
      setTerminalLogs([...nextLogs, ...output]);
    } catch {
      setTerminalLogs([...nextLogs, 'Command execution failed.']);
    } finally {
      setTerminalInput('');
    }
  };

  return (
    <main className="workspace-shell">
      <aside className="left-panel">
        <div className="brand-row">
          <div className="brand-mark">JD</div>
          <div>
            <div className="brand-title">Joo Door</div>
            <div className="brand-subtitle">AI IDE</div>
          </div>
        </div>

        <nav className="sidebar-section">
          <span className="section-label">Workspace</span>
          {fileList.map((file) => (
            <button
              key={file}
              className={`file-btn ${selectedFile === file ? 'active' : ''}`}
              onClick={() => setSelectedFile(file)}
            >
              <Code2 size={14} />
              {file}
            </button>
          ))}
        </nav>

        <div className="sidebar-section action-stack">
          <button className="mini-btn"><Sparkles size={14} /> Generate App</button>
          <button className="mini-btn"><ImageIcon size={14} /> Design Asset</button>
          <button className="mini-btn"><Video size={14} /> Video Script</button>
          <button className="mini-btn"><LayoutTemplate size={14} /> Marketing Page</button>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="crumbs">Projects / Smart Workspace</div>
          <div className="top-actions">
            <button className="action-pill success">Deploy</button>
            <button className="action-pill accent">Share</button>
          </div>
        </header>

        <div className="editor-layout">
          <div className="editor-panel card-panel">
            <div className="panel-header">
              <span>{selectedFile}</span>
              <button className="panel-action">AI Fix</button>
            </div>
            <Editor
              height="48vh"
              theme="vs-dark"
              language={language}
              value={activeFile}
              onChange={(value) => value !== undefined && updateFile(selectedFile, value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 20 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          <div className="preview-panel card-panel">
            <div className="panel-header">
              <span>Live Preview</span>
              <button className="panel-action">Refresh</button>
            </div>
            <iframe title="preview" srcDoc={previewHtml} className="preview-frame" />
          </div>
        </div>

        <div className="bottom-grid">
          <div className="card-panel chat-panel">
            <div className="panel-header">
              <span><Bot size={16} /> AI Assistant</span>
            </div>
            <div className="chat-stream">
              {chat.map((msg, index) => (
                <div key={`${msg.role}-${index}`} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI to fix, generate or design..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleChat();
                }}
              />
              <button onClick={handleChat} disabled={isLoading}>
                <Send size={16} />
              </button>
            </div>
          </div>

          <div className="card-panel terminal-panel">
            <div className="panel-header">
              <span><TerminalSquare size={16} /> Terminal</span>
            </div>
            <div className="terminal-output">
              {terminalLogs.map((line, index) => (
                <div key={`${line}-${index}`} className="terminal-line">{line}</div>
              ))}
            </div>
            <div className="terminal-input-row">
              <input
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type command..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTerminalRun();
                }}
              />
              <button onClick={handleTerminalRun}>Run</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
