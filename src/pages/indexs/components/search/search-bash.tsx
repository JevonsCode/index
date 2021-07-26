import React, { useEffect, memo, useState, useMemo } from "react";
import { observer, useObserver } from "mobx-react-lite";
import "./styles/search-bash.less";
import { indexsService } from "@service/indexs";
import { indexsStore } from "@store";

/**
 * Search
 */
function Search() {
  return (
    <div className="search-bash-container">
      <input
        type="text"
        // value={text}
        onChange={(e) => {
          // setText(e.target.value);

          indexsService.filterSiteDate({
            nameKeywords: e.target.value.replace(/ +/g, " ").split(" "),
            tagNames: ["style", "react"],
          });
        }}
      />
    </div>
  );
}
const obSearch = observer(Search);

export { obSearch as SearchBash };
