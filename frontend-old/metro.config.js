const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

// Configurações adicionais para resolver problemas comuns
config.resolver.assetExts.push("cjs");
config.transformer.minifierPath = require.resolve("metro-minify-terser");
config.transformer.minifierConfig = {};

module.exports = config;
