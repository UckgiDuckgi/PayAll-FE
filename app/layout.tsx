import { Providers } from '@/components/Provider';
import type { Metadata } from 'next';
import { bmDohyeonFont, pretendardFont } from './fonts';
import './globals.css';

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
        <div
          className={`App ${pretendardFont.variable} ${bmDohyeonFont.variable} font-sans`}
        >
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
