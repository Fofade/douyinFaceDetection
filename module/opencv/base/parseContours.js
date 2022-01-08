// 解析Contours数据
runtime.images.initOpenCvIfNeeded();
importClass(org.opencv.imgproc.Imgproc);
importClass(org.opencv.core.Mat);
importClass(org.opencv.core.MatOfPoint2f);
let Logger = require("../../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/parseContours/",
});

var parseContours = (function () {
  let q = {};

  /**
   * 解析contours数据
   * @param {*} contours 轮廓
   * @returns 解析数据{bigArr:路径数据, cxyArr:中心, areaArr:面积}
   */
  q.parse = function (contours) {
    let parse = []; // 解析结果合集
    let obj = {}; // 解析结果
    for (let i = 0; i < contours.size(); ++i) {
      let item = contours.get(i);
      // 最小外接矩形
      let rotateRect = Imgproc.minAreaRect(new MatOfPoint2f(item.toArray()));
      // 矩形中心
      obj.cxyArr = [rotateRect.center.x, rotateRect.center.y]; // 矩形中心
      // 轮廓面积
      let area = Math.abs(Imgproc.contourArea(item));
      obj.areaArr = area; // 轮廓面积
      var len = item.size();
      let arr = [];
      // 提取轮廓坐标
      for (var w = 0; w < len.width; w++) {
        for (var h = 0; h < len.height; h++) {
          arr.push(item.get(h, w));
        }
      }
      obj.bigArr = arr; // 轮廓坐标
      logger.info("解析轮廓数据成功！")
      parse.push(obj);
    }
    return parse;
  };
  return q;
})();

module.exports = parseContours;
