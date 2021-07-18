import React from "react";
import { observer } from "mobx-react-lite";
import { indexsStore } from "@store/indexs";

/**
 * Tags
 */
function Tags() {
  const { text } = indexsStore;

  return (
    <div className="tags-container">
      <div>--&gt;{text}</div>
    </div>
  );
}
const obSearch = observer(Tags);

export { obSearch as TagsContainer };
