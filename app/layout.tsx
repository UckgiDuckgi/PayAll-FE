import Header from '@/components/Header';
import Nav from '@/components/Nav';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PayAll',
  description:
    '결제 내역을 계좌 정보에서 관리하고 최저가로 한 번에 결제하세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <div className='App'>
          <Header />
          <div className='w-[90%] mx-auto pt-16'>{children}</div>
          <Nav />
        </div>
      </body>
    </html>
  );
}
