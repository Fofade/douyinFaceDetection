console.log("【模块】findImage:", files.cwd());
// 找图, 返回图片中心坐标("x,y")
// let baseOperator = require("../operator/baseOperator");
let Logger = require("../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/findImage/",
});

var findImage = (function () {
  let q = {};
  let count = 20; // 找图最大次数

  /**
   * 获取小图位置
   * @param {*} image64 小图
   * @param {*} simulation 相似度
   * @param {*} region 限制区域
   * @returns 
   */
  q.getImageLocation = function (image64, simulation, region) {
    logger.info("开始寻找小图!");
    let point = {};
    do {
      logger.info("等待两秒!");
      sleep(2000);
      var c1 = captureScreen();
      var c2 = images.grayscale(c1); // 灰度
      // 二值化
      var c3 = images.threshold(c2, 100, 255, "BINARY");
      var img = c1;
      logger.info("已截图：[" + img + "]");
      var d1 = images.fromBase64(image64);
      var d2 = images.grayscale(d1);
      var d3 = images.threshold(d2, 100, 255, "BINARY");
      var img_s = d1;
      logger.info("已获取小图:[" + img_s + "]");
      // baseOperator.saveImage([{
      //   name: "小图" + count,
      //   img: img_s,
      //   type: "png"
      // }]);
      logger.info("期望相似度：[" + simulation + "]");
      // baseOperator.saveImage([{
      //   name: "大图" + count,
      //   img: img,
      //   type: "png"
      // }]);
      // findImage
      let res = images.matchTemplate(img, img_s, {
        region: region,
        threshold: simulation,
        max: 10,
        transparentMask: true,
      });
      logger.info("找图结果:[" + JSON.stringify(res) + "]");
      if (res == null) {
        logger.warn("找图失败！再次尝试！");
        count--;
      } else {
        logger.info("恭喜！找图成功！");
        res["matches"].forEach(r => {
          if (point.s) {
            if (r["similarity"] > point.s) {
              point.x = r["x"];
              point.y = r["y"];
              point.s = r["similarity"];
            }
          } else {
            point.x = r["x"];
            point.y = r["y"];
            point.s = r["similarity"];
          }
        });
      }
      // 内存回收
      c1.recycle();
      c2.recycle();
      c3.recycle();
      d1.recycle();
      d2.recycle();
      d3.recycle();
      img.recycle();
      img_s.recycle();
    } while (count > 0 && point == null);
    if (count <= 0) {
      logger.warn("二十次找图都失败了呢！别挣扎了，重新启动app再尝试吧！");
      exit();
    }
    return point.x + "," + point.y;
  };
  return q;
})();

module.exports = findImage;