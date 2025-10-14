/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ['@prettier/plugin-oxc'], // TODO: update to use oxlint/formatter https://oxc.rs/docs/guide/usage/formatter.html
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
};

export default config;
