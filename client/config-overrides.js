const { override, addWebpackResolve } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackResolve({
    extensions: ['.js', '.jsx', '.json', '.mjs'],
    alias: {
      // Create aliases for the problematic imports in react-icons
      '../lib/iconBase': path.resolve(__dirname, 'node_modules/react-icons/lib/iconBase.mjs')
    },
    extensionAlias: {
      '.js': ['.js', '.jsx', '.mjs'],
      '.cjs': ['.cjs', '.js'],
      '.mjs': ['.mjs', '.js']
    }
  })
);

module.exports = function override(config, env) {
  // Add module alias for react-icons to use our mock implementation
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-icons/fa': path.resolve(__dirname, 'src/planner/reactIconsMock.js'),
    'react-icons/md': path.resolve(__dirname, 'src/planner/reactIconsMock.js'),
    'react-icons/ti': path.resolve(__dirname, 'src/planner/reactIconsMock.js'),
  };
  
  return config;
}; 