import {
  IndexsContent_WithTagConst,
  SITE_COLLECTION,
} from "@database/indexs/site.collection";
import { indexsStore } from "@store";

export class IndexsService {
  constructor() {
    this.init();
    let i = 0;
    // MOCK
    while (i < 10) {
      const x = (Math.random() * 100000).toString();
      if (x.substr(0, 4) === "6666") {
        console.log("--> ", x);
        i++;
      }
    }
  }

  public init() {
    this.deelwithSiteData();
  }

  private deelwithSiteData() {
    indexsStore.setText("service set");
  }
}
