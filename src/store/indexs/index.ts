import { IndexsContent_WithTagConst } from "@database/indexs/site.collection";
import { makeAutoObservable } from "mobx";
class Indexs {
  items: IndexsContent_WithTagConst[] = [];

  text = "我是一段 Demo";
  setText(v: string) {
    indexsStore.text = v;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setItems = (value: IndexsContent_WithTagConst[]) => {
    indexsStore.items = value;
  };
}

const indexsStore = new Indexs();

export { indexsStore };
