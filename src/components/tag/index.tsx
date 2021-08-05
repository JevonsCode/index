import React from "react";
import "./styles.less";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 禁止「禁止穿透」
   */
  disabledStopPropagation?: false;
}

const TagRender: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  { children, disabledStopPropagation = false, ...props },
  ref
) => {
  const needClick = "onClick" in props;

  const tagContent = (
    <span
      ref={ref}
      className={`component-tag-container ${
        needClick ? "component-tag-container-clickable" : ""
      }  ${props.className}`}
      style={props.style}
    >
      <span>{children}</span>
    </span>
  );

  return needClick ? (
    <a
      onClick={(event) => {
        props.onClick?.(event);
        !disabledStopPropagation && event.stopPropagation();
      }}
    >
      {tagContent}
    </a>
  ) : (
    tagContent
  );
};

/**
 * 标签 🏷
 */
const Tag = React.memo(React.forwardRef(TagRender));

export { Tag };
