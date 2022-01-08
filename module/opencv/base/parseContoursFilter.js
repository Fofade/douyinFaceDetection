let Logger = require("../../logger/logger");

let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/scripts/contoursFilter/",
});

var parseContoursFilter = (function () {
  let q = {};

  /**
   * 过滤轮廓数据-base
   * @param {*} parseContours 处理以后的轮廓数据
   * @param {*} area 最小面积
   * @returns 过滤处理后的轮廓数据
   */
  q.baseFilter = function (parseContours, area) {
    let c = [];
    if (parseContours != null && parseContours.length > 0)
      parseContours.forEach((p) => {
        if (p["areaArr"] >= area) c.push(p);
      });
    logger.info("轮廓数据过滤完成！");
    return c;
  };

  return q;
})();

module.exports = parseContoursFilter;
