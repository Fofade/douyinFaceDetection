/**
 * 数据库操作
 */
// let getPath = require(files.path("file://../utils/getPath.js"));

var loggerDB = (function () {
  let db = sqlite.open(
    "./dfd.db",
    {
      version: 1,
    },
    {
      onOpen: function (db) {
        db.execSQL(
          "CREATE TABLE IF NOT EXISTS LOGGER(" +
            "`id` INTEGER PRIMARY KEY AUTOINCREMENT," +
            "`time` TEXT," +
            "`level` TEXT" +
            "`data` TEXT" +
            ")"
        );
      },
    }
  );

  let q = {};

  /**
   * 根据参数及其值获取对应logger
   * @param {*} param
   * @param {*} value
   * @returns
   */
  q.getLoggerByParam = function (param, value) {
    // 如果存在该参数则获取否则返回null
    let cursor = db.rawQuery("SELECT * FROM LOGGER WHERE " + param + " = ?", [
      value,
    ]);
    if (cursor.length > 0) {
      // db.close();
      return cursor;
    } else {
      // cursor.close();
      // db.close();
      return null;
    }
  };

  /**
   * 增加一条日志
   * @param {*} time
   * @param {*} level
   * @param {*} data
   * @returns
   */
  q.addOne = function (time, level, data) {
    let cursor = db.rawQuery(
      "SELECT * FROM LOGGER WHERE time = ? and level = ?",
      [time, level]
    );
    if (cursor.length > 0) {
      log("已存在该日志!");
    } else {
      db.insert("LOGGER", {
        time: time,
        level: level,
        data: data,
      });
      // cursor.close();
      // db.close();
      return true;
    }
    // cursor.close();
    // db.close();
    return false;
  };

  /**
   * 获取所有日志
   * @returns
   */
  q.getAll = function () {
    let cursor = db.rawQuery("SELECT * FROM LOGGER ", null);
    let result = [];
    while (cursor.moveToNext()) {
      result.push(cursor.pick());
    }
    // cursor.close();
    // db.close();
    return result;
  };

  q.close = function () {
    db.close();
  };

  return q;
})();

module.exports = loggerDB;
