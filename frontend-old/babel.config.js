module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Remova a linha abaixo se existir:
    // plugins: ['expo-router/babel']
  };
};
