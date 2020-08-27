import env from 'dotenv';
import { Vika } from '../lib';
env.config();

describe('Vika init', () => {
  it('list records', async () => {
    const vika = new Vika({
      token: process.env.VIKA_API_TOKEN as string,
      host: 'https://integration.vika.ltd/fusion/v1',
    });
    try {
      const all = await vika.datasheet('dst5YcMPJj9Xbl99xZ').select().all();
      console.log(all.length);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  });

  it('create records', async () => {
    //
  });
});
