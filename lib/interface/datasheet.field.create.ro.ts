import { IAddOpenFieldProperty } from "./field.create.property";

export interface DatasheetFieldCreateRo {

    /**
     * 字段名称
     */
    name: string;

    /**
     * 字段类型，参照FieldType的枚举值
     */
    type: string;

    /**
     * 字段配置
     */
    property?: IAddOpenFieldProperty | null;

}