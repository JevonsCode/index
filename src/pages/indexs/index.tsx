import React, { useState, useEffect } from "react";
import { Cards } from "./cards";
import { FunctionsArea } from "./functions-area";
import { IndexsService } from "@service/indexs";
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
    new IndexsService();
    setLoading(false);
  }, []);

  return loading ? <Loading /> : <>{children}</>;
};

export default Indexs;
