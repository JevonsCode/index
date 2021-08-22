import { IIndexsContent } from "@store/indexs/types";

export interface IndexsContent_WithTagConst_origin extends IIndexsContent {
  /**
   * @todo and run yarn tag-set : )
   */
  tags?: string[];
}

export const ORIGIN_SITE_COLLECTION: IndexsContent_WithTagConst_origin[] = [
  { name: "GitHub", link: "https://github.com/", tags: ["github", "code"] },
  {
    name: "CODEPEN",
    link: "https://codepen.io/",
    tags: ["style", "javascript"],
    description:
      "CodePen is a social development environment for front-end designers and developers. Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.",
  },
  {
    name: "bilibili",
    link: "https://www.bilibili.com/",
    icon: "https://www.bilibili.com/favicon.ico",
    tags: ["学习", "娱乐"],
    description: "哔哩哔哩(゜-゜)つロ干杯~-bilibili",
  },
  {
    name: "React Native",
    link: { en: "https://reactnative.dev/", cn: "https://reactnative.cn/" },
    tags: ["react", "react native"],
    description: "",
  },
  {
    name: "TensorFlow",
    link: "https://www.tensorflow.org/",
    tags: ["TensorFlow", "Ai"],
    description: "",
  },
  {
    name: "Stack Overflow",
    link: "https://stackoverflow.com/",
    tags: ["stack overflow"],
    description: "",
  },
  {
    name: "Gmail",
    link: "https://mail.google.com/",
    tags: ["mail", "google product"],
    description: "",
  },
  {
    name: "谷歌翻译",
    link: "https://translate.google.cn/",
    icon: "https://translate.google.cn/favicon.ico",
    tags: ["translate", "google product"],
    description: "",
  },
  {
    name: "百度翻译",
    link: "https://fanyi.baidu.com/",
    icon: "https://fanyi.baidu.com/favicon.ico",
    tags: ["translate", "baidu product"],
    description: "",
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/",
    tags: ["学习", "娱乐", "google product"],
    description: "",
  },
  {
    name: "Notion",
    link: "https://www.notion.so/",
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
    tags: ["design", "color"],
    description: "",
  },
  {
    name: "Color Hunt",
    link: "https://colorhunt.co/",
    tags: ["design", "color"],
    description: "",
  },
  {
    name: "谷歌文档",
    link: "https://docs.google.com/",
    tags: ["google product"],
    description: "",
  },
  {
    name: "JSFuck",
    link: "http://www.jsfuck.com/",
    tags: [""],
    description: "",
  },
  {
    name: "腾讯云",
    link: "https://cloud.tencent.com/",
    icon: "https://cloud.tencent.com/favicon.ico",
    tags: ["cloud service"],
    description: "",
  },
  {
    name: "阿里云",
    link: "https://www.aliyun.com/",
    icon: "https://www.aliyun.com/favicon.ico",
    tags: ["cloud service"],
    description: "",
  },
  {
    name: "微信公众平台",
    link: "https://mp.weixin.qq.com/",
    icon: "https://mp.weixin.qq.com/favicon.ico",
    tags: ["小程序"],
    description: "",
  },
];
