# Routebooks / 路书项目

这个目录用于托管可直接发布到 GitHub Pages 的旅行路书 HTML。

## 目录约定

```text
public/routebooks/
  index.html                # 路书首页，读取 manifest.json 展示列表
  manifest.json             # 路书索引
  <slug>/
    index.html              # 单份路书 HTML
    places.geojson          # 可选：地图坐标数据
```

## 新增一份路书

1. 新建目录：`public/routebooks/<slug>/`。
2. 把路书 HTML 放到：`public/routebooks/<slug>/index.html`。
3. 在 `public/routebooks/manifest.json` 里追加一条记录。
4. 推送到 `master`，仓库现有 GitHub Actions 会构建并发布到 `gh-pages`。

## URL 规则

- 路书首页：`/routebooks/`
- 单份路书：`/routebooks/<slug>/`

如果仓库以 project pages 方式访问，完整路径通常是：`https://jevonscode.github.io/index/routebooks/<slug>/`。
