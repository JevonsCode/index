/**
 * Tag 数据 Map
 */
export const TAG_COLLECTION = {
  react: {
    icon: "",
    mainColor: "",
  },
  学习: {
    icon: "",
    mainColor: "",
  },
  style: {
    icon: "",
    mainColor: "",
  },
  娱乐: {
    icon: "",
    mainColor: "",
  },
};

function object_keys<T extends { [p: string]: unknown }>(o: T): (keyof T)[] {
  return Object.keys(o);
}

export const TAG_TYPE_LIST = object_keys(TAG_COLLECTION);

/**
 * 获取数组中的值
 *
 * as const
 */
type GETTYPE<T> = T extends (infer P)[] ? P : never;

export type tag_type = GETTYPE<typeof TAG_TYPE_LIST>;
