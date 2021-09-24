let getPath = require(files.path("file://../utils/getPath.js"));
let dfdObj = require(getPath.getRelativePath("file://../utils/setConfig.js"));
let Logger = require(getPath.getRelativePath("file://../module/logger/logger.js"));

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: getPath.getRelativePath("file://../data/scripts/AISearch/"),
});

logger.info("开始运行人脸识别脚本！");
console.show();

var countVid = 1; //滑动的视频数
var countAdd = 0; //关注的视频数

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

  logger.info("正在定位控件！");
  var addStar_x = dfdObj.getDfdObjParam("favorLocation").split(",")[0];
  var addStar_y = dfdObj.getDfdObjParam("favorLocation").split(",")[1];
  logger.info("定位关注控件成功!");

  var addHeart_x = dfdObj.getDfdObjParam("focusOnLocation").split(",")[0];
  var addHeart_y = dfdObj.getDfdObjParam("focusOnLocation").split(",")[1];
  logger.info("定位点赞控件成功!");

  while (countAdd < dfdObj.getDfdObjParam("starNum")) {
    var time = 1000;
    var allTime = 0.3 * 60 * 1000;

    for (var i = 0; allTime > 0; i++) {
      var temAdd = countAdd;
      var img = captureScreen();
      var imgFile = i + ".png";
      images.saveImage(img, imgFile);
      logger.info("…………开始人脸识别！…………");
      toast("开始人脸识别！");
      var imgNow = images.read(imgFile);
      var access_token = http
        .get(
          "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" +
            dfdObj.getDfdObjParam("ak") +
            "&client_secret=" +
            dfdObj.getDfdObjParam("sk")
        )
        .body.json().access_token;
      var url =
        "https://aip.baidubce.com/rest/2.0/face/v3/detect" +
        "?access_token=" +
        access_token;
      var image64 = images.toBase64(imgNow);
      if (imgNow) {
        var res = http.post(url, {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          image: image64,
          image_type: "BASE64",
          face_field: "gender,age,beauty",
        });

        var str = JSON.parse(res.body.string());

        if (str["error_msg"] == "pic not has face") {
          logger.info("没有检测到人脸！");
          toast("没有检测到人脸！");
        } else if (str["error_msg"] == "SUCCESS") {
          log("检测到了" + str["result"]["face_num"] + "张人脸");
          log("人脸性别为：" + str["result"]["face_list"][0]["gender"]["type"]);
          log("人脸年龄为：" + str["result"]["face_list"][0]["age"]);
          log("人脸颜值为：" + str["result"]["face_list"][0]["beauty"]);
          toast(
            "人脸性别为：[" +
              str["result"]["face_list"][0]["gender"]["type"] +
              "]  人脸颜值为：[" +
              str["result"]["face_list"][0]["beauty"] +
              "]"
          );
          if (
            str["result"]["face_list"][0]["gender"]["type"] ==
            dfdObj.getDfdObjParam("gender")
          ) {
            if (
              str["result"]["face_list"][0]["beauty"] >
              dfdObj.getDfdObjParam("faceValue")
            ) {
              log("人脸颜值合格!");
              toast("人脸颜值合格!");
              click(addStar_x, addStar_y);
              click(addHeart_x, addHeart_y);
              countAdd++;
            }
          }
        }
      }
      logger.info("…………视频【" + countVid + "】的人脸识别运行结束…………");
      toast("人脸识别完成！");
      time += 1000 * i;
      allTime = allTime - time;
      sleep(time);
      logger.info(
        "第" + countVid + "个视频完成！已点赞关注" + countAdd + "个视频"
      );
      files.remove(imgFile);
      if (temAdd < countAdd) {
        logger.info("视频已关注！");
        toast("视频已关注！");
        if (dfdObj.getDfdObjParam("starNum") != countAdd) {
          swipe(
            device.width / 2,
            device.height - device.height / 8,
            device.width / 2,
            device.height / 8,
            1500
          );
          logger.info("滑动完成！");
          countVid++;
        }
        break;
      } else {
        logger.info("视频不符合您的审美！");
        toast("视频不符合您的审美！");
        if (allTime < 0) {
          swipe(
            device.width / 2,
            device.height - device.height / 8,
            device.width / 2,
            device.height / 8,
            1500
          );
          logger.info("滑动完成！");
          countVid++;
        }
      }
    }
  }
}
logger.info(
  "运行结束！共关注" +
    countAdd +
    "位颜值" +
    dfdObj.getDfdObjParam("faceValue") +
    "分以上的用户!"
);
toast(
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
