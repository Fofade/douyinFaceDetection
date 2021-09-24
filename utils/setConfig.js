let dfdDB = require("../db/dfdDB.js");
let findImage = require("../module/IMG/findImage.js");

var dfdObj = (function () {
  // 全局配置
  let obj = {
    faceValue: 80, // 颜值
    starNum: 2, // 数量
    gender: "female", // 性别
    appPackage: "com.ss.android.ugc.aweme", // 抖音包名
    ak: "KXIS86UejDFk9RzMxYp0DFMF", // 百度云图像识别ak
    sk: "C93QyBiG346cTezoECXQsGcUsszaln4G", // 百度云图像识别sk
    favoriteBase64:
      "data:image/jpg;base64,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", // 点赞 图片的Base64码
    focusOnBase64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABKhJREFUeF7tm02M20QUx//P+5U4ly0HJG6lIBSDEBWlpwouLQWxWcGFNgkIuHTLCQ6ohZ4op36JA5xoewEESZq9ULUg2NJLI050qyIEjhC03JB6aPeSr92NH/LmQ7bXThzbs3br5JqZeX6/eR7Pe/MfQsx/FHP/IRzAytP5bVNr7T0A7SKiJwHsAPCcA/jrAG4x85/AxPLaFP8y+3vhnshJEgKgkc5uZ6LXAcwDeN6PAwRUGLhEzIvJaulfP2PZ9Q0UQE3JzhGkQwC/GvSDdsajixJwLqEWfghq/EAA1NIHM0TSUb+zPYJTFQl8KqGWvh+hj21TXwCaT+R3aBN8EoAe7mH8ylKbjiX+KtzyatwzgFo6u0BEnwFIeDUeUL8mMb+XrJbOexnPE4BGOvcFEw57MSiqDzHOJqvFd0cdfyQAvPOd2WarVWbgxVENbUV7Bq7IMzMH6OaXK27tuQZQU958hKBdBvhZt4OH045uMKRMSv3mPzf2XQHQZ77RWr0afed7LtON5Mz0XjeR4ApATcktUUTD3mmWCbiSVIv7h0XBUABRXPCGOdWPAxcL40AAjXT2EBOdc2swiu2Y+XCqWnL0wRFAd5PzRwS+8365NqU2PeW0WXIEUFdyFwAc8GvdqX/9WB6r+3Zt/D398zLkEwVRpvRxF2W1aOuLLYCmkp3TQJdFPdHqy7tRP5I1DS+fKWH6x19FmQSzNp+qXtjkky2AupK7JjKxab61H823XzI5m/jqJyS+XhIGAEBFVosvWA1sAtBU8q9oYN9Z1iBPQgIABmdSlgxyE4C6kv9OXD7fwRIWAL2eIKuF14yTYwLQreTcFhmH4QIAiPlRY2XJBKCu5I4AOP0gAwBwVFaLZ/qbJaOzDSV3jX3W8NzAC+8V2Hg602LYjwC9eju9znfdOOC3TcgAsDpJD/WqzX0AtfQbGSLtkl/n3PQPG4BxT2AAkP2YiI67ccBvm/AB8PFUtfSJ7kcfgOitrxFa2AAAlGW1eNAKQN+HOp3Y+J10U/8IALguq8XdVgDs1Ut9b689vM119/VnHsP6zsdN7Sdv/o3J3/5xPYZ0556v3EFWixvRb3wFPAEwZnWunz6ghn6yyMAArFz9NCB3vA0zu/cDTx3HAMavQEBrgB5/D8oiGPvPoNAaYOQ3QrV0zLfCXZFDTJIhaT5V/XajQDpOh43vpuhqcM9WmLmALrpKGqrD45KYqSTWkbfFtyiqw4h1WVwH0NH6iTsW022EtQZIoDmrxnB8NGaXS4reE4RxOCqBM3bCykHH42WRAsgtPh7v1wCtEz4WSAwqp3TVoGc9lVwi0omYFwapSMciKTcT1VByS1FVhzo9v64aTQUhk9MNxF4o2dkgxVgq2wszPRLqrVY5qqpRXR2aECWWNidNMZXLWzJHXUX6eQSElE1mfn+QGnTQQj/0Mzioc1dNekKkoHLIV2pRatNHoVyZMVV5O8LKD0VqCy0gKszaaTvho5vPurGNrwiwGutoDLEgTmZHFxnaeavWb1SnhQHoDdy7OEnAfACiqwrul4uTdjPRuTpLe4D2iFdneXltauL+vDrrJyS3um+ga8BWP3wQ9v4HE1SEX+szZ8QAAAAASUVORK5CYII=", // 关注 图片的Base64码
    updatePath: "./", // //更新路径
  };

  // 全局变量
  let obc = {
    favorLocation: "", // 点赞控件的中心
    focusOnLocation: "", // 关注控件的中心
  };

  let q = {};

  /**
   * 设置全局配置
   * @param {*} param
   * @param {*} value
   */
  q.setDfdObjParam = function (param, value) {
    dfdDB.setValueByParam(param, value);
  };

  /**
   * 获取全局配置
   * @param {*} param
   * @returns
   */
  q.getDfdObjParam = function (param) {
    if (dfdDB.getValueByParam(param) == null) {
      if (param == "favorLocation") {
        if (obc[param] == "") {
          obc[param] = findImage.getImageLocation(obj["favoriteBase64"], 0.9, [
            device.width / 2,
            device.height / 4,
          ]); // 找图区域，目前设置为设备右半边的下3/4
        }
        if (obc[param] != "") dfdDB.setValueByParam(param, obc[param]);
      } else if (param == "focusOnLocation") {
        if (obc[param] == "") {
          obc[param] = findImage.getImageLocation(obj["focusOnBase64"], 0.9, [
            device.width / 2,
            device.height / 4,
          ]); // 找图区域，目前设置为设备右半边的下3/4
        }
        if (obc[param] != "") dfdDB.setValueByParam(param, obc[param]);
      } else {
        log("插入值【" + param + "】:[" + obj[param] + "]");
        dfdDB.setValueByParam(param, obj[param]);
        log("检查插入值【" + dfdDB.getValueByParam(param) + "】");
      }
    }
    return dfdDB.getValueByParam(param);
  };
  return q;
})();
module.exports = dfdObj;
