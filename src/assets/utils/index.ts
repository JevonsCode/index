export const debounce = (fn: (...args: unknown[]) => void, time = 300) => {
  let settingFn: NodeJS.Timeout;

  return () => {
    settingFn && clearTimeout(settingFn);
    settingFn = setTimeout(() => {
      fn?.();
    }, time);
  };
};

export const throttle = (fn: (...args: unknown[]) => void, time = 300) => {
  let settingFn: NodeJS.Timeout | null;

  return () => {
    if (settingFn) return;

    settingFn = setTimeout(() => {
      fn?.();
      settingFn && clearTimeout(settingFn);
      settingFn = null;
    }, time);
  };
};
