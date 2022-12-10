const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@Rtk': path.resolve(__dirname, './src/Rtk'),
      '@Pages': path.resolve(__dirname, 'src/Pages'),
      '@Assets': path.resolve(__dirname, './src/assets'),
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Endpoints': path.resolve(__dirname, './src/CONSTS/endpoints')
    },
  },
};
