/** @type {import('next').NextConfig} */

const nextConfig = {
  

  api:{
    bodyParser :true,
  },

experimental: {
  missingSuspenseWithCSRBailout: false,
  appDir: true,
  serverComponentsExternalPackages: ["mongoose"],
},
images: {
  domains: ['lh3.googleusercontent.com'],
},
webpack(config) {
  config.experiments = {
    ...config.experiments,
    topLevelAwait: true,
  }
  return config
}
}

export default nextConfig;
