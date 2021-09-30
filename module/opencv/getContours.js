runtime.images.initOpenCvIfNeeded();
importClass(org.opencv.imgproc.Imgproc);
importClass(org.opencv.core.Core);
importClass(java.util.ArrayList);
importClass(org.opencv.core.Size);

let baseOpencv = require("./baseOpencv");
let Logger = require("../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/getContours/",
});

var getContours = (function () {
  let q = {};

  /**
   * 一种非常基础的获取图片轮廓数据的方式
   * @param {*} img 图片
   * @returns 轮廓数据
   */
  q.getContoursByBase = function (img) {
    var i = baseOpencv.getMat(img); // mat 对象
    var gray = baseOpencv.getCvtColor(i, Imgproc.COLOR_BGR2GRAY); // 灰度图
    var gb = baseOpencv.getGaussianBlur(gray, newSize(5), 3, 3); // 高斯滤波
    var me = baseOpencv.getMorphologyEx(
      gb,
      Imgproc.MORPH_CLOSE,
      Imgproc.getStructuringElement(Imgproc.MORPH_RECT, newSize(5))
    ); // 闭运算,腐蚀膨胀
    logger.info("准备寻找轮廓！");
    me.release();
    gray.release();
    i.release();
    return baseOpencv.findContours(
      me,
      Imgproc.RETR_EXTERNAL,
      Imgproc.CHAIN_APPROX_SIMPLE
    );
  };
  return q;
})();

module.exports = getContours;
