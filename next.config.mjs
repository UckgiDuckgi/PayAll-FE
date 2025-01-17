/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 설정 유지
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },

  // 이미지 도메인 설정 추가
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.danawa.com',
      },
      // 필요한 다른 도메인들도 여기에 추가
    ],
  },
};

export default nextConfig;
