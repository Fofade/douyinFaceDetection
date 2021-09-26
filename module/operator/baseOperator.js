let Logger = require("../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/baseOperator/",
});

var baseOperator = (function () {
  let q = {};
  q.autoSwipe = function () {
    swipe(
      device.width / 2,
      device.height - device.height / 8,
      device.width / 2,
      device.height / 8,
      1500
    );
  };
  /**
   * 循环点击
   * @param {*} clicks 点击集合{name, x, y}
   */
  q.autoClick = function (clicks) {
    clicks.forEach((c) => {
      if (c["x"] != null) {
        click(c["x"], c["y"]);
        logger.info(c["name"] + "完成！");
      } else logger.warn(c["name"] + "控件获取失败！就不点了！你自个儿点吧！");
    });
  };
  return q;
})();

module.exports = faceDetection;
