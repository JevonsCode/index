import { IndexsContent_WithTagConst } from "@database/indexs/site.collection";
import { makeAutoObservable } from "mobx";
class Indexs {
  items: IndexsContent_WithTagConst[] = [];

  text = "我是一段 Demo";

  constructor() {
    makeAutoObservable(this);
  }

  setItems = (value: IndexsContent_WithTagConst[]) => {
    indexsStore.items = value;
  };

  setText(v: string) {
    indexsStore.text = v;
  }
}

const indexsStore = new Indexs();

export { indexsStore };
