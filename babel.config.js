module.exports = {
  presets: [
    ["@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "targets": "> 0.25%, not dead",
        "corejs": 3,
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["import", {
      "libraryName": "antd",
      "style": true,   // or 'css'
    }],
  ],
};