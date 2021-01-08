export const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, timeout);
  });
};
