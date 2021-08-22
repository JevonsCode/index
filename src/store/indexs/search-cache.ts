import { makeAutoObservable } from "mobx";
import { ISearchedCache } from "./types";

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
