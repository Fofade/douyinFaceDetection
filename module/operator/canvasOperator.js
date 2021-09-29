let Logger = require("../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/canvasOperator/",
});

var canvasOperator = (function () {
  let q = {};

  /**
   * 根据点画圆
   * @param {*} n name
   * @param {*} x x
   * @param {*} y y
   * @param {*} r 半径
   * @param {*} c 颜色
   * @param {*} b 粗细 -1 为充满
   */
  q.paintCircle = function (n, x, y, r, c, b) {
    let p = new Paint();
    if (b == -1) p.setStyle(Paint.STYLE.FILL);
    if (c != null) p.setColor(c);
    else p.setColor(colors.RED);
    logger.info("开始画圆[" + n + "]！");
    canvas.drawCircle(x, y, r, p);
    logger.info("画圆[" + n + "]完毕！");
  };

  /**
   * 循环画圆
   * @param {*} circles 画圆对象合集
   */
  q.autoPaintCircle = function (circles) {
    if (circles != null && circles.length > 0) {
      logger.info("开始循环画圆！");
      circles.forEach((c) => {
        if (c != null)
          this.paintCircle(c["n"], c["x"], c["y"], c["r"], c["c"], c["b"]);
      });
      logger.info("循环画圆完毕！");
    }
  };

  /**
   * 根据坐标画矩形
   * @param {*} n name
   * @param {*} lx 左上x
   * @param {*} ly 左上y
   * @param {*} rx 右下x
   * @param {*} ry 右下y
   * @param {*} c 颜色
   * @param {*} b 粗细 -1 为充满
   */
  q.paintRect = function (n, lx, ly, rx, ry, c, b) {
    let p = new Paint();
    if (b == -1) p.setStyle(Paint.STYLE.FILL);
    if (c != null) p.setColor(c);
    else p.setColor(colors.RED);
    logger.info("开始矩形[" + n + "]！");
    canvas.drawRect(lx, ly, rx, ry, p);
    logger.info("画矩形[" + n + "]完毕！");
  };

  q.autoPaintRect = function (rects) {
    if (rects != null && rects.length > 0) {
      logger.info("开始循环画矩形！");
      rects.forEach((r) => {
        if (r != null)
          this.paintRect(
            r["n"],
            r["lx"],
            r["ly"],
            r["rx"],
            r["ry"],
            r["c"],
            r["b"]
          );
      });
      logger.info("循环画矩形完毕！");
    }
  };
  return q;
})();

module.exports = canvasOperator;
