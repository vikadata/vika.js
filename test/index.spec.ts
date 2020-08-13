import { Vika } from '../lib';

describe('Vika init', () => {
  it('hello world', () => {
    const vika = new Vika();
    expect(vika.init()).toEqual('vika init!');
  });
});
