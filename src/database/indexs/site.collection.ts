import { IIndexsContent } from "@store/indexs/types";
import { ORIGIN_SITE_COLLECTION } from "./lib/sites";
import { tag_type } from "./tag.collection";

/**
 * IndexsContent_WithTagConst
 * ---
 * tags as const
 */
export interface IndexsContent_WithTagConst extends IIndexsContent {
  tags?: tag_type[];
}

const SITE_COLLECTION = ORIGIN_SITE_COLLECTION as IndexsContent_WithTagConst[];
export { SITE_COLLECTION };
