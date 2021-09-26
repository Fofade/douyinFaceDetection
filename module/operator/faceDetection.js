let Logger = require("../logger/logger");
let baseOperator = require("./baseOperator");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/faceDetection/",
});

var faceDetection = (function () {
  let q = {};

  /**
   * 人脸识别执行脚本
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
    var countVid = 1; //滑动的视频数
    var countAdd = 0; //关注的视频数
    while (countAdd < requires) {
      var time = 1000;
      var allTime = videoScanTime * 1000;

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
              ak +
              "&client_secret=" +
              sk
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
            log(
              "人脸性别为：" + str["result"]["face_list"][0]["gender"]["type"]
            );
            log("人脸年龄为：" + str["result"]["face_list"][0]["age"]);
            log("人脸颜值为：" + str["result"]["face_list"][0]["beauty"]);
            toast(
              "人脸性别为：[" +
                str["result"]["face_list"][0]["gender"]["type"] +
                "]  人脸颜值为：[" +
                str["result"]["face_list"][0]["beauty"] +
                "]"
            );
            if (str["result"]["face_list"][0]["gender"]["type"] == gender) {
              if (str["result"]["face_list"][0]["beauty"] > faceValue) {
                log("人脸颜值合格!");
                toast("人脸颜值合格!");
                baseOperator.autoClick(clicks);
                countAdd++;
              }
            }
          }
        }
        logger.info("视频【" + countVid + "】的人脸识别运行结束");
        toast("人脸识别完成！");
        time += 1000 * i;
        allTime = allTime - time;
        sleep(time > 5000 ? 5000 : time);
        logger.info(
          "第" + countVid + "个视频完成！已点赞关注" + countAdd + "个视频"
        );
        files.remove(imgFile);
        if (temAdd < countAdd) {
          logger.info("切换下一个视频！");
          if (requires != countAdd) {
            baseOperator.autoSwipe();
            logger.info("切换完成！");
            countVid++;
          }
          break;
        } else {
          logger.info("视频不符合您的审美！");
          toast("视频不符合您的审美！");
          if (allTime < 0) {
            logger.info("切换下一个视频！");
            baseOperator.autoSwipe();
            logger.info("滑动完成！");
            countVid++;
          }
        }
      }
    }
    return [countVid, countAdd];
  };
  return q;
})();

module.exports = faceDetection;
