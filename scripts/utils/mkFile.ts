import * as fs from "fs";

/**
 * 生成文件
 * @param {*} fileName 文件名
 * @param {*} content 文件内容
 */
export async function makeFile(fileName: string, content: string) {
  if (!fileName) {
    throw new Error("未传入文件名");
  }
  if (!content) {
    throw new Error(fileName + " 文件没内容");
  }

  return new Promise((resolve) => {
    fs.writeFile(fileName, content, function (err) {
      if (err) throw Error(JSON.stringify(err));

      resolve(true);
    });
  });
}
