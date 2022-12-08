import { IDatasheetFieldCreateVo } from "./datasheet.field.create.vo";

export interface IDatasheetCreateVo {

    /**
     * Field ID.
     */
    id: string;
    /**
     * Datasheet Name.
     */
    name: string;

    /**
     * List of fields to be created.
     */
    fields?: IDatasheetFieldCreateVo[];

}