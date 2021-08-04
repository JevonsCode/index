import { tag_type } from "./tag.collection";

/**
 * IndexsContent_WithTagConst
 * ---
 * tags as const
 */
export interface IndexsContent_WithTagConst extends IIndexsContent {
  tags?: tag_type[];
}

/**
 * 网站数据 Array
 */
export const SITE_COLLECTION: IndexsContent_WithTagConst[] = [
  {
    name: "GitHub",
    link: "https://github.com/",
    icon: "",
  },
  {
    name: "CODEPEN",
    link: "https://codepen.io/",
    icon: "",
    tags: ["style"],
    description:
      "CodePen is a social development environment for front-end designers and developers. Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.",
  },
  {
    name: "bilibili",
    link: "https://www.bilibili.com/",
    icon: "",
    tags: ["学习", "娱乐"],
    description: "哔哩哔哩(゜-゜)つロ干杯~-bilibili",
  },
  {
    name: "r n",
    link: "https://www.bilibili.com/",
    icon: "",
    tags: ["react", "style"],
    description: "",
  },

  ...(() => {
    return new Array(100).fill("").map((i, index) => {
      return {
        name: "bilibili" + index,
        link: "https://www.bilibili.com/",
        icon: "",
        tags: ["学习", "娱乐"],
        description:
          "哔哩哔哩(゜-゜)つロ干杯~-bilibili" +
          new Array(Math.floor(Math.random() * 20)).fill(
            "哔哩哔哩(゜-゜)つロ干杯~-bilibili"
          ),
      } as IndexsContent_WithTagConst;
    });
  })(),
];
