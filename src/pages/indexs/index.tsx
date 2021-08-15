import React, { useState, useEffect } from "react";
import { Cards } from "./cards";
import { FunctionsArea } from "./functions-area";
import { indexsService } from "@service/indexs";
import { indexsStore } from "@store/indexs";
import "./styles/indexs.less";

const Indexs: React.FC = () => {
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
            <div>tags: </div>
            {/* {indexsStore.choseTags.map((i) => i.name)} */}
            <Cards />
          </div>
        </div>
      </div>
    </InitIndexs>
  );
};

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
