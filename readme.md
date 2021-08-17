# INDEX

## Run

```bash
yarn && yarn dev
```

## What?

> - service 处理数据
> - store 存储数据（模仿 MongoDB mock schame，方便后续接入数据库)

- Site
  - 标签
  - 题目
  - 链接
  - 日期
  - 作者
  - 描述
- Site 搜索支持
  - 标签/分组归类
  - 题目/模糊搜索
  - 日期/时间排序&分组
  - 作者/分组

## Design

TODO:

- 视差背景

### Style

- color

  - 蓝色 #3aaae8
  - 黑色 rgba(41, 41, 41)

- font

  - ```html
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&display=swap"
      rel="stylesheet"
    />
    ```

  - ```html
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;700&display=swap"
      rel="stylesheet"
    />
    ```

### Contents

## TODO

- [ ] Search

  - [x] div 重新写一个编辑器
  - [x] innerHtml 写成 map react
  - [ ] help placehold 输入后取消
  - [ ] 光标样式
  - [ ] 滚动条
  - [ ] 拼音搜索
  - [ ] tag 搜索

- [ ] Tags

  - [ ] color design

- [ ] Cards

  - [ ] icon 读取 .ico
  - [ ] 读取网站颜色

- [ ] 整体的样式

  - [ ] 手机的匹配
  - [ ] 全部加载完成再加载功能区
  - [ ] LOADING

- [ ] 脚本

  - [ ] 检查 tag/site 命名是否重复
  - [ ] 预加载中文拼音
  - [ ] 预加载网站颜色/LOGO

- [ ] CODE

  - [ ] <del>整理完成 TAG 将对应的 TAG 存入 SITE MAP 做到同步更改 (Y/n)</del>
