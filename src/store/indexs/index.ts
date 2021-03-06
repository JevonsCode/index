import { action, makeAutoObservable } from "mobx";
import { IIndexsContent, ITag } from "./types";

interface IIndexsContentStore extends IIndexsContent {
  tags?: ITag[];
}

class Indexs {
  items: IIndexsContentStore[] = [];
  tags: ITag[] = [];
  choseTags: ITag[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setItems = (value: typeof indexsStore.items) => {
    indexsStore.items = value;
  };

  setTags = (value: ITag[]) => {
    indexsStore.tags = value;
  };

  onClickTag = action((e: ITag) => {
    e.isChose = !e.isChose;

    let index: number | null = null;

    for (let i = 0; i < indexsStore.choseTags.length; i++) {
      if (indexsStore.choseTags[i].name === e.name) {
        index = i;
        break;
      }
    }

    if (e.isChose) {
      typeof index !== "number" && indexsStore.choseTags.push(e);
    } else {
      typeof index === "number" && indexsStore.choseTags.splice(index, 1);
    }
  });
}

const indexsStore = new Indexs();

export { indexsStore };
