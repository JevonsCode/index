/**
 * 索引模块独立的类型
 *
 * > 卡片类型应用
 */
export interface IIndexsContent {
  /**
   * 标题/名称
   */
  name: string;
  /**
   * 链接地址（TODO: 多个地址 hover 出现多个选项）
   */
  link: string | { [k: string]: string };
  /**
   * 时间戳（用于时间分组）
   */
  date?: string;
  /**
   * 作者或其他人物
   */
  author?: string | string[];
  /**
   * 描述
   */
  description?: string;
  /**
   * ICON（TODO: 有 Link 的情况下，如果没有 ICON 字段会自行尝试寻找）
   */
  icon?: string;
}

/**
 * 搜索的缓存类型
 */
export interface ISearchedCache {
  content: string;
  result?: string;
}

export interface ITagBase {
  /**
   * 扩展 icon
   */
  icon?: string;
  /**
   * 主色调
   */
  mainColor?: string;
}

/**
 * 用于展示的 Tag 类型
 */
export interface ITag extends ITagBase {
  name: string;
  isChose?: boolean;
}
