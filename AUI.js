"ui";
/**
 * 全局变量
 */
let dfdObj = require("./utils/setConfig.js");
let dfdDB = require("./db/dfdDB.js");
let loggerDB = require("./db/loggerDB.js");
let eggController = require("./ui/eggController");

var jsPath = "./scripts/faceDetection/AISearch.js"; //脚本地址
// console.show();
ui.layout(
  <vertical padding="16">
    <text textSize="30sp" textColor="#cd4acf">
      欢迎使用抖音智能辅助
    </text>
    {/* 权限 */}
    <Switch
      textSize="25sp"
      id="autoService"
      text="无障碍服务:"
      checked="{{auto.service != null}}"
      w="auto"
      textStyle="bold"
      textColor="red"
    />
    <Switch
      textSize="25sp"
      id="autoFloat"
      text="悬浮窗权限:"
      w="auto"
      textStyle="bold"
      textColor="red"
    />
    {/* logo */}
    <img radius="20" src="file://logo.jpg" w="auto" h="auto" circle="true" />
    <text>您想要小哥哥还是小姐姐?(默认为上一次选择)</text>
    {/* 单选框 */}
    <radiogroup mariginTop="16">
      <radio id="rbtMale" text="小哥哥" />
      <radio id="rbtFeMale" text="小姐姐" />
    </radiogroup>
    {/* 输入框 */}
    <text>您期望的小哥哥(小姐姐)颜值(百度的人脸检测太苛刻，建议50):</text>
    <input id="txtFaceValue" inputType="number" textSize="16sp" hint="0-100" />
    <text>您期待点赞关注的小哥哥(小姐姐)数量(建议10):</text>
    <input
      id="txtStarNum"
      inputType="number"
      textSize="16sp"
      hint="大于零小于999"
    />
    <text>您期望的单个视频识别最大时长(单位/s):</text>
    <input id="txtVideoScan" inputType="number" textSize="16sp" hint="大于零" />
    {/* 功能区 */}
    <button
      id="btnStart"
      text="开始"
      w="auto"
      style="Widget.AppCompat.Button.Colored"
    />
    {/* <button
      id="btnUpdate"
      text="更新"
      w="auto"
      style="Widget.AppCompat.Button.Colored"
    /> */}
    <button
      id="btnExit"
      text="退出"
      w="auto"
      style="Widget.AppCompat.Button.Colored"
    />
    <text textSize="30sp" textColor="blue">
      开始之前请确保
    </text>
    <text textSize="20sp" textColor="red">
      1.本应用的悬浮窗权限已打开
    </text>
    <text textSize="20sp" textColor="red">
      2.本应用的无障碍权限已打开
    </text>
    <text textSize="20sp" textColor="red">
      3.本应用的网络权限已打开且无网络障碍
    </text>
    <text textSize="20sp" textColor="red">
      4.操作系统的版本为：安卓7.0+
    </text>
    <text textSize="30sp" textColor="red">
      其它情况可自行测试
    </text>
    <text textSize="30sp" textColor="blue">
      温馨提示：
    </text>
    <text textSize="20sp" textColor="red">
      不要边充电边运行本脚本，这样对手机电池不好！
    </text>
    <text textSize="20sp" textColor="red">
      脚本仅供学习和娱乐！颜值识别成功率由百度提供的人脸识别技术支持，不要盲从。
    </text>
    <text textSize="20sp" textColor="red">
      由此软件导致的任何问题都与此软件作者无关，若不同意，请勿使用！谢谢合作！🙏
    </text>
    <card h="auto" margin="10" id="cdEgg" text="彩蛋区" w="*">
      <text textSize="40sp" textColor="red">
        欢迎来到德莱联盟！
      </text>
    </card>
  </vertical>
);

toast(
  "我是作者龙龙王,对于此软件我有最终解释权,使用软件即默认同意我的霸王条款!"
);

// 默认值-从数据库中读取
(function () {
  // 选项
  if (dfdObj.getDfdObjParam("gender") == "female") {
    ui.rbtFeMale.checked = true;
  } else if (dfdObj.getDfdObjParam("gender") == "male") {
    ui.rbtMale.checked = true;
  }
  // 值
  if (dfdObj.getDfdObjParam("faceValue") != null) {
    ui.txtFaceValue.attr("text", dfdObj.getDfdObjParam("faceValue"));
  }
  if (dfdObj.getDfdObjParam("starNum") != null) {
    ui.txtStarNum.attr("text", dfdObj.getDfdObjParam("starNum"));
  }
  if (dfdObj.getDfdObjParam("videoAllTime") != null) {
    ui.txtVideoScan.attr("text", dfdObj.getDfdObjParam("videoAllTime"));
  }
  // 区域显示
  if(dfdObj.getDfdObjParam("eggB")!=null && dfdObj.getDfdObjParam("eggB")>100){
    // 显示hell区域
  }
})();

// 单选
ui.rbtMale.on("check", (checked) => {
  if (checked) {
    dfdObj.setDfdObjParam("gender", "male");
  }
});
ui.rbtFeMale.on("check", (checked) => {
  if (checked) {
    dfdObj.setDfdObjParam("gender", "female");
  }
});
ui.autoService.on("check", (checked) => {
  if (checked && auto.service == null) {
    app.startActivity({
      action: "android.setting.ACCESSIBILITY_SETTINGS",
    });
    if (!checked && auto.service != null) {
      auto.service.disableSelf();
    }
  }
});
ui.emitter.on("resume", () => {
  ui.autoService.checked = auto.service != null;
});
ui.autoFloat.on("check", (checked) => {
  if (checked) console.show();
});

// 开始-验证数据
ui.btnStart.click(() => {
  // 获取输入的值
  var faceValue = ui.txtFaceValue.text();
  if (faceValue.length == 0) {
    ui.txtFaceValue.setError("输入不能为空");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  }
  var face = parseInt(faceValue);
  if (face <= 0) {
    ui.txtFaceValue.setError("颜值太低了!");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  } else if (face > 100) {
    ui.txtFaceValue.setError("真的有人颜值突破一百分吗?");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  } else {
    dfdObj.setDfdObjParam("faceValue", face);
  }
  ui.txtFaceValue.setError(null);

  //输入数量
  var starNum = ui.txtStarNum.text();
  if (starNum.length == 0) {
    ui.txtStarNum.setError("输入不能为空");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  }
  var num = parseInt(starNum);
  if (num <= 0) {
    ui.txtStarNum.setError("数量太少了!");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  } else if (num > 999) {
    ui.txtStarNum.setError("您忘了三星Note吗?");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  } else {
    dfdObj.setDfdObjParam("faceValue", num);
  }
  ui.txtStarNum.setError(null);

  // 单个视频时长
  var videoScan = ui.txtVideoScan.text();
  var vs = parseInt(videoScan);
  if (vs <= 0) {
    ui.txtVideoScan.setError("您搁着卡bug呢？要不要给您视频倒放啊！");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  } else if (vs > 9999999) {
    ui.txtStarNum.setError("您这是想看这个视频到地老天荒吗？");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  } else {
    dfdObj.setDfdObjParam("videoAllTime", vs);
  }
  ui.txtVideoScan.setError(null);

  if (auto.service == null) {
    toast("请打开无障碍服务！");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  }
  if (!ui.autoFloat.checked) {
    toast("请打开悬浮窗！");
    if (dfdObj.getDfdObjParam("eggB") != null) {
      dfdObj.getDfdObjParam(
        "eggB",
        parseInt(dfdObj.getDfdObjParam("eggB")) + 1
      );
    }
    return;
  }
  log("开始运行！");
  console.hide();
  if (files.exists(jsPath)) {
    engines.execScriptFile(jsPath);
  }
  if (dfdObj.getDfdObjParam("eggA") != null) {
    dfdObj.getDfdObjParam("eggA", parseInt(dfdObj.getDfdObjParam("eggA")) + 1);
  }
});

// 退出
ui.btnExit.click(() => {
  dfdDB.close();
  loggerDB.close();
  exit();
});

// 更新
// let update = require("./module/update/update.js");

// ui.btnUpdate.click(() => {
//   let checkPermission = floaty.checkPermission();
//   if (!checkPermission) {
//     floaty.requestPermission();
//     return;
//   }
//   threads.start(function () {
//     let url = "https://gitee.com/fofade/douyinFaceDetection/raw/master/";
//     // update(url + "京东/", rootPath + "京东/", "version.json");
//     update(url + "lastest/", dfdObj.updatePath + "lastest/", "update.json");
//   });
// });

// 彩蛋模块
// 正向彩蛋 => 通往天堂

// 逆向彩蛋 => 通往地狱
ui.cdEgg.click(() => {
  eggController.pageInfo.save("main");
  eggController.openPage("hell");
});
