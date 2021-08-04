import { searchCache, indexsStore } from "@store";

export function matchSearch(
  innerText: string,
  toSearch: (content: string) => void
) {
  if (innerText.match(/^(clear)/)) {
    searchCache.clearValueArr();
  } else if (innerText.match(/^(help)/)) {
    const content = "help";
    const param = {
      content,
      result: `- find <要查找的关键词 (空格复合匹配)> (简写 f <content>)
      - clear 清空
      - find <空> 与 <Enter> 查找全部`,
    };

    searchCache.valueArrPush(param);
  } else if (innerText.match(/^(f(ind)? )/)) {
    const content = innerText.replace(/^(f(ind)? )/, "");
    toSearch(content);
    const param = {
      content: innerText,
      result: `total: ${indexsStore.items.length}`,
    };

    searchCache.valueArrPush(param);
  } else if (innerText) {
    const content = innerText.split(" ")[0];
    const param = {
      content,
      result: `command not found: ${content}`,
    };

    searchCache.valueArrPush(param);
  } else {
    searchCache.valueArrPush({
      content: "",
    });
    toSearch("");
  }
}
