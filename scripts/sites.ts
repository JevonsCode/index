import { exec } from "child_process";
import { ORIGIN_SITE_COLLECTION } from "../src/database/indexs/lib/sites";
import { makeFile } from "./utils/mkFile";
import { IIndexsContent } from "../src/store/indexs/types";
import { query } from "./utils/query";

const outputSitePath = __dirname + "/../src/database/indexs/lib/sites.ts";

const BASECONTENT = `
import { IIndexsContent } from "@store/indexs/types";

export interface IndexsContent_WithTagConst_origin extends IIndexsContent {
  /**
   * @todo and run yarn tag-set : )
   */
  tags?: string[];
}

export const ORIGIN_SITE_COLLECTION: IndexsContent_WithTagConst_origin[] = `;

// bug todo 不能复用 IndexsContent_WithTagConst_origin
export interface IndexsContent_WithTagConst_origin extends IIndexsContent {
  /**
   * @todo and run yarn site-set
   */
  tags?: string[];
}

async function setWebIcon(SITES: typeof ORIGIN_SITE_COLLECTION) {
  for (let i = 0; i < SITES.length; i++) {
    const site = SITES[i] as IndexsContent_WithTagConst_origin;

    if (site.icon || !site.link) continue;

    let link = "";

    if (typeof site.link === "string") {
      link = site.link;
    } else {
      const [value, ...args] = Object.keys(site.link);
      args;
      link = site.link[value];
    }

    if (link) {
      link += link[link.length - 1] === "/" ? "" : "/";
    }

    const domainFirstName = link.match(/https?:\/\/((\w+)\.)+?(\w+)\//);

    if (!(domainFirstName && domainFirstName[2])) continue;

    link = link ? link + "favicon.ico" : undefined;

    if (link) {
      const imgName = "site-favicon/" + domainFirstName[2] + ".ico";

      try {
        console.log(
          `这是个啥 ==>  ~ file: sites.ts ~ line 55 ~ setWebIcon ~ link`,
          link
        );
        let res = await query.getImage(link, imgName);
        if (res.statusCode !== 200) {
          res = await query.getImage(link, imgName, "http");
        }
        if (res.statusCode !== 200) {
          link = undefined;
        }

        console.log(
          `这是个啥 ==>  ~ file: sites.ts ~ line 57 ~ setWebIcon ~ res`,
          res.statusCode
        );
      } catch (e) {
        link = undefined;
      }
    }

    site["icon"] = link;
  }

  return SITES;
}

/**
 * **main**
 */
async function init() {
  const SITE_MAP = JSON.parse(JSON.stringify(ORIGIN_SITE_COLLECTION));
  await setWebIcon(SITE_MAP);
  return SITE_MAP;
}

(async function run() {
  const CONTENT = BASECONTENT + JSON.stringify(await init());

  await makeFile(outputSitePath, CONTENT);

  // 希望你和我一样用 yarn ; )
  await exec(`yarn lint ${outputSitePath} --fix`);

  console.log("DEEL with SITES OVER");
})();
