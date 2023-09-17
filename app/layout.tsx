import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from './context/ToasterContext';
import AuthContextProvider from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'D-Chat',
  description: 'A chat application built by Durgesh',
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
