// 本地人像检测
// ageGenderNet 识别性别和年龄
// faceExpressionNet 识别表情,开心，沮丧，普通
// faceLandmark68Net 识别脸部特征用于mobilenet算法
// faceLandmark68TinyNet 识别脸部特征用于tiny算法
// faceRecognitionNet 识别人脸
// ssdMobilenetv1 google开源AI算法除库包含分类和线性回归
// tinyFaceDetector 比Google的mobilenet更轻量级，速度更快一点
// mtcnn  多任务CNN算法，一开浏览器就卡死
// tinyYolov2 识别身体轮廓的算法，不知道怎么用
// https://github.com/justadudewhohacks/face-api.js/#getting-started
let faceapi = require("./lib/dist/face-api.min");
let Logger = require("../../../module/logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/localFaceDetection/",
});

var localFaceDetection = (function () {
  let q = {};

  q.isExistsFace = async function (image) {
    let detections = null;
    logger.info("正在加载本地识别模型！");
    Promise.all([
      await faceapi.nets.faceRecognitionNet.loadFromDisk("./lib/weights"),
    ]).then(async () => {
      logger.info("加载本地识别模型完成！");
      detections = await faceapi.detectAllFaces(image).withFaceLandmarks(true); // 检测所有人脸 返回数组
    });
    if (detections != null && detections.length > 0) {
      logger.info("检测到人脸！");
      return detections;
    } else {
      logger.info("未检测到人脸！");
      return null;
    }
  };

  return q;
})();

module.exports = localFaceDetection;
