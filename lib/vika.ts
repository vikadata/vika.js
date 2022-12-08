import { APITable, IAPITableClientConfig } from "apitable";

class Vika extends APITable {
  constructor(config: IAPITableClientConfig) {
    if (config.host === null || config.host === undefined) {
      config.host = "https://api.vika.cn/fusion/v1";
    }
    super(config);
  }
}

export { Vika };
