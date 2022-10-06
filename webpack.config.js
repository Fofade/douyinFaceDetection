module.exports = {
  mode: "production",
  entry: "./autojs/main.node.js",
  output: {
    filename: "main.node.js",
  },
  target: "node",
  externals: {
    engines: "commonjs engines",
    shell: "commonjs shell",
    ui: "commonjs ui",
    rhino: "commonjs rhino",
    lang: "commonjs lang",
    app: "commonjs app",
    color: "commonjs color",
  },
};
