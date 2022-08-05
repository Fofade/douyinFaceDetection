import * as ocr from '@paddlejs-models/ocrdet'

export async function Init () {
  await ocr.load()
}
