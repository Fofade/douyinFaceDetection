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

  /**
   * 比较相似轮廓(实现)-存在未定义方法,无法使用
   * @param {*} contours1 解析后的小轮廓(单个)
   * @param {*} contours2 解析后的大轮廓(多)
   * @returns contours2中相似的轮廓数组
   */
  q.equalContours = function (contours1, contours2) {
    let equals = [];
    // 小轮廓矩形度和宽高比
    let smallImgRectangularity = getRectangularity(contours1); // 未知方法
    let smallImgAspectRatio = getAspectRatio(contours1); // 未知方法
    // 设定矩形度上下限(误差值), 宽高比同理
    let rectangularityUnit = 0.1;
    // 矩形度上下限
    let rectangularityLowerLimit =
      smallImgRectangularity - rectangularityUnit < 0
        ? 0
        : smallImgRectangularity - rectangularityUnit;
    let rectangularityUpperLimit =
      smallImgRectangularity + rectangularityUnit > 1
        ? 1
        : smallImgRectangularity + rectangularityUnit;
    // 宽高比上下限
    let rectangularityHeightWidthLowerLimit =
      smallImgAspectRatio - rectangularityUnit < 0
        ? 0
        : smallImgAspectRatio - rectangularityUnit;
    let rectangularityHeightWidthUpperLimit =
      smallImgAspectRatio + rectangularityUnit > 1
        ? 1
        : smallImgAspectRatio + rectangularityUnit;
    // 遍历大轮廓数据
    contours2.forEach((c2) => {
      // 矩形度
      let itemRectangularity = getRectangularity(c2); // 未知方法
      // 宽高比
      let itemHeightWidthLimit = getAspectRatio(c2);
      if (
        itemRectangularity > rectangularityLowerLimit &&
        itemRectangularity < rectangularityUpperLimit
      ) {
        logger.info("矩形度匹配完成！");
        if (
          itemHeightWidthLimit > rectangularityHeightWidthLowerLimit &&
          itemHeightWidthLimit < rectangularityHeightWidthUpperLimit
        ) {
          logger.info("宽高比匹配完成！");
          equals.push(c2);
          logger.info("新增相似轮廓！");
        }
      }
    });
    return equals;
  };

  /**
   * opencv自带轮廓比较函数
   * @param {*} contours1 解析前的小轮廓1-取第一个
   * @param {*} contours2 解析前的轮廓2
   * @param {*} method 比较方式
   * @param {*} parameter 参数
   * @returns 比较结果 double 数组 按轮廓2数据顺序
   */
  q.autoEqualsContours = function (contours1, contours2, method, parameter) {
    let match = []; // double 数组
    let method_tmp = null;
    if (method == 1) method_tmp = Imgproc.CV_CONTOURS_MATCH_I1;
    // 不确定参数是否正确
    else if (method == 2) method_tmp = Imgproc.CV_CONTOURS_MATCH_I2;
    else if (method == 3) method_tmp = Imgproc.CV_CONTOURS_MATCH_I2;
    logger.info("开始计算轮廓相似度！");
    contours2.forEach((c) => {
      match.push(Imgproc.matchShapes(c, contours1[0], method_tmp, parameter));
    });
    logger.info("相似度计算完成！");
    return match;
  };
  return q;
})();

module.exports = baseOpencv;
