import { TAG_COLLECTION } from "../src/database/indexs/tag.collection";
import { SITE_COLLECTION } from "../src/database/indexs/site.collection";
import { exec } from "./utils/exec";
import { makeFile } from "./utils/mkFile";

const outputTagPath = __dirname + "/../src/database/indexs/lib/tags.ts";

const BASECONTENT = `export default`;

interface IFileTagContent {
  [K: string]: unknown;
}

/**
 * Tag base
 */
const template = { icon: "", mainColor: "", isChose: false };

function filluptheVacancy(TAG_MAP: typeof TAG_COLLECTION) {
  for (let i = 0; i < SITE_COLLECTION.length; i++) {
    const site = SITE_COLLECTION[i];

    if (!site.tags) continue;

    for (let ii = 0; ii < site.tags.length; ii++) {
      const tag = site.tags[ii];

      if (tag && !TAG_MAP[tag]) {
        TAG_MAP[tag] = template;
      }
    }
  }
}

function deelwithFileTag(TAG_MAP: typeof TAG_COLLECTION) {
  for (const t in TAG_MAP) {
    const TAG = TAG_MAP[t] as IFileTagContent;
    if (!TAG) continue;

    TAG.isChose = false;
  }
}

/**
 * **main**
 */
function init() {
  const TAG_MAP = JSON.parse(JSON.stringify(TAG_COLLECTION));

  deelwithFileTag(TAG_MAP);

  filluptheVacancy(TAG_MAP);

  return TAG_MAP;
}

const CONTENT = BASECONTENT + JSON.stringify(init());

(async function run() {
  await makeFile(outputTagPath, CONTENT);

  // 希望你和我一样用 yarn ; )
  await exec(`yarn lint ${outputTagPath} --fix`);

  console.log("DEEL with TAG OVER");
})();
