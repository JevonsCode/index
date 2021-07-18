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

  constructor() {
    makeAutoObservable(this);
  }
}

const indexsStore = new Indexs();

export { indexsStore };
