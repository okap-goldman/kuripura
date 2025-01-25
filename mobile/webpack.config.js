const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Webpackの設定をカスタマイズ
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'),
    url: require.resolve('url-parse'),
    uuid: require.resolve('uuid'),
  };

  return config;
}; 