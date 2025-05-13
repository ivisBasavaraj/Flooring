const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.mjs'],
    alias: {
      // Create an alias for the problematic import
      '../lib/iconBase': path.resolve(__dirname, 'node_modules/react-icons/lib/iconBase.mjs')
    },
    // Configure module resolution for ESM imports
    extensionAlias: {
      '.js': ['.js', '.jsx', '.mjs'],
      '.cjs': ['.cjs', '.js'],
      '.mjs': ['.mjs', '.js']
    }
  }
}; 