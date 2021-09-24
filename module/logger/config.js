let getPath = require(files.path("../../utils/getPath.js"));

module.exports = {
  filenamePattern: "yyyy_MM_dd_HH_mm_ss",
  maxFileSize: 512 * 1024,
  maxBackupSize: 3,
  dir: getPath.getRelativePath("../../data/logger"),
};
