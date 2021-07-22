import { SITE_COLLECTION } from "@database/indexs/site.collection";
import { indexsStore } from "@store";

export class IndexsService {
  constructor() {
    this.init();
  }

  public init() {
    this.deelwithSiteData();
  }

  private deelwithSiteData() {
    indexsStore.setItems(SITE_COLLECTION);
  }
}
