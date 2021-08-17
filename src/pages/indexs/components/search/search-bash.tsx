import React, { useEffect, memo, useRef } from "react";
import { observer } from "mobx-react-lite";
import "./styles/search-bash.less";
import { indexsService } from "@service/indexs";
import { searchCache } from "@store";
import { matchSearch } from "./utils/search";

/**
 * Search
 */
function Search() {
  const focusCoding = () => {
    const el = document.getElementsByClassName("search-bash-input")[0] as
      | HTMLElement
      | undefined;

    el?.focus?.();
  };

  useEffect(() => {
    focusCoding();
  }, []);

  return (
    <div className="search-bash-container">
      <div className="search-bash-header-bar"></div>
      <div className="search-bash-content-box" onClick={focusCoding}>
        <div className="search-bash-content-coded">
          {searchCache.valueArr.map((value) => {
            const key = () => performance.now() + "-" + Math.random();
            return (
              <div key={key()}>
                <span className="search-bash-content-input-before">$</span>
                <span className="search-bash-content-code-content search-text limit-width">
                  {value.content}
                </span>
                {!value.result ? null : (
                  <p className="search-text limit-width">
                    {value.result.split("\n").map((v) => {
                      return (
                        <React.Fragment key={key()}>
                          <span>{v}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </p>
                )}
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

  const toSearch = (value: string) => {
    indexsService.filterSiteDate({
      nameKeywords: value.replace(/ +/g, " ").split(" "),
    });
  };

  const onChange = () => {
    if (!codeInput.current) return;

    const matchEnter = codeInput.current.innerText.match(/(.)*\n|\r/);

    if (matchEnter) {
      const innerText = codeInput.current.innerText.replace(/\n|\r/g, "");

      matchSearch(innerText, toSearch);

      codeInput.current.innerText = "";
    }
  };

  return (
    <div className="search-bash-content-coding">
      <span className="search-bash-content-input-before">$</span>
      <div
        ref={codeInput}
        onInput={onChange}
        className="search-bash-input search-text"
        contentEditable="plaintext-only"
        placeholder="help"
      ></div>
    </div>
  );
});

export { obSearch as SearchBash };
