# 抖音智能辅助（人脸检测）

> 用Autojs写的抖音人脸颜值检测脚本

## 项目无期限延更，想要用的可以下载源码，修改.dat数据文件里面的控件id，重新打包成apk运行。项目终止于抖音版本V11.3.0

## 2020-5-26 
---
- [x] 支持控件信息更新

## 支持功能

---

- [x] 自动点赞关注颜值合格的小哥哥/小姐姐
- [x] 判断视频中人物的性别、年龄和颜值（百度智能云提供支持）

## 适用场景

---

1. 出于欣赏目的将抖音培养成高颜值小姐姐/小哥哥聚集地
2. 吸粉引流



## 原理

---

1. 打开抖音
2. 截图
3. 识别是否有人脸并检测颜值
4. 颜值合格则点赞关注切换下一个视频
5. 颜值不合格或无人脸则稍作等待后继续识别该视频，直到`allTime`的值小于0才切换下一个视频
6. 一个视频最长停留一分钟左右（如果网络通常的话）

## 源码使用

---

1. 首先去百度云控制台获取到自己的AK和SK
2. 然后将`AISearch.js`的 59行的`ak`和60行的`sk`换成你自己的AK和SK
3. 再用Autojs运行就OK了
4. 如果抖音版本不是V10.9.0，请自行修改`AISearch.js`的 37行的关注控件的`id`和42行点赞控件的`id`，id的值是对应抖音版本的该控件id的值

## App使用

---

> 前提:
>
>        1. 操作系统为安卓7.0以上
>        2. 抖音版本为V10.9.0
>        3. 悬浮窗权限
>        4. 无障碍权限

## 出错处理

---

### 目前已知错误有：

1. 网络延迟太高导致程序上传截图时异常
2. 无悬浮窗权限导致程序无法显示控制台
3. 未授予无障碍权限导致截图权限异常

### 解决办法：

1. 运行app前授好权限
2. 授权完成后，关闭控制台，切回app，再点击开始。

## 运行截图

---

![运行截图1](img/运行截图1.png)

![运行截图2](img/运行截图2.png)

