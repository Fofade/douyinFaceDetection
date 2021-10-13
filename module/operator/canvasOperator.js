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
   * @param {*} canvas 图片
   * @param {*} n name
   * @param {*} x x
   * @param {*} y y
   * @param {*} r 半径
   * @param {*} c 颜色
   * @param {*} b 粗细 -1 为充满
   * @returns canvas
   */
  q.paintCircle = function (canvas, n, x, y, r, c, b) {
    let p = new Paint();
    if (b == -1) p.setStyle(Paint.STYLE.FILL);
    if (c != null) p.setColor(c);
    else p.setColor(colors.RED);
    logger.info("开始画圆[" + n + "]！");
    canvas.drawCircle(x, y, r, p);
    logger.info("画圆[" + n + "]完毕！");
    return canvas;
  };

  /**
   * 循环画圆
   * @param {*} img 图片
   * @param {*} circles 画圆对象合集
   * @returns 图片
   */
  q.autoPaintCircle = function (img, circles) {
    var canvas = new Canvas(img);
    if (circles != null && circles.length > 0) {
      logger.info("开始循环画圆！");
      circles.forEach((c) => {
        if (c != null)
          canvas = this.paintCircle(
            canvas,
            c["n"],
            c["x"],
            c["y"],
            c["r"],
            c["c"],
            c["b"]
          );
      });
      logger.info("循环画圆完毕！");
      return canvas.toImage();
    }
  };

  /**
   * 根据坐标画矩形
   * @param {*} canvas
   * @param {*} n name
   * @param {*} lx 左上x
   * @param {*} ly 左上y
   * @param {*} rx 右下x
   * @param {*} ry 右下y
   * @param {*} c 颜色
   * @param {*} b 粗细 -1 为充满
   * @returns canvas
   */
  q.paintRect = function (canvas, n, lx, ly, rx, ry, c, b) {
    let p = new Paint();
    if (b == -1) p.setStyle(Paint.STYLE.FILL);
    if (c != null) p.setColor(c);
    else p.setColor(colors.RED);
    logger.info("开始矩形[" + n + "]！");
    canvas.drawRect(lx, ly, rx, ry, p);
    logger.info("画矩形[" + n + "]完毕！");
    return canvas;
  };

  /**
   * 循环画矩形
   * @param {*} img 图片
   * @param {*} rects 矩形合集
   * @returns 图片
   */
  q.autoPaintRect = function (img, rects) {
    var canvas = new Canvas(img);
    if (rects != null && rects.length > 0) {
      logger.info("开始循环画矩形！");
      rects.forEach((r) => {
        if (r != null)
          canvas = this.paintRect(
            canvas,
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
      return canvas.toImage();
    }
  };

  /**
   * 画路径
   * @param {*} canvas 图片
   * @param {*} n name
   * @param {*} path 路径
   * @param {*} c 颜色
   * @param {*} b 粗细 -1 为充满
   * @returns canvas
   */
  q.paintPath = function (canvas, n, p, c, b) {
    let pi = new Paint();
    if (b == -1) pi.setStyle(Paint.STYLE.FILL);
    if (c != null) pi.setColor(c);
    else pi.setColor(colors.RED);
    logger.info("开始路径[" + n + "]！");
    canvas.drawPath(p, pi);
    logger.info("画路径[" + n + "]完毕！");
    return canvas;
  };

  /**
   * 循环画路径
   * @param {*} img 图片
   * @param {*} paths
   * @returns 图片
   */
  q.autoPaintPath = function (img, paths) {
    var canvas = new Canvas(img);
    if (paths != null && paths.length > 0)
      paths.forEach((p) => {
        if (p != null)
          canvas = this.paintPath(canvas, p["n"], p["p"], p["c"], p["b"]);
      });
    logger.info("循环画路径完毕！");
    return canvas.toImage();
  };
  return q;
})();

module.exports = canvasOperator;
