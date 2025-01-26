const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@kuripura/shared']
    }
  }, argv);

  // Webpackの設定をカスタマイズ
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve('path-browserify'),
    url: require.resolve('url-parse'),
    uuid: require.resolve('uuid'),
  };

  // カスタム設定を追加
  config.devServer = {
    ...config.devServer,
    host: '0.0.0.0',
    port: 8081,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  return config;
}; 