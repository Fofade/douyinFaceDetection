// 找图
let getContours = require("../../module/opencv/getContours");
let parseContours = require("../../module/opencv/parseContours");
let baseOpencv = require("../../module/opencv/baseOpencv");
let algorithmIncrease = require("../../module/operator/algorithmIncrease");
let Logger = require("../../module/logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/findImg/",
});

var findImg = (function () {
  let q = {};

  /**
   * 找图
   * @param {*} img1 小图
   * @param {*} img2 大图
   * @returns 包含相似度和对应轮廓的数据
   */
  q.find = function (img1, img2) {
    let c1 = getContours.getContoursByBase(img1); // 小图轮廓数据
    img1.recycle();
    let c2 = getContours.getContoursByBase(img2); // 大图轮廓数据
    img2.recycle();
    let p1 = parseContours.parse(c1); // 小图轮廓解析数据
    let p2 = parseContours.parse(c2); // 大图轮廓解析数据
    let position = []; // 轮廓数据
    if (p2 != null && p2.length > 0) {
      logger.info("大图轮廓加载完成！");
      if (p1 != null && p1.length > 0) {
        logger.info("小图轮廓加载完成！");
        // 比对轮廓数据-取小图第一个轮廓
        let equals = baseOpencv.autoEqualsContours(c1, c2, 1, 0);
        let position_tmp = []; // 临时存储
        // 绑定相似度- 将相似度与大图轮廓(解析后)绑定
        for (var i = 0; i < p2.length; i++) {
          var obj = {};
          obj.similar = equals[i];
          obj.contour = p2[i]; // 解析后的数据
          position_tmp.push(obj);
        }
        logger.info("轮廓比对完成！");
        position = algorithmIncrease.sortData("similar", "desc", position_tmp);
        logger.info("轮廓降序排列完成！");
      } else {
        logger.err("小图轮廓加载失败！");
      }
    } else {
      logger.err("大图轮廓加载失败！");
    }
    logger.info("轮廓查找完成！");
    return position;
  };

  return q;
})();

module.exports = findImg;
