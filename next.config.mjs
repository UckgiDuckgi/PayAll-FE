/** @type {import('next').NextConfig} */
const nextConfig = {
  // 외부 접근 허용을 위한 설정 추가
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
};

export default nextConfig;
