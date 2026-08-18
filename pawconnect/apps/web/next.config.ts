import { ENV } from '@/constants/env';
import type { NextConfig } from 'next';

// console.log, info, debug의 경우 제거
// console.error, warn의 경우 남아있음
const nextConfig: NextConfig = {
    compiler: {
        removeConsole:
            ENV.NODE_ENV === 'production',
    },
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'pawconnect.blob.core.windows.net',
        },
        // CDN 붙이면 CDN 도메인도 추가
        ],
    },
    output: 'standalone',
};

export default nextConfig;