import React, { useEffect, memo, useState, useMemo } from "react";
import { observer, useObserver } from "mobx-react-lite";
import "./styles/search-bash.less";
import { indexsStore } from "@store";

/**
 * Search
 */
function Search() {
  const { text, setText } = indexsStore;

  return (
    <div className="search-bash-container">
      <div>{text}</div>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}
const obSearch = observer(Search);

export { obSearch as SearchBash };
