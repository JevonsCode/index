import React, { useEffect, memo, useState, useMemo } from "react";
import { IndexsContent_WithTagConst } from "@database/indexs/site.collection";
import "./styles/cards.less";
import { throttle } from "@assets/utils";
import { observer } from "mobx-react-lite";
import { indexsStore } from "@store";

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
  const site_sorted = indexsStore.items;
  return <FlexContainer content={site_sorted}></FlexContainer>;
}
const obCards = observer(Cards);
export { obCards as Cards };

/**
 * flex 布局瀑布流 container
 * @param props list
 * @returns
 */
const FlexContainer = (props: { content: IndexsContent_WithTagConst[] }) => {
  const { content } = props;

  const [columns, setColumns] = useState(1);
  const [columnList, setColumnList] = useState<IndexsContent_WithTagConst[][]>([
    [],
  ]);

  useEffect(() => {
    const column_list: IndexsContent_WithTagConst[][] = new Array(columns)
      .fill(null)
      .map(() => {
        return [];
      });

    let group_length_index = 0;
    let all_cards_index = 0;
    while (columns && all_cards_index < content.length) {
      while (group_length_index < columns) {
        content[all_cards_index] &&
          column_list[group_length_index].push(content[all_cards_index]);

        all_cards_index++;
        group_length_index++;
      }

      group_length_index = 0;
    }

    setColumnList(column_list);
  }, [columns]);

  /**
   * 当网页宽度变动时计算分组
   *
   * TODO: 如果是手机模式就一直是 1 不用改变&监听
   */
  const reset = (stop?: boolean) => {
    const cardBoxWidth =
      document.getElementsByClassName("card-box-index")?.[0]?.clientWidth;

    if (!cardBoxWidth) {
      !stop &&
        setTimeout(() => {
          reset(true);
        }, 100);
      return;
    }

    const columnCount = Math.floor(
      (window.innerWidth - 20 - 560) / (cardBoxWidth + 20)
    );

    setColumns(columnCount > 0 ? columnCount : 1);
  };

  const debounce_reset = throttle(reset);

  useEffect(() => {
    debounce_reset();
    window.addEventListener("resize", debounce_reset);

    return () => {
      window.removeEventListener("resize", debounce_reset);
    };
  }, []);

  return (
    <div className={"cards-container"}>
      {useMemo(() => {
        return columnList.map((column, index) => {
          return (
            <div
              key={
                "group-" +
                index +
                (column[0]?.name + column[column.length - 1]?.name).toString()
              }
            >
              {column.map((card) => (
                <CardBox key={card.name} cardInfo={card} />
              ))}
            </div>
          );
        });
      }, [columnList])}
    </div>
  );
};

const CardBox = (props: { cardInfo: IndexsContent_WithTagConst }) => {
  const { cardInfo } = props;

  return (
    <div key={cardInfo.name} className={"card-box-index"}>
      <React.Suspense fallback={null}>
        <Card {...cardInfo}></Card>
      </React.Suspense>
    </div>
  );
};
