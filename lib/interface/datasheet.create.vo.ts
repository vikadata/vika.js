import { IDatasheetFieldCreateVo } from "./datasheet.field.create.vo";

export interface IDatasheetCreateVo {

    /**
     * 字段ID
     */
    id: string;
    /**
     * 表格名称
     */
    name: string;

    /**
     * 需要创建的字段列表
     */
    fields?: IDatasheetFieldCreateVo[];

}