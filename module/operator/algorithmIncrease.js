// 增长算法
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
  return q;
})();

module.exports = algorithmIncrease;
