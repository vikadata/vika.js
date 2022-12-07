import { APITable, IAPITableClientConfig } from "apitable";

class Vika extends APITable {
  constructor(config: IAPITableClientConfig) {
    console.log(config);
    if (config.host === null || config.host === undefined) {
      config.host = "https://api.vika.cn/fusion/v1";
    }
    console.log(config);
    super(config);
  }
}

export { Vika };
