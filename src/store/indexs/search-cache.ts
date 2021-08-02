import { makeAutoObservable } from "mobx";

export function SearchCache(valueArr: string[]) {
  return makeAutoObservable({
    valueArr,
    get double() {
      return this.value.push;
    },
    valueArrPush(value: string) {
      this.valueArr.push(value);
    },
  });
}

export const searchCache = SearchCache([]);
