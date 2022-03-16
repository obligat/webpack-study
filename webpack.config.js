module.exports = {
  mode: "production", // 如果不添加就会警告
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js" // 出口文件
  }
};
