export const delayFn = (delay = 1000) => {
  return new Promise((res) => setTimeout(res, delay));
};
