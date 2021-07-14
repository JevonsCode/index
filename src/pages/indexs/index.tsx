import React from "react";
import { Cards } from "./cards";

function Indexs() {
  return (
    <div
      onClick={() => {
        console.log("APP");
      }}
      style={{
        padding: 40,
      }}
    >
      <div>INDEXS</div>
      <br />
      <Cards />
    </div>
  );
}

export default Indexs;
