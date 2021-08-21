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
    tags: ["github", "code"],
  },
  {
    name: "CODEPEN",
    link: "https://codepen.io/",
    icon: "",
    tags: ["style", "javascript"],
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
    name: "React Native",
    link: {
      en: "https://reactnative.dev/",
      cn: "https://reactnative.cn/",
    },
    icon: "",
    tags: ["react", "react native"],
    description: "",
  },
  {
    name: "TensorFlow",
    link: "https://www.tensorflow.org/",
    icon: "",
    tags: ["TensorFlow", "Ai"],
    description: "",
  },
  {
    name: "Stack Overflow",
    link: "https://stackoverflow.com/",
    icon: "",
    tags: ["stack overflow"],
    description: "",
  },
  {
    name: "Gmail",
    link: "https://mail.google.com/",
    icon: "",
    tags: ["mail", "google product"],
    description: "",
  },
  {
    name: "谷歌翻译",
    link: "https://translate.google.cn/",
    icon: "",
    tags: ["translate", "google product"],
    description: "",
  },
  {
    name: "百度翻译",
    link: "https://fanyi.baidu.com/",
    icon: "",
    tags: ["translate", "baidu product"],
    description: "",
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/",
    icon: "",
    tags: ["学习", "娱乐", "google product"],
    description: "",
  },
  {
    name: "Notion",
    link: "https://www.notion.so/",
    icon: "",
    tags: ["note", "record"],
    description: "",
  },
  {
    name: "inspect",
    link: "chrome://inspect/",
    icon: "",
    tags: ["chrome tool"],
    description: "",
  },
  {
    name: "中国色",
    link: "http://zhongguose.com/",
    icon: "",
    tags: ["design", "color"],
    description: "",
  },
  {
    name: "Color Hunt",
    link: "https://colorhunt.co/",
    icon: "",
    tags: ["design", "color"],
    description: "",
  },
  {
    name: "谷歌文档",
    link: "https://docs.google.com/",
    icon: "",
    tags: ["google product"],
    description: "",
  },
  {
    name: "JSFuck",
    link: "http://www.jsfuck.com/",
    icon: "",
    tags: [""],
    description: "",
  },
  {
    name: "腾讯云",
    link: "https://cloud.tencent.com/",
    icon: "",
    tags: ["cloud service"],
    description: "",
  },
  {
    name: "阿里云",
    link: "https://www.aliyun.com/",
    icon: "",
    tags: ["cloud service"],
    description: "",
  },
  {
    name: "微信公众平台",
    link: "https://mp.weixin.qq.com/",
    icon: "",
    tags: ["小程序"],
    description: "",
  },
];
