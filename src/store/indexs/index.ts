import { makeAutoObservable } from "mobx";
class Indexs {
  content: IndexsContent[] = [
    {
      name: "demo",
      tags: [""],
      link: {
        en: "",
      },
      date: "",
      author: "",
      description: "",
    },
  ];

  text = "我是一段 Demo";

  constructor() {
    makeAutoObservable(this);
  }

  setText(v: string) {
    indexsStore.text = v;
  }
}

const indexsStore = new Indexs();

export { indexsStore };
