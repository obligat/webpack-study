module.exports = {
  mode: "production", // 如果不添加就会警告
  entry: {
    index: "./src/index.js", // 一个入口文件
    chunk1: "./src/chunk1.js" // 两一个入口文件
  },
  output: {
    filename: "[name].bundle.js" // 出口文件
  }
};
