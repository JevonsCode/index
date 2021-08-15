import { TAG_COLLECTION } from "../src/database/indexs/tag.collection";
import { exec } from "./utils/exec";
import { makeFile } from "./utils/mkFile";

const outputTagPath = __dirname + "/../src/database/indexs/lib/tags.ts";

interface IFileTagContent {
  [K: string]: unknown;
}

function deelwithFileTag() {
  for (const t in TAG_COLLECTION) {
    const TAG = TAG_COLLECTION[t] as IFileTagContent;
    if (!TAG) continue;

    TAG.isChose = false;
  }
}

deelwithFileTag();

const CONTENT = `export default` + JSON.stringify(TAG_COLLECTION);

(async function run() {
  await makeFile(outputTagPath, CONTENT);

  // 希望你和我一样用 yarn ; )
  await exec(`yarn lint ${outputTagPath} --fix`);

  console.log("DEEL with TAG OVER");
})();
