const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@Rtk': path.resolve(__dirname, './src/rtk'),
      '@Pages': path.resolve(__dirname, './src/pages'),
      '@Assets': path.resolve(__dirname, './src/assets'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Endpoints': path.resolve(__dirname, './src/consts/endpoints')
    },
  },
};
