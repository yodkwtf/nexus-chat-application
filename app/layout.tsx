import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from './context/ToasterContext';
import AuthContextProvider from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexus - Your Ultimate Chat Experience',
  description:
    'Nexus is a revolutionary chat application that transcends traditional messaging. Immerse yourself in rich, dynamic conversations, collaborate effortlessly, and forge meaningful connections with friends and colleagues. Join Nexus today and experience a new era of communication.',
  keywords: [],
  twitter: {
    card: 'summary_large_image',
    creator: '@yodkwtf',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
