// 找图, 返回图片中心坐标("x,y")
let getPath = require(files.path("../../utils/getPath.js"));
let Logger = require(getPath.getRelativePath("../module/logger/logger.js"));

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: getPath.getRelativePath("../../data/scripts/findImage/"),
});

var findImage = (function () {
  let q = {};
  q.getImageLocation = function (image64, simulation) {
    logger.info("开始寻找小图!");
    let point = null;
    do {
      logger.info("等待两秒!");
      sleep(2000);
      point = images.findImage(captureScreen(), images.fromBase64(image64), {
        threshold: simulation,
      });
      logger.info("找图结果:[" + point + "]");
      if (point == null) logger.warn("找图失败！再次尝试！");
    } while (point != null);
    return point.x + "," + point.y;
  };
  return q;
})();

module.exports = findImage;
