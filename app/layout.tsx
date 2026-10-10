import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Joo Door AI IDE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
