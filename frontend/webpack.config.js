// webpack.config.js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/components/maps'),
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                        cleanupIDs: false, // Preserve group IDs
                        collapseGroups: false // Keep original group structure
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  }
};
