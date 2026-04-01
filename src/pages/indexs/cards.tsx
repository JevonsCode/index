import React, { useLayoutEffect, useMemo, useState } from "react";
import "./styles/cards.less";
import { throttle } from "@assets/utils";
import { observer } from "mobx-react-lite";
import { indexsStore } from "@store";

const Card = React.lazy(() => import("@components/card"));

const CARD_WIDTH = 300;
const COLUMN_GAP = 20;
const FUNCTIONS_AREA_WIDTH = 560;
const PAGE_HORIZONTAL_OFFSET = 20;

/**
 * 卡列表集合
 * ---
 * - 排序
 * - 瀑布流
 * - 分组
 */
function Cards() {
  return <FlexContainer content={indexsStore.items.slice()} />;
}
const obCards = observer(Cards);
export { obCards as Cards };

/**
 * flex 布局瀑布流 container
 */
const FlexContainer = observer(
  (props: { content: typeof indexsStore.items }) => {
    const { content } = props;
    const [columns, setColumns] = useState(1);

    useLayoutEffect(() => {
      const calculateColumns = () => {
        const availableWidth =
          window.innerWidth - FUNCTIONS_AREA_WIDTH - PAGE_HORIZONTAL_OFFSET;

        const nextColumns = Math.max(
          1,
          Math.floor((availableWidth + COLUMN_GAP) / (CARD_WIDTH + COLUMN_GAP))
        );

        setColumns(nextColumns);
      };

      const handleResize = throttle(calculateColumns);

      calculateColumns();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const columnList = useMemo(() => {
      const grouped: typeof indexsStore.items[] = new Array(columns)
        .fill(null)
        .map(() => []);

      content.forEach((item, index) => {
        grouped[index % columns].push(item);
      });

      return grouped;
    }, [columns, content]);

    const containerWidth =
      columns * CARD_WIDTH + Math.max(columns - 1, 0) * COLUMN_GAP;

    return (
      <div className="cards-container" style={{ width: containerWidth }}>
        {content.length ? (
          columnList.map((column, index) => {
            return (
              <div
                key={
                  "group-" +
                  index +
                  (column[0]?.name ?? "") +
                  (column[column.length - 1]?.name ?? "")
                }
              >
                {column.map((card) => (
                  <CardBox key={card.name} cardInfo={card} />
                ))}
              </div>
            );
          })
        ) : (
          <CardContainerNothing />
        )}
      </div>
    );
  }
);

const CardBox = observer(
  (props: { cardInfo: typeof indexsStore.items[number] }) => {
    const { cardInfo } = props;

    return (
      <div className="card-box-index">
        <React.Suspense fallback={null}>
          <Card {...cardInfo} />
        </React.Suspense>
      </div>
    );
  }
);

const CardContainerNothing = () => {
  return <div style={{ color: "#db2" }}>什么都没有</div>;
};
