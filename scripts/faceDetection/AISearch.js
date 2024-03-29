// 只服务于上级脚本，所以路径需要特殊设置
let dfdObj = require("./utils/setConfig.js");
let Logger = require("./module/logger/logger.js");
let faceDetection = require("./scripts/faceDetection/base/faceDetection.js");

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

  var addStar_x = null;
  var addStar_y = null;
  logger.info("正在定位点赞控件！");
  let favorLocation = dfdObj.getDfdObjParam("favorLocation");
  logger.info("加载位置:" + JSON.stringify(favorLocation))
  if (favorLocation != null && favorLocation != undefined) {
    addStar_x = favorLocation.split(",")[0];
    addStar_y = favorLocation.split(",")[1];
    logger.info("定位点赞控件成功![" + addStar_x + "," + addStar_y + "]");
  }

  var addHeart_x = null;
  var addHeart_y = null;
  logger.info("正在定位关注控件！");
  let focusOnLocation = dfdObj.getDfdObjParam("focusOnLocation");
  logger.info("加载位置:" + JSON.stringify(focusOnLocation));
  if (focusOnLocation != null && focusOnLocation != undefined) {
    addHeart_x = focusOnLocation.split(",")[0];
    addHeart_y = focusOnLocation.split(",")[1];
    logger.info("定位关注控件成功![" + addHeart_x + "," + addHeart_y + "]");
  }
  var res = faceDetection.faceDetection(
    dfdObj.getDfdObjParam("videoAllTime"),
    dfdObj.getDfdObjParam("starNum"),
    dfdObj.getDfdObjParam("ak"),
    dfdObj.getDfdObjParam("sk"),
    dfdObj.getDfdObjParam("gender"),
    dfdObj.getDfdObjParam("faceValue"),
    [{
        name: "点赞",
        x: addStar_x,
        y: addStar_y,
        t: 200
      },
      {
        name: "关注",
        x: addHeart_x,
        y: addHeart_y,
        t: 200
      },
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