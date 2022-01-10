// 悬浮窗
let Logger = require("../../module/logger/logger");

let logger = new Logger({
    filenamePattern: "yyyy_MM_dd_HH_mm_ss",
    maxFileSize: 512 * 1024,
    maxBackupSize: 3,
    dir: files.cwd() + "/data/ui/baseFloaty/",
});

var baseFloaty = (function () {
    let q = {};
    /**
     * 默认悬浮窗
     * @param {*} layout 布局
     * @param  {...any} params 根据参数属性绘制悬浮窗
     * @returns 悬浮窗对象
     */
    q.defaultFloaty = (layout, ...params) => {
        let p = {};
        let w = null;
        let dParams = params;
        (() => {
            if (floaty.checkPermission()) {
                floaty.closeAll();
                w = floaty.rawWindow(layout);
            }
        })();

        /**
         * 运行-加载数据-常用数据格式
         */
        p.run = () => {
            if (w != null) {
                dParams.forEach(p => {
                    if (p.type === "size") {
                        w.setSize(p.value.w, p.value.h);
                    } else if (p.type === "touch") {
                        w.setTouchable(p.value);
                    }
                    // 其他类型判定加在此处
                    logger.info(p.name + "完成！");
                });
                logger.info("加载数据完成！");
            } else logger.err("无悬浮窗！无法运行！");
        };

        p.update = (...params) => {
            dParams = params;
            p.run();
        };

        /**
         * 关闭悬浮窗
         * @returns boolean
         */
        p.close = () => {
            if (w != null) {
                w.close();
                logger.info("关闭悬浮窗");
                return true;
            }
            logger.info("无悬浮窗");
            return false;
        };
        return p;
    };
    return q;
})();

module.exports = baseFloaty;