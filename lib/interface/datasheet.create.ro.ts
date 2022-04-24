import { DatasheetFieldCreateRo } from "./datasheet.field.create.ro";

export interface DatasheetCreateRo {
  
    /**
     * 表格名称
     */
    name: string;
  
    /**
     * 表格描述，仅支持纯文本
     */
    description?: string;
  
    /**
     * 文件夹ID，如不填则为工作目录下
     */
    folderId?: string;
  
    /**
     * 前一个节点ID，如不填则为首位
     */
    preNodeId?: string;
  
    /**
     * 需要创建的字段列表
     */
    fields?: DatasheetFieldCreateRo[];

}