console.log("【模块】netOperator:", files.cwd());
let Logger = require("../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/netOperator/",
});

var netOperator = (function () {
  let q = {};

  /**
   * 百度人脸识别
   * @param {*} ak 百度ak
   * @param {*} sk 百度sk
   * @param {*} image 识别图片
   * @returns 识别结果
   */
  q.baiduFaceDetection = function (ak, sk, image) {
    logger.info("开始百度云人脸识别！");
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
    var image64 = images.toBase64(image);
    if (image64) {
      var res = http.post(url, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        image: image64,
        image_type: "BASE64",
        face_field: "gender,age,beauty",
      });
      logger.info("百度云人脸识别完成！");
      return JSON.parse(res.body.string());
    } else {
      logger.warn("截图异常！");
      return null;
    }
  };

  /**
   * 百度云人脸识别结果解析
   * @param {*} res 识别结果
   * @param {*} gender 判断性别
   * @param {*} faceValue 判断颜值
   * @returns
   */
  q.baiduFaceDetectionResultParse = function (res, gender, faceValue) {
    if (res != null)
      if (res["error_msg"] == "pic not has face") {
        logger.info("没有检测到人脸！");
      } else if (res["error_msg"] == "SUCCESS") {
        logger.info("检测到了" + res["result"]["face_num"] + "张人脸");
        logger.info(
          "人脸性别为：" + res["result"]["face_list"][0]["gender"]["type"]
        );
        logger.info("人脸年龄为：" + res["result"]["face_list"][0]["age"]);
        logger.info("人脸颜值为：" + res["result"]["face_list"][0]["beauty"]);

        if (res["result"]["face_list"][0]["gender"]["type"] == gender) {
          if (res["result"]["face_list"][0]["beauty"] > faceValue) {
            logger.info("人脸颜值合格!");
            return true;
          }
        }
      }
    return false;
  };
  return q;
})();

module.exports = netOperator;
