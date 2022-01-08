// 算法
console.log("【模块】algorithmIncrease:", files.cwd());
let Logger = require("../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/algorithmIncrease/",
});

var algorithmIncrease = (function () {
  let q = {};

  /**
   * [base]蛙跳算法
   * @param {*} param0 传入数据
   * @returns
   */
  q.leapfrog = function ({ num, count }) {
    //蛙跳当然是等差向前跳了
    num = num + num * count;
    count = count + 1;
    logger.info("【蛙跳完成】: {" + num + "," + count + "}");
    return { num, count };
  };

  /**
   * [base]等距算法
   * @param {*} param0 传入数据
   * @returns
   */
  q.isometric = function ({ num, count }) {
    // 等距当然是原地不动了
    count = count + 1;
    logger.info("【等距完成】: {" + num + "," + count + "}");
    return { num, count };
  };

  /**
   * [mid] 贝塞尔曲线
   * @param {*} screenPoint 坐标点
   * @param {*} offset 偏移量
   * @returns 曲线上的点
   */
  q.bezier_curves = function (screenPoint, offset) {
    var cx = 3.0 * (screenPoint[1].x - screenPoint[0].x);
    var bx = 3.0 * (screenPoint[2].x - screenPoint[1].x) - cx;
    var ax = screenPoint[3].x - screenPoint[0].x - cx - bx;
    var cy = 3.0 * (screenPoint[1].y - screenPoint[0].y);
    var by = 3.0 * (screenPoint[2].y - screenPoint[1].y) - cy;
    var ay = screenPoint[3].y - screenPoint[0].y - cy - by;
    let tSquared = offset * offset;
    let tCubed = tSquared * offset;
    var result = {
      x: 0,
      y: 0,
    };
    result.x = ax * tCubed + bx * tSquared + cx * offset + screenPoint[0].x;
    result.y = ay * tCubed + by * tSquared + cy * offset + screenPoint[0].y;
    return result;
  };

  /**
   * 数据排序
   * @param {*} key 关键字, 数据内的关键字(数值)
   * @param {*} method 排序方法 asc desc
   * @returns 排序后的结果
   */
  q.sortData = function (key, method, data) {
    if (method == "desc")
      return data.sort((a, b) => {
        return a[key] - b[key];
      });
    else if (method == "asc")
      return data.sort((a, b) => {
        return b[key] - a[key];
      });
  };
  return q;
})();

module.exports = algorithmIncrease;
