/**
 * 识别图片文字
 * @param img 图片二进制数据
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function RunOCR(img: any) {
  return await Run(img);
}
