// 画轮廓
let getContours = require("../../module/opencv/getContoursopencv/getContours");
let parseContoursFilter = require("../../module/opencv/parseContoursFilterarseContoursFilter");
let parseContours = require("../../module/opencv/parseContoursencv/parseContours");
let canvasOperator = require("../../module/operator/canvasOperatorasOperator");
let Logger = require("../../module/logger/loggerger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/paintContour/",
});

var paintContour = (function () {
  let q = {};

  /**
   * 给图片画轮廓
   * @param {*} img 图片
   * @param {*} color 画笔颜色
   * @param {*} bold 画笔粗细
   * @returns 画好的图
   */
  q.paint = function (img, color, bold) {
    let c = getContours.getContoursByBase(img); // 轮廓数据
    let p = parseContoursFilter.baseFilter(parseContours.parse(c), 1); // 解析后的数据过滤
    let obj = {}; // 画图数据对象
    let paths = []; // 画图数据合集
    if (p != null && p.length > 0)
      p.forEach((pd) => {
        obj.n = pd["cxyArr"];
        obj.path = pd["bigArr"];
        obj.c = color;
        obj.b = bold;
        paths.push(obj);
      });
    let img_new = canvasOperator.autoPaintPath(img, paths); // 画轮廓
    logger.info("轮廓绘画完成！");
    return img_new; // 新的画了路径的图片
  };

  return q;
})();

module.exports = paintContour;
