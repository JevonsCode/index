import React, { useState, useEffect } from "react";
import { Cards } from "./cards";
import { FunctionsArea } from "./functions-area";
import { indexsService } from "@service/indexs";
import { indexsStore } from "@store/indexs";
import { observer } from "mobx-react-lite";
import "./styles/indexs.less";
import { Tag } from "@components/tag";

const Indexs = observer(() => {
  const ischoseTags = indexsStore.choseTags;

  return (
    <InitIndexs>
      <div
        onClick={() => {
          console.log("APP");
        }}
        className="indexs-page-container"
      >
        <div className="indexs-content-container">
          <div className="indexs-functions-area">
            <FunctionsArea />
          </div>
          <div className="indexs-cards">
            {!ischoseTags.length ? null : (
              <div
                className="indexs-ischose-tags"
                style={{
                  width:
                    document.getElementsByClassName("cards-container")[0]
                      .clientWidth - 6,
                }}
              >
                {ischoseTags.map((tag) => {
                  return (
                    <Tag
                      key={tag.name}
                      className="tag-item"
                      onClick={() => indexsService.onClickTag(tag)}
                      isChose={tag.isChose}
                    >
                      {tag.name}
                    </Tag>
                  );
                })}
              </div>
            )}
            <Cards />
          </div>
        </div>
      </div>
    </InitIndexs>
  );
});

const Loading: React.FC = () => {
  return <div>LOADING</div>;
};

const InitIndexs: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    indexsService.init();
    setLoading(false);
  }, []);

  return loading ? <Loading /> : <>{children}</>;
};

export default Indexs;
