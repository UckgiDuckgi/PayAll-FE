import localFont from 'next/font/local';

export const pretendardFont = localFont({
  src: [
    { path: './fonts/Pretendard/Pretendard-Thin.otf', weight: '100' },
    { path: './fonts/Pretendard/Pretendard-ExtraLight.otf', weight: '200' },
    { path: './fonts/Pretendard/Pretendard-Light.otf', weight: '300' },
    { path: './fonts/Pretendard/Pretendard-Regular.otf', weight: '400' },
    { path: './fonts/Pretendard/Pretendard-Medium.otf', weight: '500' },
    { path: './fonts/Pretendard/Pretendard-SemiBold.otf', weight: '600' },
    { path: './fonts/Pretendard/Pretendard-Bold.otf', weight: '700' },
    { path: './fonts/Pretendard/Pretendard-ExtraBold.otf', weight: '800' },
    { path: './fonts/Pretendard/Pretendard-Black.otf', weight: '900' },
  ],
  variable: '--font-pretendard',
});

export const bmDohyeonFont = localFont({
  src: [{ path: './fonts/BMDOHYEON.otf', weight: '400' }],
  variable: '--font-bm-dohyeon',
});
