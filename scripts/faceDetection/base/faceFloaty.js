// 专用悬浮窗
let Logger = require("../../../module/logger/logger");
let baseFloaty = require("../../../ui/floaty/baseFloaty");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/faceFloaty/",
});

var faceFloaty = (function () {
  // let q = {};
  let d = [{
      name: "设置大小",
      value: {
        w: -1, // 占满全屏
        h: -1
      },
      id: "size",
      type: "size"
    },
    {
      name: "悬浮窗可触摸",
      value: false,
      id: "touch",
      type: "touch"
    },
    {
      name: "绘制路径",
      value: "值",
      id: "text",
      type: "text"
    },
  ];
  return baseFloaty.defaultFloaty("./faceFloaty.xml", d);
})();

module.exports = faceFloaty;