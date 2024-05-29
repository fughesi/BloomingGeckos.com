export const debounce = (func, fuse = 1000) => {
  let delay;

  return function (...args) {
    if (delay) {
      clearTimeout(delay);
    }

    delay = setTimeout(() => {
      func(...args);
    }, fuse);
  };
};
