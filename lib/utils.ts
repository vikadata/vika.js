export const wait = (timeout: number) => {
  console.log('waiting: ', timeout, 'ms');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};
