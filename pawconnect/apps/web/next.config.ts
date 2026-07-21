import { ENV } from '@/constants/env';
import type { NextConfig } from 'next';

// console.log, info, debug의 경우 제거
// console.error, warn의 경우 남아있음
const nextConfig: NextConfig = {
    compiler: {
        removeConsole:
            ENV.NODE_ENV === 'production',
    },
};

export default nextConfig;