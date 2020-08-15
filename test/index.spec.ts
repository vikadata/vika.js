import env from 'dotenv';
import { Vika } from '../lib';
env.config();

describe('Vika init', () => {
  it('hello world', async () => {
    const vika = new Vika({
      token: process.env.VIKA_API_TOKEN as string,
      host: 'http://192.168.50.5:3333/fusion/v1/',
    });
    const all = await vika.datasheet('dst5YcMPJj9Xbl99xZ').select().all();
    console.log(all);
    return true;
  });
});
