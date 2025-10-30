import './globals.css';

export const metadata = {
  title: 'DocuMind',
  description: 'AI Summarization Tool',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
