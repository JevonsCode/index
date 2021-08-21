/***
 *
 * font-size: title 18px, others 12px
 *
 */
import React from "react";
import { Tag } from "@components/tag";
import "./styles.less";
import { indexsService } from "@service/indexs";
import { indexsStore } from "@store";
import { observer } from "mobx-react-lite";

/**
 * 卡片组件
 * ---
 *
 */
export function Card(props: typeof indexsStore.items[number]) {
  const { name, description, link, tags } = props;
  const _tags = tags;

  /**
   * 点击跳转
   * @param event
   */
  const clickJumpButton = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.stopPropagation();

    if (typeof link === "string") {
      window.open(link);
    }
  };

  return (
    <div className={"component-card-box"}>
      <div className={"component-card-container"}>
        <div className={"card-header"}>
          <div className={"card-header-image-field"}></div>
        </div>
        <div className="card-content-top">
          <span>{name}</span>
        </div>
        {description ? (
          <div className="card-content-middle">
            <span>{description}</span>
          </div>
        ) : null}
        <div className="card-content-bottom">
          <button
            className={"card-link-goto-field"}
            onClick={(e) => {
              clickJumpButton(e);
            }}
          >
            <div className={"card-link-goto-circle"}>
              <div className={"card-link-goto-circle-arrow"}></div>
            </div>
            <div className={"card-link-goto-words"}>跳 转</div>
          </button>
        </div>
      </div>

      {_tags?.length ? (
        <div className={"component-card-container-slide-cover"}>
          <div className={"tag-group"}>
            {_tags.map((tag) => {
              return (
                <Tag
                  key={tag.name}
                  style={{
                    marginRight: 6,
                    marginBottom: 2,
                  }}
                  onClick={() => indexsService.onClickTag(tag)}
                >
                  {tag.name}
                </Tag>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default observer(Card);
