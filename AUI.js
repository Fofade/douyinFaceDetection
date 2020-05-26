"ui";
/**
 * 全局变量
 */

var faceValue = 80;//默认80分
var pornValue = 20;//默认20位
var type = 'female';//默认小姐姐
var jspath = "AISearch.js";//脚本地址
// console.show();
ui.layout(
    <vertical padding="16">
        <text textSize="30sp" textColor="#cd4acf" >欢迎使用抖音智能辅助</text>
        {/* logo */}
        <img radius="20" src="file://logo.jpg" w="auto" h="auto" circle="true" />
        <text>您想要小哥哥还是小姐姐?(默认为上一次选择)</text>
        {/* 单选框 */}
        <radiogroup mariginTop="16">
            <radio id="rad1" text="小哥哥"/>
            <radio id="rad2" text="小姐姐" />
        </radiogroup>
        <text >您期望的小哥哥(小姐姐)颜值(百度的人脸检测太苛刻，建议50):</text>
        <input id="ipt1" inputType="number" textSize="16sp" hint="0-100"/>
        <text >您期待点赞关注的小哥哥(小姐姐)数量(建议10):</text>
        <input id="ipt2" inputType="number" textSize="16sp" hint="小于999"/>
        <button id="btn1" text="开始" w="auto" style="Widget.AppCompat.Button.Colored"/>
        <button id="btn3" text="更新" w="auto" style="Widget.AppCompat.Button.Colored"/>
        <button id="btn2" text="退出" w="auto" style="Widget.AppCompat.Button.Colored"/>
        <text textSize="30sp" textColor="blue" >开始之前请确保</text>
        <text textSize="20sp" textColor="red" >1.本应用的悬浮窗权限已打开</text>
        <text textSize="20sp" textColor="red" >2.本应用的无障碍权限已打开</text>
        <text textSize="20sp" textColor="red" >3.本应用的网络权限已打开且无网络障碍</text>
        <text textSize="20sp" textColor="red" >4.操作系统的版本为：安卓7.0+</text>
        <text textSize="20sp" textColor="red" >5.点击更新按钮获取最新控件数据</text>
        <text textSize="30sp" textColor="red" >其它情况可自行测试</text>
        <text textSize="30sp" textColor="blue" >温馨提示：</text>
        <text textSize="20sp" textColor="red" >不要边充电边运行本脚本，这样对手机电池不好！</text>
        <text textSize="20sp" textColor="red" >脚本仅供娱乐！颜值识别成功率由百度提供的人脸识别技术支持，不要盲从。</text>
    </vertical> 
);

toast("我是作者龙龙王,我有最终解释权,使用即默认同意我的霸王条款!")
ui.rad1.on("check",(checked)=>{
    if(checked){
        type = 'male';
        files.write("data/xingbie.dat", type);
    }
});
ui.rad2.on("check",(checked)=>{
    if(checked){
        type = 'female';
        files.write("data/xingbie.dat", type);
    }
});
// 开始
ui.btn1.click(()=>{
    // 获取输入的值
    var text1 = ui.ipt1.text();
    if(text1.length == 0){
        ui.ipt1.setError("输入不能为空");
        return;
    }
    var faceva = parseInt(text1);
    if(faceva <= 0){
        ui.ipt1.setError("颜值太低了!");
        return;
    }else if(faceva > 100){
        ui.ipt1.setError("真的有人颜值突破一百分吗?");
        return;
    }else{
        faceValue = faceva;
        files.write("data/yanzhi.dat", faceValue);
    }
    ui.ipt1.setError(null);
    
    //输入数量
    var text2 = ui.ipt2.text();
    if(text2.length == 0){
        ui.ipt2.setError("输入不能为空");
        return;
    }
    var pornva = parseInt(text2);
    if(pornva <= 0){
        ui.ipt2.setError("数量太少了!");
        return;
    }else if(pornva > 999){
        ui.ipt2.setError("您忘了三星Note吗?");
        return;
    }else{
        pornValue = pornva;
        files.write("data/shuliang.dat", pornValue);
    }
    ui.ipt2.setError(null);
    // 开始运行
    // console.show();
    log("开始运行！");
    if(files.exists(jspath)){
        engines.execScriptFile(jspath)
    }
    
});
// 退出
ui.btn2.click(()=>{
    exit();
});
// 更新
let update = require("update/update.js");
var ropath = "/sdcard/脚本/pro/douyinFaceDetection/";//获取当前路径
ui.btn3.click(()=>{
    let checkPermission = floaty.checkPermission();
    if (!checkPermission) {
        floaty.requestPermission();
        return;
    }
    threads.start(function () {
        let url = "https://gitee.com/fofade/douyinFaceDetection/raw/master/";
        // update(url + "京东/", rootPath + "京东/", "version.json");
        update(url + "lastest/", ropath + "lastest/", "update.json")
    });
});