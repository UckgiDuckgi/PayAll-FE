/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
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
