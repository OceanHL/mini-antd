const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  babel: async options => ({
    ...options,
  }),
  webpackFinal: async (config, { configType }) => {
    // config 中有其余属性
    console.log("config", config);

    // config.module 中只有有 rules 属性
    console.log("config.module", config.module);
    return config;
  },
  typescript: {
    // check 是否开启类型检查
    check: false,

    // checkOptions 类型检查配置选项
    checkOptions: {},

    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true, // 字符串枚举和联合将转换为 docgen 枚举格式
      shouldExtractValuesFromUnion: true, // 每个联合类型都将转换为 docgen enum 格式
      savePropValueAsString: true, // 默认属性变为string
      // 组件不想打印所有的 HTML 属性
      propFilter: (prop, component) => {
        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find(declaration => {
            return !declaration.fileName.includes("node_modules");
          });

          return Boolean(hasPropAdditionalDescription);
        }

        return true;
      },

      // compilerOptions TS编译器的配置选项
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
};
