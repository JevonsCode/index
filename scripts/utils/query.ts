import * as https from "https";
import * as http from "http";
import * as fs from "fs";

class Query {
  async getImage(
    _link: string,
    imgName = "",
    method: "https" | "http" = "https"
  ): Promise<http.IncomingMessage> {
    return await new Promise((resolve, reject) => {
      let imgdata = "";
      let link = _link;
      if (method === "http" && link.match(/^https:/)) {
        link = link.replace(/^https:/, "http:");
      }
      if (method === "https" && link.match(/^http:/)) {
        link = link.replace(/^http:/, "http:");
      }
      console.log("当前 link 为", link, method);
      const req = (method === "https" ? https.get : http.request)(
        link,
        (res) => {
          resolve(res);
        }
      );

      req.on("data", (v) => {
        // process.stdout.write(d);

        imgdata += v;
      });

      req.on("error", async (error) => {
        reject(error);
      });

      req.end(() => {
        const path = __dirname + "\\..\\..\\src\\source\\images\\" + imgName;
        fs.writeFile(path, imgdata, "binary", (err) => {
          if (err) {
            throw err;
          } else {
            // console.log("succeed!");
          }
        });
      });
    });
  }
}

export const query = new Query();
