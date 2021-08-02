import React, { useEffect, memo, useState, useMemo, useRef } from "react";
import { observer, useObserver } from "mobx-react-lite";
import "./styles/search-bash.less";
import { indexsService } from "@service/indexs";
import { indexsStore } from "@store";
import { searchCache } from "@store/indexs/search-cache";

/**
 * Search
 */
function Search() {
  console.log("xxx");
  return (
    <div className="search-bash-container">
      <div className="search-bash-header-bar"></div>
      <div className="search-bash-content-box">
        <div className="search-bash-content-coded">
          {searchCache.valueArr.map((value) => {
            const key = performance.now() + "-" + Math.random();
            return (
              <div key={key}>
                <span className="search-bash-content-input-before">$</span>
                <span className="search-bash-content-code-content search-text">
                  {value}
                </span>
                {/* <p className="search-text">{"searchResult"}</p> */}
              </div>
            );
          })}
        </div>
        <APieceofCode />
      </div>
    </div>
  );
}
const obSearch = memo(observer(Search));

/**
 * content
 */
const APieceofCode = observer(() => {
  const codeInput = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("");

  const toSearch = (value: string) => {
    indexsService.filterSiteDate({
      nameKeywords: value.replace(/ +/g, " ").split(" "),
      tagNames: [],
    });
  };

  // const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setValue(e.target.value);
  // };
  const onChange = (e: React.FormEvent<HTMLDivElement>) => {
    console.log(`这是个啥 ==>  e`, e);
    if (!codeInput.current) return;

    const matchEnter = codeInput.current.innerText.match(/(.)*\n|\r/);

    if (matchEnter) {
      searchCache.valueArrPush(codeInput.current.innerText);
      codeInput.current.innerText = "";
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const elCoded = document.getElementsByClassName(
        "search-bash-content-coded"
      )[0];

      toSearch(value);
      let searchResult = ``;

      const searchnames = indexsStore.items.map((item) => item.name);

      if (searchnames.length) {
        searchResult = searchnames.join("\t");
      }

      elCoded.innerHTML += `
      <div>
        <span class="search-bash-content-input-before">$</span>
        <span class="search-bash-content-code-content search-text">${value}</span>
        <p class="search-text">${searchResult}</p>
      </div>
      `;
      setValue("");
    }
  };

  return (
    <div className="search-bash-content-coding">
      <span className="search-bash-content-input-before">$</span>

      {/* <textarea
        name="search-bash-input"
        className="search-bash-input search-text"
        autoFocus
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e)}
        onKeyPress={(e) => onKeyPress(e)}
      ></textarea> */}

      <div
        ref={codeInput}
        onInput={(e) => onChange(e)}
        // onFocus={(e) => {}}
        // onBlur={(e) => {}}
        className="search-bash-input search-text"
        contentEditable="plaintext-only"
      ></div>
    </div>
  );
});

export { obSearch as SearchBash };

{
  /* <div
  ref={searchInput}
  onChange={(e) => {
    console.log(e);
  }}
  onFocus={(e) => {
    inputListener(e);
  }}
  onBlur={(e) => {
    e.target.removeEventListener("input", (e) =>
      deelwithInputListener(e as InputEvent)
    );
  }}
  className="search-bash-input"
  contentEditable="plaintext-only"
></div> */
}
