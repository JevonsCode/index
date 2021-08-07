import { IndexsContent_WithTagConst } from "@database/indexs/site.collection";
import { makeAutoObservable } from "mobx";
class Indexs {
  items: IndexsContent_WithTagConst[] = [];
  tags: ITag[] = [];
  choseTags: ITag[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setItems = (value: IndexsContent_WithTagConst[]) => {
    indexsStore.items = value;
  };

  setTags = (value: ITag[]) => {
    indexsStore.tags = value;
  };

  setChoseTags = (value: ITag[]) => {
    indexsStore.choseTags = value;
  };
}

const indexsStore = new Indexs();

export { indexsStore };
