import React, { useEffect, useState } from "react";
import { SITE_COLLECTION } from "@database/indexs/site.collection";
import "./styles/cards.less";
import { throttle } from "@assets/utils";
const Card = React.lazy(() => import("@components/card"));

/**
 * 卡列表集合
 * ---
 * - 排序
 * - 瀑布流
 * - 分组
 * @returns
 */
function Cards() {
  // TODO: 排序的方法写出去
  const site_sorted = SITE_COLLECTION;
  return (
    <Container>
      {site_sorted.map((cardInfo) => {
        return (
          <div key={cardInfo.name} className={"card-box-index"}>
            <React.Suspense fallback={null}>
              <Card {...cardInfo}></Card>
            </React.Suspense>
          </div>
        );
      })}
    </Container>
  );
}

const Container: React.FC = ({ children }) => {
  const [columns, setColumns] = useState(1);

  const reset = () => {
    const cardBoxWidth = 340;
    // document.getElementsByClassName("card-box-index")?.[0]?.clientWidth;

    if (!cardBoxWidth) return;

    const columnCount = Math.floor((window.innerWidth - 20) / cardBoxWidth);

    setColumns(columnCount);
  };

  const debounce_reset = throttle(reset);
  debounce_reset();

  useEffect(() => {
    window.addEventListener("resize", debounce_reset);

    return () => {
      window.removeEventListener("resize", debounce_reset);
    };
  }, []);

  return (
    <div
      className={"cards-container"}
      style={{
        columns: columns,
      }}
    >
      {children}
    </div>
  );
};

export { Cards };
