let storage = storages.create("彩蛋");

let pagePath = {
  main: "../AUI.js",
  hell: "./hell/hell.js",
  heaven: "./heaven/heaven.js",
};

let mainStorage = storages.create("main");
let hellStorage = storages.create("hell");
let heavenStorage = storages.create("heaven");

let Logger = require("../module/logger/logger");
let logger = new Logger({
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: files.cwd() + "/data/egg/eggController/",
});

let eggController = {
  init: function () {
    storage.clear();
  },
  openPage: function (name) {
    ui.finish();
    engines.execScriptFile(pagePath[name]);
    logger.debug("打开页面：" + name);
  },
  pageInfo: {
    reduction: function (name) {
      switch (run) {
        case "hell": {
          let viewId = "hell";
          let data = hellStorage.get(viewId);
          if (data) {
            ui[viewId].setText(data);
            logger.debug("还原: " + ui[viewId].setText(data));
          }
          break;
        }
        case "heaven": {
          let viewId = "heaven";
          let data = heavenStorage.get(viewId);
          if (data) {
            ui[viewId].setText(data);
            logger.debug("还原: " + ui[viewId].setText(data));
          }
          break;
        }
        case "main": {
          let viewId = "main";
          let data = mainStorage.get(viewId);
          if (data) {
            ui[viewId].setText(data);
            logger.debug("还原: " + ui[viewId].setText(data));
          }
          break;
        }
        default:
          break;
      }
    },

    save: function (name) {
      switch (name) {
        case "hell": {
          let viewId = "hell";
          hellStorage.put(viewId, ui[viewId].text());
          logger.debug("ui[viewId] = " + ui[viewId].text());
          break;
        }
        case "heaven": {
          let viewId = "heaven";
          heavenStorage.put(viewId, ui[viewId].text());
          logger.debug("ui[viewId] = " + ui[viewId].text());
          break;
        }
        case "main": {
          let viewId = "main";
          mainStorage.put(viewId, ui[viewId].text());
          logger.debug("ui[viewId] = " + ui[viewId].text());
          break;
        }
        default:
          break;
      }
    },
  },
};
module.exports = eggController;
