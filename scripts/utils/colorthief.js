const https = require("https");
const fs = require("fs");
const url = "https://www.bilibili.com/favicon.ico";

function decode(str) {
  if (typeof Buffer.from === "function") {
    return Buffer.from(str, "base64").toString("utf8");
  } else {
    return new Buffer(str, "base64").toString("utf8");
  }
}

https.get(url, function (res) {
  let imgData = "";
  res.setEncoding("binary");
  res.on("data", function (chunk) {
    imgData += chunk;
  });

  res.on("end", function () {
    console.log(
      `这是个啥 ==>  ~ file: colorthief.js ~ line 10 ~ imgData`,
      // imgData.toString("utf8"),
      decode(imgData)
    );
    fs.writeFile("./image.png", imgData, "binary", function (err) {
      if (err) {
        console.log("down fail", err);
      }
      console.log("down success");
    });
  });
});

// const { getColorFromURL } = require("color-thief-node");
// const path = __dirname + "\\..\\..\\src\\source\\images\\site-favicon\\1.png";
// // const path = __dirname + "\\..\\..\\image.png";
// (async () => {
//   const dominantColor = await getColorFromURL(path);
//   console.log(
//     `这是个啥 ==>  ~ file: colorthief.js ~ line 7 ~ dominantColor`,
//     dominantColor
//   );
// })();
