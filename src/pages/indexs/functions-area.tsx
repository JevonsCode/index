import React, { useEffect } from "react";
import { SearchBash } from "./components/search";
import { TagsContainer } from "./components/tags";
import "./styles/functions-area.less";

export function FunctionsArea() {
  const scrollShowSearch = (el_box_target?: Element, el_search?: Element) => {
    const el_box_target_rect =
      el_box_target && el_box_target.getBoundingClientRect();

    if (!el_box_target || !el_search || !el_box_target_rect) return;
    const containsFlag = el_search.classList.contains("fixed");
    if (!containsFlag && el_box_target_rect.bottom < 0) {
      el_search.classList.add("fixed");
    } else if (containsFlag && el_box_target_rect.bottom >= 0) {
      el_search.classList.remove("fixed");
    }
  };

  useEffect(() => {
    const el_box_target =
      document.getElementsByClassName("indexs-functions")[0];
    const el_search = document.getElementsByClassName("search-container")[0];

    addEventListener(
      "scroll",
      scrollShowSearch.bind(null, el_box_target, el_search),
      true
    );

    return () => {
      removeEventListener(
        "scroll",
        scrollShowSearch.bind(null, el_box_target, el_search),
        true
      );
    };
  }, []);

  return (
    <div className="indexs-functions">
      <div className="function-container search-container">
        <SearchBash />
      </div>
      <div className="function-container tags-container">
        <TagsContainer />
      </div>
      <div className="function-container timeline-container"></div>
    </div>
  );
}
