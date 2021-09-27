let dfdObj = require("./utils/setConfig.js");
let Logger = require("./module/logger/logger.js");
let faceDetection = require("./modules/operator/faceDetection.js");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/AISearch/",
});

logger.info("开始运行人脸识别脚本！");
console.show();

var countAdd = 0;

log("颜值：" + dfdObj.getDfdObjParam("faceValue"));
log("数量：" + dfdObj.getDfdObjParam("starNum"));
log("性别：" + dfdObj.getDfdObjParam("gender"));

if (app.launch(dfdObj.getDfdObjParam("appPackage"))) {
  logger.info("抖音打开成功！");
  toast("抖音打开成功！");

  if (!requestScreenCapture(false)) {
    logger.info("请求截图失败!");
    exit();
  }

  var addStar_x = (addStar_y = null);
  logger.info("正在定位点赞控件！");
  if (dfdObj.getDfdObjParam("favorLocation") != null) {
    addStar_x = dfdObj.getDfdObjParam("favorLocation").split(",")[0];
    addStar_y = dfdObj.getDfdObjParam("favorLocation").split(",")[1];
    logger.info("定位点赞控件成功!");
  }

  var addHeart_x = (addHeart_y = null);
  logger.info("正在定位关注控件！");
  if (dfdObj.getDfdObjParam("focusOnLocation") != null) {
    addHeart_x = dfdObj.getDfdObjParam("focusOnLocation").split(",")[0];
    addHeart_y = dfdObj.getDfdObjParam("focusOnLocation").split(",")[1];
    logger.info("定位关注控件成功!");
  }
  var res = faceDetection.faceDetection(
    dfdObj.getDfdObjParam("videoAllTime"),
    dfdObj.getDfdObjParam("starNum"),
    dfdObj.getDfdObjParam("ak"),
    dfdObj.getDfdObjParam("sk"),
    dfdObj.getDfdObjParam("gender"),
    dfdObj.getDfdObjParam("faceValue"),
    [
      { name: "点赞", x: addStar_x, y: addStar_y },
      { name: "关注", x: addHeart_x, y: addHeart_y },
    ]
  );
  if (res != null && res[1] != null) {
    countAdd = res[1];
  }
}
logger.info(
  "运行结束！共关注" +
    countAdd +
    "位颜值" +
    dfdObj.getDfdObjParam("faceValue") +
    "分以上的用户!"
);

logger.info("谢谢您的使用，再见！");
toast("谢谢您的使用，再见！");
sleep(5000);
console.hide();
