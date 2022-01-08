console.log("【模块】baseOperator:", files.cwd());
let algorithmIncrease = require("../operator/algorithmIncrease");
let Logger = require("../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/baseOperator/",
});

var baseOperator = (function () {
  let q = {};

  /**
   * 由下至上滑动
   */
  q.autoSwipe = function () {
    swipe(
      device.width / 2,
      device.height - device.height / 8,
      device.width / 2,
      device.height / 8,
      1500
    );
    logger.info("滑动完成！");
  };

  /**
   * 仿真滑动-增加随机延迟
   */
  q.autoSimulationSwipe = function () {
    this.curvatureSwipe(
      device.width / 2,
      device.height * 0.8,
      device.width / 2,
      device.height * 0.1,
      300
    );
    sleep(random(100, 1000)); // 0.1-1s 随机延迟
  };

  /**
   * 曲率滑动-(塞贝尔曲线)
   * @param {*} qx qx
   * @param {*} qy qy
   * @param {*} zx zx
   * @param {*} zy zy
   * @param {*} time time
   */
  q.curvatureSwipe = function (qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
      x: qx,
      y: qy,
    };
    var dx1 = {
      x: radom(qx - 100, qx + 100),
      y: radom(qy, qy + 50),
    };
    var dx2 = {
      x: radom(zx - 100, zx + 100),
      y: radom(zy, zy + 50),
    };
    var dx3 = {
      x: zx,
      y: zy,
    };
    point.push(dx0);
    point.push(dx1);
    point.push(dx2);
    point.push(dx3);
    for (let i = 0; i < 1; i += 0.08) {
      let newPoint = algorithmIncrease.bezier_curves(point, i);
      var tmpXy = [parseInt(newPoint.x), parseInt(newPoint.y)];
      xxy.push(tmpXy);
    }
    gesture.apply(null, xxy);
  };

  /**
   * 循环点击
   * @param {*} clicks 点击集合{name, x, y}
   */
  q.autoClick = function (clicks) {
    clicks.forEach((c) => {
      if (c["x"] != null) {
        click(c["x"], c["y"]);
        logger.info(c["name"] + "完成！");
      } else logger.warn(c["name"] + "控件获取失败！就不点了！你自个儿点吧！");
    });
  };

  /**
   * 批量仿真点击
   * @param {*} clicks 点击集合{name, x1, y1, x2, y2}
   */
  q.autoSimulationClick = function (clicks) {
    clicks.forEach((c) => {
      if (c["x1"] != null) {
        this.SimulationClick(c["x1"], c["y1"], c["x2"], c["y2"]);
        sleep(random(10, 1000)); // 0.01-1s 随机延迟
        logger.info(c["name"] + "完成[随机延迟]！");
      } else logger.warn(c["name"] + "点击失败！就不点了！你自个儿点吧！");
    });
  };

  /**
   * 范围内仿真点击
   * @param {*} x1 左上角x
   * @param {*} y1 左上角y
   * @param {*} x2 右下角x
   * @param {*} y2 右下角y
   */
  q.SimulationClick = function (x1, y1, x2, y2) {
    var xx = radom(x1, x2);
    var yy = radom(y1, y2);
    click(x, y);
  };

  /**
   * 按压(click 补充操作)
   * @param {*} press 按压集合{name, x, y, t} t 代表时长,单位毫秒
   */
  q.autoPress = function (press) {
    press.forEach((p) => {
      if (p["x"] != null) {
        press(p["x"], p["y"], p["t"]);
        logger.info(p["name"] + "完成！");
      } else logger.warn(p["name"] + "控件获取失败！就不点了！你自个儿点吧！");
    });
  };

  /**
   * 批量保存图片
   * @param {*} imgs 传入图片对象{name, img, type}
   */
  q.saveImage = function (imgs) {
    imgs.forEach((i) => {
      if (i != null) {
        files.ensureDir(files.cwd() + "/data/image/img_s_" + i["name"] + "." + i["type"]);
        images.save(
          i["img"],
          files.cwd() + "/data/image/img_s_" + i["name"] + "." + i["type"],
          i["type"],
          100
        );
      }
    });
  };
  return q;
})();

module.exports = baseOperator;