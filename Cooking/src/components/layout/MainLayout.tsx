import { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col" data-id="oes4mxyiv" data-path="src/components/layout/MainLayout.tsx">
      <NavBar />
      <main className="flex-1" data-id="njy8f0iow" data-path="src/components/layout/MainLayout.tsx">{children}</main>
      <Footer />
    </div>);

};

export default MainLayout;