import React, { useEffect, memo, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import "./styles/search-bash.less";

/**
 * 卡列表集合
 * ---
 * - 排序
 * - 瀑布流
 * - 分组
 * @returns
 */
function Search() {
  return (
    <div className="search-bash-container">
      <div>search</div>
    </div>
  );
}
const obSearch = observer(Search);

export { obSearch as SearchBash };
