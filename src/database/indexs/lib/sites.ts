import { IIndexsContent } from "@store/indexs/types";

export interface IndexsContent_WithTagConst_origin extends IIndexsContent {
  /**
   * @todo and run yarn tag-set
   */
  tags?: string[];
}

/**
 * 网站数据 Array
 */
export const ORIGIN_SITE_COLLECTION: IndexsContent_WithTagConst_origin[] = [
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
    tags: ["react", "style", "react native"],
    description: "",
  },
];
