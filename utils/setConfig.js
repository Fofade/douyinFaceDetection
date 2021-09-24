let getPath = require(files.path("../utils/getPath.js"));
let dfdDB = require(getPath.getRelativePath("../db/dfdDB.js"));
let findImage = require(getPath.getRelativePath("../module/IMG/findImage.js"));

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
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABLZJREFUeF7tmk2IHEUUx9/rcQXxIBsYgiCLBBExImtWDSKSFT9B2KnqcSJxMRCDHwhZNzl4SA5G0VxEVxNEWBUUP1CHqarZ9WBM1BAUxQ9WPYiCt+QQCHpQ9LKz/ZeS3rAf09PVPT2zs71Tx+l/vXr/X7+qrqlupg3eeIP7pz6AfgVscAL9KbDBC6C/CPanQJopIIS4kohGPc/bAWArERWZuWhjAThPROeZ+ecgCE4VCoXva7Xarx0cZw7ASWb+Wil1Nuk4iSqgUqlcNT8/P8HM+xIOpAAcM8accumXdhw7xsDAwNFqtfq7yzhW4wxACHE4NL7JNXgT3RuNRuPJ2dnZf6NiZDDOnyHswy55OgGQUr5CRBMuAR00J4Ig2Fuv188s1VYqlU2NRuMoEY07xIiVADhujLk3ThgLQEp5jog2xwVKch3AXKFQ2Fur1eZsPyHEiOd5rwLYniROnBbAX8aYy1rpWgKQUtoEh+MGSnn9DIDHmLlARK8R0RUp48R1+1FrfUOUKBKA7/tTACbjord53a4FNodL2owT172qtd7ZTNQUgJTyLiL6NC7qerpuq80YM70y5ygA1ryFkKf2g9b6xlgAQohdzPx+npwvemHm3Uqpd5Z6W1UBUso3iejhnAKoKaXujwQwOjp60eDg4D9EdHEeARDRfLFYvHR6enr+QlUsNZrHxa/Jjbxba32iKQDf9x8E8F5O7/7/tph5XCl1YY1btgYIISaZeSrPAADsN8a8HFUBBwE8n2cAzHxIKXUkag14hIhWbRZyBuRRrfXrTQEIIQQz65wZXmYHgDTGmKgKuJqIfsszgCAIttbr9V+aArA/Sim/sMddOYXwndb65pY7Qd/39wGwBxN5bE9prV9oCWBsbGxzoVD4hojswWee2h/MPLzy4DTq3+ABInoxT+6JaEprbX0ta00BjIyMDAwNDdkq2JYjCMNa65+cAFhRzh6JO7XW1WY3s+WZoO/7kwDW9dYYwB5jzFtRlexyKnyIiJ5bj1MBwDPGmJbvB2IBhHuD/UT00nqC4GLe+nECEEJ4PDy+7nkOruYTAQgh7Cait3uZQBLziQGEECpE9FEvQkhqPhUA28n3/fsAfNxLENKYTw3AdiyXy/cEQfBJL0BIa74tAOF0WPM3SO2YbxtAuGO8g5lPrkUltGs+EwDhmnA7gM+7CSEL85kBCKfDDiJy+gQmA1BPa62fzSCO+0bIZbBSqXSb53mnXbRpNStPddPGWeznvBN0Hcj3/VsBfOmqT6hbdaKTsP8qeeYAwulwSzgdsnzHeEBrnfk/044AsBBKpdJ2z/OOE1HLb3Rc7iAzTyiljrlok2o6BiB8OtwEoE5ElydNbFEP4AljjP2GqCOtowBCCNsA2NOYLSkcLHuLk6J/bJeOA7AZCCGGmflDIrIvXpwaM+9RSkWe5DgFcRB1BYDNo1wuXx8EgYVwTVxeAB4yxrwbp8vietcAhE+H64jIQri2RfK7tNYfZGHOJUZXAYSVsGVhYeEIMz+wIsFvARw0xnzmknhWmq4DWExcSjnOzHcCaAD4KgiC2szMzN9ZGXONs2YAXBPstK4PoNOEez1+vwJ6/Q51Or9+BXSacK/H/w8MnL5QpZSLogAAAABJRU5ErkJggg==", // 点赞 图片的Base64码
    focusOnBase64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABKhJREFUeF7tm02M20QUx//P+5U4ly0HJG6lIBSDEBWlpwouLQWxWcGFNgkIuHTLCQ6ohZ4op36JA5xoewEESZq9ULUg2NJLI050qyIEjhC03JB6aPeSr92NH/LmQ7bXThzbs3br5JqZeX6/eR7Pe/MfQsx/FHP/IRzAytP5bVNr7T0A7SKiJwHsAPCcA/jrAG4x85/AxPLaFP8y+3vhnshJEgKgkc5uZ6LXAcwDeN6PAwRUGLhEzIvJaulfP2PZ9Q0UQE3JzhGkQwC/GvSDdsajixJwLqEWfghq/EAA1NIHM0TSUb+zPYJTFQl8KqGWvh+hj21TXwCaT+R3aBN8EoAe7mH8ylKbjiX+KtzyatwzgFo6u0BEnwFIeDUeUL8mMb+XrJbOexnPE4BGOvcFEw57MSiqDzHOJqvFd0cdfyQAvPOd2WarVWbgxVENbUV7Bq7IMzMH6OaXK27tuQZQU958hKBdBvhZt4OH045uMKRMSv3mPzf2XQHQZ77RWr0afed7LtON5Mz0XjeR4ApATcktUUTD3mmWCbiSVIv7h0XBUABRXPCGOdWPAxcL40AAjXT2EBOdc2swiu2Y+XCqWnL0wRFAd5PzRwS+8365NqU2PeW0WXIEUFdyFwAc8GvdqX/9WB6r+3Zt/D398zLkEwVRpvRxF2W1aOuLLYCmkp3TQJdFPdHqy7tRP5I1DS+fKWH6x19FmQSzNp+qXtjkky2AupK7JjKxab61H823XzI5m/jqJyS+XhIGAEBFVosvWA1sAtBU8q9oYN9Z1iBPQgIABmdSlgxyE4C6kv9OXD7fwRIWAL2eIKuF14yTYwLQreTcFhmH4QIAiPlRY2XJBKCu5I4AOP0gAwBwVFaLZ/qbJaOzDSV3jX3W8NzAC+8V2Hg602LYjwC9eju9znfdOOC3TcgAsDpJD/WqzX0AtfQbGSLtkl/n3PQPG4BxT2AAkP2YiI67ccBvm/AB8PFUtfSJ7kcfgOitrxFa2AAAlGW1eNAKQN+HOp3Y+J10U/8IALguq8XdVgDs1Ut9b689vM119/VnHsP6zsdN7Sdv/o3J3/5xPYZ0556v3EFWixvRb3wFPAEwZnWunz6ghn6yyMAArFz9NCB3vA0zu/cDTx3HAMavQEBrgB5/D8oiGPvPoNAaYOQ3QrV0zLfCXZFDTJIhaT5V/XajQDpOh43vpuhqcM9WmLmALrpKGqrD45KYqSTWkbfFtyiqw4h1WVwH0NH6iTsW022EtQZIoDmrxnB8NGaXS4reE4RxOCqBM3bCykHH42WRAsgtPh7v1wCtEz4WSAwqp3TVoGc9lVwi0omYFwapSMciKTcT1VByS1FVhzo9v64aTQUhk9MNxF4o2dkgxVgq2wszPRLqrVY5qqpRXR2aECWWNidNMZXLWzJHXUX6eQSElE1mfn+QGnTQQj/0Mzioc1dNekKkoHLIV2pRatNHoVyZMVV5O8LKD0VqCy0gKszaaTvho5vPurGNrwiwGutoDLEgTmZHFxnaeavWb1SnhQHoDdy7OEnAfACiqwrul4uTdjPRuTpLe4D2iFdneXltauL+vDrrJyS3um+ga8BWP3wQ9v4HE1SEX+szZ8QAAAAASUVORK5CYII=", // 关注 图片的Base64码
    updatePath: getPath.getRelativePath("./"), // //更新路径
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
          obc[param] = findImage.getImageLocation(obj["favoriteBase64"], 0.9);
        }
        if (obc[param] != "") dfdDB.setValueByParam(param, obc[param]);
      } else if (param == "focusOnLocation") {
        if (obc[param] == "") {
          obc[param] = findImage.getImageLocation(obj["focusOnBase64"], 0.9);
        }
        if (obc[param] != "") dfdDB.setValueByParam(param, obc[param]);
      } else dfdDB.setValueByParam(param, obj[param]);
    }
    return dfdDB.getValueByParam(param);
  };
  return q;
})();
module.exports = dfdObj;
