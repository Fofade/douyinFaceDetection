runtime.images.initOpenCvIfNeeded();
importClass(java.util.ArrayList);
importClass(org.opencv.imgproc.Imgproc);
importClass(org.opencv.core.Mat);
let Logger = require("../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/baseOpencv/",
});

var baseOpencv = (function () {
  let q = {};

  /**
   * 获取mat对象
   * @param {*} img 图片对象
   * @returns mat
   */
  q.getMat = function (img) {
    return img.getMat();
  };

  /**
   * 获取处理后的图片
   * @param {*} img 初始图片(Mat对象)
   * @param {*} type 处理选择 Imgproc.COLOR_BGR2GRAY
   * @returns 处理后的图片
   */
  q.getCvtColor = function (img, type) {
    let srcMat = new Mat();
    Imgproc.cvtColor(img, srcMat, type);
    logger.info("图片处理完成！");
    return srcMat;
  };

  /**
   * 高斯滤波
   * @param {*} img 传入图像(Mat对象)
   * @param {*} kSize 高斯内核的大小。其中ksize.width和ksize.height可以不同，但他们都必须为正数和奇数（并不能理解）。或者，它们可以是零的，它们都是由sigma计算而来。newSize(5)
   * @param {*} sigmaX 表示高斯核函数在X方向的的标准偏差
   * @param {*} sigmaY 表示高斯核函数在Y方向的的标准偏差。若sigmaY为零，就将它设为sigmaX，如果sigmaX和sigmaY都是0，那么就由ksize.width和ksize.height计算出来。
   * @returns 处理后的图像
   */
  q.getGaussianBlur = function (img, kSize, sigmaX, sigmaY) {
    let gb = new Mat();
    Imgproc.GaussianBlur(img, gb, kSize, sigmaX, sigmaY);
    logger.info("图片高斯滤波完成！");
    return gb;
  };

  /**
   * 膨胀腐蚀操作
   * @param {*} img (Mat对象)
   * @param {*} op 表示形态学运算的类型 Imgproc.MORPH_CLOSE
   * @param {*} kernel 形态学运算的内核。为NULL，使用参考点位于中心3x3的核。一般使用函数getStructuringElement配合这个参数的使用，kernel参数填保存getStructuringElement返回值的Mat类型变量。Imgproc.getStructuringElement(Imgproc.MORPH_RECT, newSize(5))
   */
  q.getMorphologyEx = function (img, op, kernel) {
    let me = new Mat();
    Imgproc.morphologyEx(img, me, op, kernel);
    logger.info("图片膨胀腐蚀完成！");
    return me;
  };

  /**
   * 寻找轮廓
   * @param {*} img (Mat对象)
   * @param {*} mode int型的mode，定义轮廓的检索模式 CV_RETR_EXTERNAL CV_RETR_LIST CV_RETR_CCOMP CV_RETR_TREE
   * @param {*} method int型的method，定义轮廓的近似方法
   */
  q.findContours = function (img, mode, method) {
    let contours = new java.util.ArrayList(); // 保存轮廓数据
    let hierarchy = new Mat();
    Imgproc.findContours(img, contours, hierarchy, mode, method);
    logger.info("图片寻找轮廓完成！");
    return contours;
  };

  return q;
})();

module.exports = baseOpencv;
