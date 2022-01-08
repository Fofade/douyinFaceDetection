// 插件地址：https://wws.lanzoux.com/iduulmofune 密码：habv
// ocr文字识别
console.log("【模块】ocr:", files.cwd());

let Logger = require("../logger/logger");

let logger = new Logger({
    filenamePattern: "yyyy_MM_dd_HH_mm_ss",
    maxFileSize: 512 * 1024,
    maxBackupSize: 3,
    dir: files.cwd() + "/data/scripts/ocr/",
});

/**
 * 使用前请确保插件已安装
 */
var OCR = (function () {
    let q = {};
    let ocr = $plugins.load("com.hraps.ocr"); // 导入插件
    logger.info("插件加载完成！")
    /**
     * 检测图片
     * @param {*} img 图片 images.read("./test.jpg")
     * @param {*} ratio 比率
     * @returns 图片ocr识别结果
     */
    q.detectImg = function (img, ratio = 1) {
        logger.info("开始识别图片");
        return ocr.detect(img.getBitmap(), ratio);
    };

    /**
     * 过滤图片结果
     * @param {*} results 图片识别后的结果
     * @param {*} dbnetScore 该区域为文字的置信度的下限
     * @param {*} angleScore 文字方向类型的置信度的下限
     * @param {*} crnnScore 所有文字识别的平均置信度的下限
     * @returns 过滤后的结果
     */
    q.filterResult = function (results, dbnetScore = 0.5, angleScore = 0.5, crnnScore = 0.5) {
        logger.info("开始过滤结果！");
        return ocr.filterScore(results, dbnetScore, angleScore, crnnScore);
    };

    /**
     * 获取文字在图片识别结果集中的位置
     * @param {*} text 待比对文本
     * @param {*} results 图片识别数据
     * @returns 空数组或者非空数组{text:文本, local:位置, similar:相似度}
     */
    q.getTextLocal = function (text, results) {
        let obj = [];
        for (let i = 0; i < results.size(); i++) {
            let res = results.get(i);
            logger.info("【比对结果" + (i + 1) + "】:[文字]" + res.text + " [位置]" + res.frame + " [角度类型]" + res.angleType);
            logger.info("[区域置信度]" + res.dbScore + " [角度置信度]" + res.angleScore + " [文字置信度]" + res.crnnScore);
            if (res.text.indexOf(text) != -1) {
                logger.info("识别成功!");
                obj.push({
                    text: res.text,
                    local: res.frame,
                    similar: res.crnnScore
                });
            } else {
                logger.info("识别失败!");
            }
        }
        return obj;
    };
    return q;
})();

module.exports = OCR;