import React from "react";
import { observer } from "mobx-react-lite";
import { indexsStore } from "@store/indexs";
import { Tag } from "@components/tag";
import "./styles/tags.less";

/**
 * Tags
 */
function Tags() {
  const onClickTag = (e) => {
    console.log(e);
  };

  return (
    <div className="tags-box" onClick={onClickTag}>
      <div>
        {indexsStore.tags.map((tag) => {
          return (
            <Tag key={tag.name} className="tag-item">
              {tag.name}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
const obSearch = observer(Tags);

export { obSearch as TagsContainer };
