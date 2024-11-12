const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Customize the config here as needed
  config.resolve.fallback = {
    crypto: require.resolve("react-native-crypto"),
    // add any other fallbacks if necessary
    stream: require.resolve("stream-browserify"),
    vm: require.resolve("vm-browserify"),
    crypto: require.resolve('crypto-browserify'),
  };

  

  return config;
};
