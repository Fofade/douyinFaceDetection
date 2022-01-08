// 插件地址：https://wws.lanzoux.com/iiz67lpzf3e 密码：4n6x
// 加载自己训练的神经网络模型
console.log("【模块】pythorch:", files.cwd());

let Logger = require("../logger/logger");

let logger = new Logger({
    filenamePattern: "yyyy_MM_dd_HH_mm_ss",
    maxFileSize: 512 * 1024,
    maxBackupSize: 3,
    dir: files.cwd() + "/data/scripts/pythorch/",
});

/**
 * 加载模型处理
 */
var Pytorch = (function () {
    let q = {};
    let pytorch = $plugins.load("com.hraps.pytorch"); // 导入插件
    logger.info("插件加载完成！")

    /**
     * 检测图片中的目标类型
     * @param {*} mode 模型-可为模型路径
     * @param {*} img 图片
     * @param {*} inputWidth 输入图片的宽
     * @param {*} inputHeight 输入图片的高
     * @param {*} outputRow row为yolo模型的分格数，由输入大小有关
     * @param {*} outputColumn column为每个分格的维度，由 位置(x,y,w,h)4个值,分数(score)1个值,类型(coco数据集80个类)80个值，共计85个值
     * @returns 识别结果
     */
    q.detectImg = function (mode = "yolov5s", img, inputWidth = 640, inputHeight = 640, outputRow = 25200, outputColumn = 85) {
        let model = pytorch.load(mode); // 加载模型
        //导入识别结果对应类型名 （为类名构成的字符串数组,可自己写死，如["car","plane","person"...]）
        let classes = pytorch.getCocoClasses();
        //缩放至模型输入维度
        let inputImg = images.resize(img, [inputWidth, inputHeight]);
        //图片转换至张量 MEAN和STD值设置为000和111，即不启用特殊归一化
        let inputTensor = pytorch.bitmapToTensor(inputImg.getBitmap(), [0, 0, 0], [1, 1, 1]);
        //执行神经网络推进 获得输出张量
        let output = pytorch.forwardTuple(model, inputTensor);
        //张量转浮点数组
        let f = output.getDataAsFloatArray();
        logger.info("模型输出维度: " + f.length);

        //计算图形缩放比例
        let imgScaleX = img.getWidth() / inputWidth;
        let imgScaleY = img.getHeight() / inputHeight;
        //还原识别结果的真实位置 转换至目标检测结果类数组
        let res = pytorch.floatsToResults(f, outputRow, outputColumn, imgScaleX, imgScaleY);
        logger.info("神经网络初始识别数量: " + res.size());
        //NMS算法过滤重复结果
        let nmsResults = pytorch.useNMS(res);
        logger.info("最终结果数量: " + nmsResults.size());
        //遍历输出结果
        let obj = [];
        for (let i = 0; i < nmsResults.size(); i++) {
            let r = nmsResults.get(i);
            let rect = r.rect;
            logger.info("类型: " + classes.get(r.classIndex) + "  置信度: " + r.score + "   位置: 左" + rect.left + " 上" + rect.top + " 右" + rect.right + " 下" + rect.bottom);
            obj.push({
                tyep: classes.get(r.classIndex),
                similar: r.score,
                local: {
                    left: rect.left,
                    top: rect.top,
                    bottom: rect.bottom,
                    right: rect.right
                }
            });
        }
        return obj;
    };

    /**
     * 文字情感分析
     * @param {*} text 文字->英文
     * @param {*} mode 模型-可为路径
     * @param {*} inputSize 模型输入规格, 默认128
     * @returns true/false
     */
    pytorch.detectEmotion = function (text, mode = "textcnn", inputSize = 128) {
        let model = pytorch.load(mode); // 加载模型
        let vocab = pytorch.getTextcnnVocab();
        logger.info("导入词汇表成功, 共计" + vocab.siz1() + "个。");

        //语句简单化处理 过滤标点 全部小写
        let textSimple = pytorch.simplifySentence(text);
        logger.info("【简单化语句】: " + textSimple);
        //根据词汇表将语句换成词向量序号 未知单词与长度不足处自动补0
        let ids = vocab.getIds(textSimple.split(" "), inputSize);
        logger.info("【规格化语句】: " + ids);
        //将列表构造成Tensor类型，适合网络输入
        let inputTensor = pytorch.fromBlob(ids, [1, inputSize]);
        //执行模型得到输出结果
        let outPutTensor = pytorch.forward(model, inputTensor);
        //输出张量转换为浮点数组
        let result = outPutTensor.getDataAsFloatArray();
        logger.info("模型输出: " + result[0] + "   " + result[1])
        //分析结果-测得具体数值后需要增加中性情感
        console.info("语句：" + text)
        if (result[0] <= result[1]) {
            logger.info("【结果】正面情感");
            return true;
        }
        logger.info("【结果】负面情感");
        return false;
    };
    return q;
})();

module.exports = Pytorch;