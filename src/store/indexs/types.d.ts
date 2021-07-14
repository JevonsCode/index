/**
 * 索引模块独立的类型
 *
 * > 卡片类型应用
 */
declare interface IndexsContent {
  /**
   * 标题/名称
   */
  name: string;
  /**
   * 标签/标签组（TODO: 如果出现了标签 Map 中没有的字段，用脚本添加至 JSON 后面）
   */
  tags?: string | string[];
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
