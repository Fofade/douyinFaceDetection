console.time("导入类");
runtime.images.initOpenCvIfNeeded();
importClass(org.opencv.core.MatOfByte);
importClass(org.opencv.core.Scalar);
importClass(org.opencv.core.Point);
importClass(org.opencv.core.CvType);
importClass(java.util.List);
importClass(java.util.ArrayList);
importClass(java.util.LinkedList);
importClass(org.opencv.imgproc.Imgproc);
importClass(org.opencv.imgcodecs.Imgcodecs);
importClass(org.opencv.core.Core);
importClass(org.opencv.core.Mat);
importClass(org.opencv.core.MatOfDMatch);
importClass(org.opencv.core.MatOfKeyPoint);
importClass(org.opencv.core.MatOfRect);
importClass(org.opencv.core.Size);
importClass(org.opencv.features2d.DescriptorExtractor);
importClass(org.opencv.features2d.DescriptorMatcher);
importClass(org.opencv.features2d.FeatureDetector);
importClass(org.opencv.features2d.Features2d);
importClass(org.opencv.core.MatOfPoint2f);
console.timeEnd("导入类");

let imgPath = files.path("./dy1_心_带背景.png");
let src1 = Imgcodecs.imread(imgPath); // 查找的图像
let contours = new java.util.ArrayList();
contour_info(src1, contours);

// 遍历轮廓, 提取数据
let bigArr = [];
let cxyArr = [];
let areaArr = [];
for (let i = 0; i < contours.size(); ++i) {
  let item = contours.get(i);
  // 最小外接矩形
  let rotateRect = Imgproc.minAreaRect(new MatOfPoint2f(item.toArray()));
  // 矩形中心
  cxyArr.push([rotateRect.center.x, rotateRect.center.y]);
  // 轮廓面积
  let area = Math.abs(Imgproc.contourArea(item));
  areaArr.push(area);
  var len = item.size();
  let arr = [];
  // 提取轮廓坐标
  for (var w = 0; w < len.width; w++) {
    for (var h = 0; h < len.height; h++) {
      arr.push(item.get(h, w));
    }
  }
  bigArr.push(arr);
}

var path = new android.graphics.Path();
var paint = new android.graphics.Paint();
paint.setColor(colors.parseColor("#ffff00"));
paint.setStyle(Paint.Style.STROKE);
paint.setStrokeWidth(5);
var img = images.read(imgPath);
var canvas = new Canvas(img);

log("轮廓面积列表");
log(areaArr); // [ 1745.5, 12161, 36100.5 ]
var len = bigArr.length;
for (var i = 0; i < len; i++) {
  // 过滤面积太小的轮廓
  // if (areaArr[i] < 25) {
  //   continue;
  // }
  let arr = bigArr[i];
  var arrLen = arr.length;
  path.moveTo(arr[0][0], arr[0][1]);
  for (var j = 1; j < arrLen; j++) {
    path.lineTo(arr[j][0], arr[j][1]);
  }
  path.close();
  // 画轮廓
  canvas.drawPath(path, paint);
  // 画轮廓中心
  let xy = cxyArr[i];
  canvas.drawPoint(xy[0], xy[1], paint);
}

var image = canvas.toImage();
images.save(image, "/sdcard/tmp.png");
app.viewFile("/sdcard/tmp.png");

// ===================自定义函数=====================
function contour_info(image, contours) {
  let dst = new Mat();
  Imgproc.GaussianBlur(image, dst, Size(3, 3), 0);
  let gray = new Mat();
  let binary = new Mat();
  Imgproc.cvtColor(dst, gray, Imgproc.COLOR_BGR2GRAY);
  Imgproc.threshold(gray, binary, 0, 255, Imgproc.THRESH_BINARY | Imgproc.THRESH_OTSU);
  let hierarchy = new Mat();
  Imgproc.findContours(binary, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE, Point());
}