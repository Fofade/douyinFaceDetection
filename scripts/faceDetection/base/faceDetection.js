// 只服务于上级脚本，所以路径需要特殊设置
let Logger = require("../../../module/logger/logger");
let baseOperator = require("../../../module/operator/baseOperator");
let netOperator = require("../../../module/operator/netOperator");
let algorithmIncrease = require("../../../module/operator/algorithmIncrease");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/faceDetection/",
});

var faceDetection = (function () {
  let q = {};

  /**
   * 人脸识别执行脚本-普通模式
   * @param {*} videoScanTime 单个视频扫描时长
   * @param {*} requires 要求的操作数目
   * @param {*} clicks 点击参数
   * @return 滑动的视频数、关注的视频数
   */
  q.faceDetection = function (
    videoScanTime,
    requires,
    ak,
    sk,
    gender,
    faceValue,
    clicks
  ) {
    var swipeCount = 0; // 滑动视频数
    var favorCount = 0; // 操作数

    while (favorCount < requires) {
      logger.info("开始第" + (swipeCount + 1) + "个视频");
      let videoScan = videoScanTime * 1000; // 单视频最长停留时间
      let ladderTime = 1 * 1000; // 扫描间隔时间控制(哈哈，谁能想到灵感来源于阶梯电费)

      for (var j = 0; videoScan > 0; j++) {
        var img = captureScreen();
        if (img) {
          var res = netOperator.baiduFaceDetection(ak, sk, img);
          if (
            res != null &&
            netOperator.baiduFaceDetectionResultParse(res, gender, faceValue)
          ) {
            baseOperator.autoPress(clicks);
            favorCount++;
            videoScan = -1;
          }else {
            let o = algorithmIncrease.leapfrog(ladderTime, j); // 算法跃迁
            ladderTime = o.num;
            videoScan -= ladderTime;
            logger.info("[有图]本次识别消耗时间:" + ladderTime / 1000 + "s 剩余时间:" + videoScan / 1000 + "s");
          }
        } else {
          let o = algorithmIncrease.isometric(ladderTime, j); // 算法跃迁
          ladderTime = o.num;
          videoScan -= ladderTime;
          logger.info("[无图]本次识别消耗时间:" + ladderTime / 1000 + "s 剩余时间:" + videoScan / 1000 + "s");
        }
        img.recycle();
      }
      baseOperator.autoSwipe();
      swipeCount++;
    }
    return [swipeCount, favorCount];
  };

  /**
   * 人脸识别执行脚本-强化模式=>增加本地识别(人脸识别js)
   * @param {*} videoScanTime 单视频扫描时长
   * @param {*} requires 待操作视频数
   * @param {*} ak 百度ak
   * @param {*} sk 百度sk
   * @param {*} gender 性别
   * @param {*} faceValue 颜值
   * @param {*} clicks 操作坐标合集
   */
  q.faceDetectionPlus = function (
    videoScanTime,
    requires,
    ak,
    sk,
    gender,
    faceValue,
    clicks
  ) {
    var swipeCount = 0; // 滑动视频数
    var favorCount = 0; // 操作数

    while (favorCount < requires) {
      logger.info("开始第" + (swipeCount + 1) + "个视频");
      let videoScan = videoScanTime * 1000; // 单视频最长停留时间
      let ladderTime = 1 * 1000; // 扫描间隔时间控制(哈哈，谁能想到灵感来源于阶梯电费)

      for (var j = 0; videoScan > 0; j++) {
        var img = captureScreen();
        var check = "1";
        if (check != null) {
          var res = netOperator.baiduFaceDetection(ak, sk, img);
          if (
            res != null &&
            netOperator.baiduFaceDetectionResultParse(res, gender, faceValue)
          ) {
            baseOperator.autoClick(clicks);
            favorCount++;
            videoScan = -1;
          }else {
            let o = algorithmIncrease.leapfrog(ladderTime, j); // 算法跃迁-plus版可以更频繁
            ladderTime = o.num;
            videoScan -= ladderTime;
            logger.info("[有脸]本次识别消耗时间:" + ladderTime / 1000 + "s 剩余时间:" + videoScan / 1000 + "s");
          }
        } else {
          let o = algorithmIncrease.isometric(ladderTime, j); // 算法跃迁-plus版可以更频繁
          ladderTime = o.num;
          videoScan -= ladderTime;
          logger.info("[无脸]本次识别消耗时间:" + ladderTime / 1000 + "s 剩余时间:" + videoScan / 1000 + "s");
        }
        img.recycle();
      }
      baseOperator.autoSwipe();
      swipeCount++;
    }
    return [swipeCount, favorCount];
  };
  return q;
})();

module.exports = faceDetection;