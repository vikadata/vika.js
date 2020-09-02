export const wait = async (timeout: number) => {
  console.log('waiting: ', timeout, 'ms');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};
