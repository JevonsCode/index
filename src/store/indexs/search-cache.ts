import { makeAutoObservable } from "mobx";

export function SearchCache(valueArr: ISearchedCache[]) {
  return makeAutoObservable({
    valueArr,

    valueArrPush(value: ISearchedCache) {
      this.valueArr.push(value);
    },

    clearValueArr() {
      this.valueArr = [];
    },
  });
}

export const searchCache = SearchCache([]);
