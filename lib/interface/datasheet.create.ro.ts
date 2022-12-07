import { IDatasheetFieldCreateRo } from "./datasheet.field.create.ro";

export interface IDatasheetCreateRo {
  
    /**
     * Datasheet Name.
     */
    name: string;
  
    /**
     * Datasheet description, plain text only.
     */
    description?: string;
  
    /**
     * Folder ID, if not filled in, it is under the working directory.
     */
    folderId?: string;
  
    /**
     * Previous node ID, or first if not filled in.
     */
    preNodeId?: string;
  
    /**
     * List of fields to be created.
     */
    fields?: IDatasheetFieldCreateRo[];

}