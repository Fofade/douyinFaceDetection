import * as ocr from "@paddlejs-models/ocr";
LoadOCR(); // 默认初始化
async function LoadOCR() {
  await ocr.init();
  console.log("初始化OCR完成！");
}
/**
 * 识别点位
 * @param {*} img
 */
export async function Run(img) {
  const res = await ocr.recognize(img);
  if (res.text?.length) {
    console.log("OCR识别文本结果：", res.text);
    console.log("OCR识别点位结果：", res.point);
  }
}
