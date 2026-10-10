export async function POST(req: Request) {
  try {
    const body = await req.json();
    const command = String(body.command ?? '').trim();
    const allowed = ['help', 'ls', 'cat', 'open', 'preview', 'clear'];

    if (!command) {
      return Response.json({ ok: false, output: 'Command is required.' }, { status: 400 });
    }

    const first = command.split(' ')[0].toLowerCase();
    if (!allowed.includes(first)) {
      return Response.json({
        ok: false,
        output: 'Command blocked by sandbox. Allowed commands: help, ls, cat, open, preview, clear',
      });
    }

    if (first === 'help') {
      return Response.json({ ok: true, output: 'Available commands: ls, cat <file>, open <file>, preview, clear, help' });
    }

    if (first === 'ls') {
      return Response.json({ ok: true, output: ['src/App.tsx', 'src/styles.css', 'index.html'] });
    }

    if (first === 'preview') {
      return Response.json({ ok: true, output: 'Preview stream active. Project is ready to display in the Live Preview panel.' });
    }

    if (first === 'clear') {
      return Response.json({ ok: true, output: 'Terminal cleared.' });
    }

    if (first === 'cat') {
      const file = command.replace(/^cat\s+/i, '').trim();
      const content = {
        'src/App.tsx': `export default function App() {\n  return <main>Joo Door AI IDE</main>;\n}`,
        'src/styles.css': `body { background: #020817; color: white; }`,
        'index.html': `<!doctype html><html><body><h1>Live Preview</h1></body></html>`,
      }[file];

      if (!content) {
        return Response.json({ ok: false, output: 'File not found' }, { status: 404 });
      }

      return Response.json({ ok: true, output: content });
    }

    if (first === 'open') {
      const file = command.replace(/^open\s+/i, '').trim();
      const exists = ['src/App.tsx', 'src/styles.css', 'index.html'].includes(file);
      return Response.json({
        ok: exists,
        output: exists ? `Opened ${file}` : 'File not found',
      });
    }

    return Response.json({ ok: false, output: 'Unsupported command' }, { status: 400 });
  } catch (error) {
    console.error('Terminal API error:', error);
    return Response.json({ ok: false, output: 'Terminal failed to execute the command.' }, { status: 500 });
  }
}
