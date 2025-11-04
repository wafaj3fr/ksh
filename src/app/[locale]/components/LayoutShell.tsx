'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface LayoutShellProps {
  children: React.ReactNode;
  logo?: {
    asset: { url: string };
    alt?: string;
  };
}

export default function LayoutShell({ children, logo }: LayoutShellProps) {
  const pathname = usePathname();

  // لا تعرض الهيدر والفوتر داخل لوحة التحكم
  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <>
      <Header logo={logo} />
      <main>{children}</main>
      <Footer />
    </>
  );
}