import {
  IndexsContent_WithTagConst,
  SITE_COLLECTION,
} from "@database/indexs/site.collection";
import { TAG_COLLECTION } from "@database/indexs/tag.collection";
import { tag_type } from "@database/indexs/tag.collection";
import { indexsStore } from "@store";

class IndexsService {
  SITE_COLLECTION: typeof SITE_COLLECTION;
  TAG_COLLECTION: typeof TAG_COLLECTION;

  constructor() {
    this.SITE_COLLECTION = SITE_COLLECTION;
    this.TAG_COLLECTION = TAG_COLLECTION;
  }

  public init() {
    this.deelwithSiteData(this.SITE_COLLECTION);
    this.deelwithTagData(this.TAG_COLLECTION);
  }

  private deelwithSiteData(sites: typeof SITE_COLLECTION) {
    indexsStore.setItems(sites);
  }

  private deelwithTagData(tags: typeof TAG_COLLECTION) {
    const _tags: ITag[] = [];

    for (const tag in tags) {
      _tags.push({
        name: tag,
        ...tags[tag],
      });
    }

    indexsStore.setTags(_tags);
  }

  public filterSiteDate(filterParams: {
    nameKeywords?: string[];
    tagNames?: tag_type[];
  }) {
    const { nameKeywords = [], tagNames = [] } = filterParams;

    console.log(
      "kw: ",
      "->" + nameKeywords?.join() + "<-",
      " & tags: ",
      tagNames?.join()
    );

    const filtered: IndexsContent_WithTagConst[] = [];

    const deelwithCurrent = (_current: IndexsContent_WithTagConst) => {
      deelwithNameKeywords(_current, nameKeywords.length);

      function deelwithNameKeywords(
        current: IndexsContent_WithTagConst,
        index: number
      ) {
        if (nameKeywords?.length && index) {
          const testReg = new RegExp(
            nameKeywords[index - 1]?.replace(/( |\n|\r)/g, ""),
            "i"
          );

          if (testReg.test(current.name.replace(/ /g, ""))) {
            deelwithNameKeywords(current, index - 1);
          }
          // else 说明没有匹配
        } else {
          deelwithTags(current, tagNames.length);
        }
      }

      function deelwithTags(
        current: IndexsContent_WithTagConst,
        index: number
      ) {
        if (tagNames.length && index) {
          if (current.tags?.some((word) => word === tagNames[index - 1])) {
            deelwithTags(current, index - 1);
          }
          // else 说明没有匹配
        } else {
          pushIt(current);
        }
      }

      function pushIt(current: IndexsContent_WithTagConst) {
        filtered.push(current);
      }
    };

    for (let i = 0; i < this.SITE_COLLECTION.length; i++) {
      const current = this.SITE_COLLECTION[i];

      deelwithCurrent(current);
    }

    this.deelwithSiteData(filtered);
  }
}

export const indexsService = new IndexsService();
