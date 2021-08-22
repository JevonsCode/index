import * as https from "https";
import * as http from "http";
import * as fs from "fs";

class Query {
  async getImage(
    option: unknown,
    imgName = "",
    method: "https" | "http" = "https"
  ): Promise<http.IncomingMessage> {
    return await new Promise((resolve, reject) => {
      let imgdata = "";
      const req = (method === "https" ? https : http).get(option, (res) => {
        resolve(res);
      });

      req.on("data", (v) => {
        // process.stdout.write(d);

        imgdata += v;
      });

      req.on("error", async (error) => {
        reject(error);
      });

      req.end(() => {
        const path = __dirname + "../../src/source/images/" + imgName;
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
