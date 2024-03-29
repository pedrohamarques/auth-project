module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@typings": "./src/typings",
            "@constants": "./src/constants",
            "@screens": "./src/screens",
            "@routes": "./src/routes",
            "@utils": "./src/utils",
            "@stores": "./src/stores",
            src: "./src",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          verbose: false,
          path: ".env",
        },
      ],
    ],
  };
};
