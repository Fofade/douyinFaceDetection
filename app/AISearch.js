var faceValue = 30;//默认30分
var pornValue = 2;//默认2位
var type = 'female';//默认小姐姐
if(files.read("yanzhi.dat")){
    faceValue = files.read("yanzhi.dat");
}else{
    faceValue = 30;//默认30分
}
if(files.read("shuliang.dat")){
    pornValue = files.read("shuliang.dat");
}else{
    pornValue = 2;//默认2位
}
if(files.read("xingbie.dat")){
    type = files.read("xingbie.dat");
}else{
    type = 'female';//默认2位
}


var countVid = 1;//滑动的视频数
var countAdd = 0;//关注的视频数
console.show();
log("颜值："+faceValue);
log("数量："+pornValue);
log("性别："+type);

if(app.launch("com.ss.android.ugc.aweme")){
    log("抖音打开成功！");
    toast("抖音打开成功！");

    if(!requestScreenCapture(false)){
        log("请求截图失败");
        exit();
    }

    var addStar = id("b6s").desc("关注").findOne();
    var addStar_x = addStar.bounds().centerX();
    var addStar_y = addStar.bounds().centerY();
    log("获取关注控件成功!");

    var addHeart = id("alx").findOne();
    var addHeart_x = addHeart.bounds().centerX();
    var addHeart_y = addHeart.bounds().centerY();
    log("获取点赞控件成功!");

    while(countAdd < pornValue){
        var time = 1000;
        var allTime = 0.3 * 60 * 1000;
        
        for(var i = 0; allTime > 0; i++){
            var temAdd = countAdd;
            var img = captureScreen();
            var imgFile = i+".png";
            images.saveImage(img,imgFile);
            log("…………开始人脸识别！…………");
            toast("开始人脸识别！");
            var img1 = images.read(imgFile);
            var ak = 'KXIS86UejDFk9RzMxYp0DFMF';//你的人脸识别ak
            var sk = 'C93QyBiG346cTezoECXQsGcUsszaln4G';//你的人脸识别sk
            var access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id="+ak+"&client_secret="+sk).body.json().access_token;
            var url = "https://aip.baidubce.com/rest/2.0/face/v3/detect" + "?access_token=" + access_token;
            var image64 = images.toBase64(img1);
            if(img1){
                       
                var res = http.post(url, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    'image': image64,
                    'image_type': 'BASE64',
                    'face_field': 'gender,age,beauty'
                });

                var str = JSON.parse(res.body.string());

                if(str['error_msg'] == 'pic not has face'){
                    log(countVid+".没有检测到人脸！");
                    toast("没有检测到人脸！");
                }else if(str['error_msg'] == 'SUCCESS'){
                    log(countVid+".检测到了"+str['result']['face_num']+"张人脸");
                    log(countVid+".人脸性别为："+str['result']['face_list'][0]['gender']['type']);
                    log(countVid+".人脸年龄为："+str['result']['face_list'][0]['age']);
                    log(countVid+".人脸颜值为："+str['result']['face_list'][0]['beauty']);
                    toast("人脸性别为：["+str['result']['face_list'][0]['gender']['type']+"]  人脸颜值为：["+str['result']['face_list'][0]['beauty']+"]");
                    if(str['result']['face_list'][0]['gender']['type'] == type){
                        if(str['result']['face_list'][0]['beauty'] > faceValue){
                            log(countVid+".人脸颜值合格!");
                            toast(countVid+".人脸颜值合格!");
                            click(addStar_x,addStar_y);
                            click(addHeart_x,addHeart_y);
                            countAdd++;
                        }
                    }

                }
            }
            log("…………"+countVid+"的人脸识别运行结束…………");
            toast("人脸识别完成");
            time += 1000*i;
            allTime = allTime - time;
            sleep(time);
            log("第"+countVid+"个视频，已点赞关注"+countAdd+"个视频");
            toast("第"+countVid+"个视频，已点赞关注"+countAdd+"个视频");
            files.remove(imgFile);
            if(temAdd < countAdd){
                log("视频已关注");
                toast("视频已关注");
                if(pornValue != countAdd){
                    swipe(device.width / 2, (device.height - (device.height/8)), device.width / 2, device.height/8, 1500);
                    log("滑动完成");
                    countVid ++;
                }
                break;
            }else{
                log("视频不符合您的审美")
                toast("视频不符合您的审美");
                if(allTime <0){
                    swipe(device.width / 2, (device.height - (device.height/8)), device.width / 2, device.height/8, 1500);
                    log("滑动完成");
                    countVid ++;
                }
            }
        }
    }
}
log("运行结束！共关注"+countAdd+"位颜值"+faceValue+"分以上的用户!");
toast("运行结束！共关注"+countAdd+"位颜值"+faceValue+"分以上的用户!");
log("谢谢您的使用，再见！");
toast("谢谢您的使用，再见！");
sleep(5000);
console.hide();