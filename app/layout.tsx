import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Joo Door AI IDE',
  description: 'AI workstation for code, interface design, content and terminal execution.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
