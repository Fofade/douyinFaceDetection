/**
 * 数据库操作
 */
// let getPath = require(files.path("file://../utils/getPath.js"));

var dfdDB = (function () {
  let db = sqlite.open(
    files.cwd()+"/data/dfd.db",
    {
      version: 1,
    },
    {
      onOpen: function (db) {
        db.execSQL(
          "CREATE TABLE IF NOT EXISTS DFD(" +
            "`id` INTEGER PRIMARY KEY AUTOINCREMENT," +
            "`param` TEXT NOT NULL," +
            "`value` TEXT" +
            ")"
        );
      },
    }
  );

  let q = {};

  /**
   * 获取参数的值
   * @param {*} param
   * @returns
   */
  q.getValueByParam = function (param) {
    // 如果存在该参数则获取否则返回null
    let cursor = db.rawQuery("SELECT * FROM DFD WHERE param = ?", [param]).all();
    if (cursor.length > 0) {
      //db.close();
      return cursor[0].value;
    } else {
      //cursor.close();
      //db.close();
      return null;
    }
  };

  /**
   * 设置参数
   * @param {*} param
   * @param {*} value
   */
  q.setValueByParam = function (par, ve) {
    // 如果存在该参数则设置否则创建
    let cursor = db.rawQuery("SELECT * FROM DFD WHERE param = ?", [par]);
    if (cursor.length > 0) {
      db.update(
        "DFD",
        {
          value: ve,
        },
        "param = ?",
        [par]
      );
      log("更新数据结果:{" + par + ":" + db.rawQuery("SELECT * FROM DFD WHERE param = ?", [par]) + "}");
      //cursor.close();
      //db.close();
    } else {
      db.insert("DFD", {
        param: par,
        value: ve,
      });
      log("新增数据:{" + par + ":" + ve + "}");
      //cursor.close();
      //db.close();
    }
  };

  /**
   * 获取所有参数
   * @returns
   */
  q.getAll = function () {
    // 获取所有配置
    let cursor = db.rawQuery("SELECT * FROM DFD", null).all();
    let result = [];
    while (cursor.moveToNext()) {
      result.push(cursor.pick());
    }
    //cursor.close();
    //db.close();
    return result;
  };

  q.close = function () {
    db.close();
  };
  return q;
})();

module.exports = dfdDB;
