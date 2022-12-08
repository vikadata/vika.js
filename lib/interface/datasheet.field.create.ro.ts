import { IAddOpenFieldProperty } from "./field.create.property";

export interface IDatasheetFieldCreateRo {

    /**
     * Datasheet Name.
     */
    name: string;

    /**
     * Field type, refer to the enumeration value of FieldType.
     */
    type: string;

    /**
     * Field Configuration.
     */
    property?: IAddOpenFieldProperty | null;

}