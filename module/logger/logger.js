let getPath = require(files.path("file://../utils/getPath.js"));
let config = require("./config.js");
let loggerDB = require(getPath.getRelativePath("file://../db/loggerDB.js"));

let levelList = ["info", "warn", "err", "debug"];

function Logger(userConfig) {
  userConfig = userConfig || {};
  log("userConfig =");
  log(userConfig);
  this.config = Object.assign(config, userConfig);
  this.createTime = new java.text.SimpleDateFormat(
    config.filenamePattern
  ).format(new Date());
  var len = levelList.length;
  for (var i = 0; i < len; i++) {
    let level = levelList[i];
    this[level + "Filepath"] =
      files.join(
        files.getSdcardPath(),
        this.config.dir,
        this.createTime,
        level
      ) + ".txt";
    files.createWithDirs(this[level + "Filepath"]);
  }

  this.getBackupDirList = function () {
    let dir = files.join(files.getSdcardPath(), this.config.dir);
    var dirList = files.listDir(dir, function (name) {
      let filepath = files.join(dir, name);
      return files.isDir(filepath);
    });
    var len = dirList.length;
    let arr = [];
    for (var i = 0; i < len; i++) {
      let filepath = files.join(
        files.getSdcardPath(),
        this.config.dir,
        dirList[i]
      );
      arr.push(filepath);
    }
    return arr;
  };

  this.getBackupSize = function () {
    let result = this.getBackupDirList().length;
    return result;
  };

  this.deleteOldestDir = function () {
    var len = this.getBackupSize();
    if (len > this.config.maxBackupSize) {
      let dirList = this.getBackupDirList();
      dirList.sort(function (filepath1, filepath2) {
        var time1 = new java.io.File(files.path(filepath1)).lastModified();
        var time2 = new java.io.File(files.path(filepath2)).lastModified();
        return time1 - time2;
      });
      let oldFilepath = dirList[0];
      files.removeDir(oldFilepath);
      log("删除旧的日志文件夹: " + oldFilepath);
    }
  };
  while (1) {
    if (this.getBackupSize() > this.config.maxBackupSize) {
      this.deleteOldestDir();
    } else {
      break;
    }
  }
  this.getLevelFilepath = function (level) {
    let filepath = this[level + "Filepath"];
    let fileSize = getFileSize(filepath);
    if (fileSize > config.maxFileSize) {
      this.createTime = new java.text.SimpleDateFormat(
        config.filenamePattern
      ).format(new Date());
      let len = levelList.length;
      for (let i = 0; i < len; i++) {
        let level = levelList[i];
        let filepath =
          files.join(
            files.getSdcardPath(),
            this.config.dir,
            this.createTime,
            level
          ) + ".txt";
        files.createWithDirs(filepath);
        this[level + "Filepath"] = filepath;
      }
      this.deleteOldestDir();
    }
    return this[level + "Filepath"];
  };

  this.levelListDataAppend = function (levelList) {
    var len = levelList.length;
    for (let i = 0; i < len; i++) {
      let level = levelList[i];
      let filepath = this[level + "Filepath"];
      levelDataAppend(level, filepath, data);
    }
  };
  // 日志详细程度排序  debug > info > warn > err

  this.levelDataAppend = function (levelList, data) {
    var len = levelList.length;
    for (var i = 0; i < len; i++) {
      let level = levelList[i];
      let filepath = this.getLevelFilepath(level);
      files.append(filepath, data);
    }
  };

  this.info = function () {
    let time = new java.text.SimpleDateFormat("HH:mm:ss.SSS").format(
      new Date()
    );
    let level = "info";
    let data = formatData(time, level, arguments);
    log(data);
    loggerDB.addOne(time, level, data);
    let levelList = ["info", "debug"];
    this.levelDataAppend(levelList, data);
  };
  this.warn = function () {
    let time = new java.text.SimpleDateFormat("HH:mm:ss.SSS").format(
      new Date()
    );
    let level = "warn";
    let data = formatData(time, level, arguments);
    log(data);
    loggerDB.addOne(time, level, data);
    let levelList = ["warn", "info", "debug"];
    this.levelDataAppend(levelList, data);
  };
  this.err = function () {
    let time = new java.text.SimpleDateFormat("HH:mm:ss.SSS").format(
      new Date()
    );
    let level = "err";
    let data = formatData(time, level, arguments);
    log(data);
    loggerDB.addOne(time, level, data);
    let levelList = ["err", "warn", "info", "debug"];
    this.levelDataAppend(levelList, data);
  };
  this.debug = function () {
    let time = new java.text.SimpleDateFormat("HH:mm:ss.SSS").format(
      new Date()
    );
    let level = "debug";
    let data = formatData(time, level, arguments);
    log(data);
    loggerDB.addOne(time, level, data);
    let levelList = ["debug"];
    this.levelDataAppend(levelList, data);
  };
}
function formatData(time, level, data) {
  // filePattern: "[HH:mm:ss.SSS] [level] - data",
  data = data2Str(data);
  let result = "[" + time + "] [" + level + "] - " + data + "\n";
  return result;
}

function data2Str(data) {
  let arr = [];
  for (var i = 0; i < data.length; i++) {
    let item = data[i];
    if (item) {
      // 类型判断
      let objType = Object.prototype.toString.call(item);
      switch (objType) {
        case "[object String]":
          arr.push(item);
          break;
        case "[object Number]":
          arr.push(item);

          break;
        case "[object Boolean]":
          arr.push(item);

          break;
        case "[object Symbol]":
          arr.push(item);

          break;
        case "[object Undefined]":
          arr.push("Undefined");

          break;
        case "[object Null]":
          arr.push("Null");

          break;
        case "[object Function]":
          arr.push(item.toString());

          break;
        case "[object Date]":
          arr.push(item);

          break;
        case "[object Array]":
          arr.push(JSON.stringify(item));
          break;
        case "[object RegExp]":
          arr.push(item);
          break;
        case "[object Error]":
          arr.push(JSON.stringify(item));
          break;
        case "[object Object]":
          arr.push(objectToString(item));
          break;
        default:
          arr.push("unknown type");
          break;
      }
    } else {
      arr.push("");
    }
  }
  let result = arr.join(", ");
  return result;
}

function getFileSize(filepath) {
  let f = new java.io.File(filepath);
  let r = f.length();
  return r;
}

// 返回一个将对象中的函数都转化为字符串的对象　不直接在原对象上面改
function stringifyFunction(obj) {
  let newObj = JSON.parse(JSON.stringify(obj));
  for (let key in obj) {
    if (obj[key] instanceof Function) {
      newObj[key] = obj[key].toString().replace(/[\n\t]/g, "");
      newObj[key] = decodeUnicode(newObj[key]);
      continue;
    }
    if (obj[key] instanceof Object) {
      newObj[key] = stringifyFunction(obj[key]);
    }
  }
  return newObj;
}

function objectToString(obj) {
  // 用于替代JSON.stringify函数
  let _object = stringifyFunction(obj); // 将对象中的函数转为字符串
  return JSON.stringify(_object); // 将对象转为字符串
}

function decodeUnicode(str) {
  str = str.replace(/\\/g, "%");
  return unescape(str);
}

module.exports = Logger;
