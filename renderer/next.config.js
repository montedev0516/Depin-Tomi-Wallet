/** @type {import('next').NextConfig} */
module.exports = {
    output: 'export',
    reactStrictMode: false,
    distDir: process.env.NODE_ENV === 'production' ? '../app' : '.next',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // env: {
    //     NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    //     NEXT_PUBLIC_THIRDWEB_SECRET_KEY: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY
    // },
    webpack: (config) => {
        return config
    },
}