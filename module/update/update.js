function update(onlineUrl, path, versionFileName) {
  let getPath = require(files.path("file://../../utils/getPath.js"));
  let getLatest = require(getPath.getRelativePath("./lastVersion.js"));
  let getCurrent = require(getPath.getRelativePath("./nowVersion.js"));
  let download = require(getPath.getRelativePath("./downFile.js"));

  let latestVersion = getLatest(onlineUrl + versionFileName);

  let scripts = latestVersion["version"];
  let currentVersion = getCurrent(path + versionFileName, scripts);

  let newFiles = [];
  for (let i = 0; i < scripts.length; i++) {
    let script = scripts[i];

    let current = parseInt(currentVersion[script]);
    if (isNaN(current)) {
      current = 0;
    }
    let latest = parseInt(latestVersion[script]);

    if (current < latest) {
      newFiles.push([script, current, latest]);
    }
  }

  if (newFiles.length > 0) {
    let info = "下列数据需要更新";
    let s = "";
    for (let i = 0; i < newFiles.length; i++) {
      let item = newFiles[i];
      s += item[0] + ":  \t\t" + item[1] + "\t->\t" + item[2] + "\n";
    }

    dialogs.confirm(info, s, function (value) {
      if (value) {
        threads.start(function () {
          let success = true;
          for (let i = 0; i < newFiles.length; i++) {
            let item = newFiles[i][0];
            let ok = download(onlineUrl + item, path + item);
            if (!ok) {
              success = false;
            }
          }

          if (!success) {
            dialogs.alert("下载失败");
          } else {
            files.write(
              path + versionFileName,
              JSON.stringify(latestVersion),
              "utf-8"
            );
            toast("更新完成");
          }
        });
      } else {
        log("取消");
      }
    });
  } else {
    let info = "当前数据都是最新的了";
    dialogs.alert(info);
  }
}

module.exports = update;
