// 相对地址处理
// let getPath = require(files.path("./getPath.js"));

var getPath = (function () {
  let q = {};

  q.getRelativePath = function (path) {
    return files.path(path);
  };
})();
module.exports = getPath;
