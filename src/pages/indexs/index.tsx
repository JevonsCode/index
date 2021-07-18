import React from "react";
import { Cards } from "./cards";
import { FunctionsArea } from "./functions-area";
import "./styles/indexs.less";

function Indexs() {
  return (
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
  );
}

export default Indexs;
