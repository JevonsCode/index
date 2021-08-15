import React from "react";
import { observer } from "mobx-react-lite";
import { indexsStore } from "@store/indexs";
import { Tag } from "@components/tag";
import "./styles/tags.less";

/**
 * Tags
 */
function Tags() {
  const onClickTag = (e: ITag) => {
    e.isChose = !e.isChose;
  };

  return (
    <div className="tags-box">
      <div>
        {indexsStore.tags.map((tag) => {
          return (
            <Tag
              key={tag.name}
              className="tag-item"
              onClick={() => onClickTag(tag)}
              isChose={tag.isChose}
            >
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
