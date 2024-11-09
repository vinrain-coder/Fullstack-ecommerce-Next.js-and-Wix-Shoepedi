/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {}, // Optional, but useful for handling @import statements
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
