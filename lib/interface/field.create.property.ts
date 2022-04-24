import { APIMetaFieldPropertyFormatEnums, RollUpFuncType, TSymbolAlign } from "../enums";
import { IFormat } from "./field.property";

export interface IOpenSingleTextFieldProperty {
    defaultValue?: string;
}

export interface IOpenNumberFieldProperty {
    defaultValue?: string;
    precision: number;
    symbol?: string;
}

export interface IOpenCheckboxFieldProperty {
    icon: string;
}

export interface IOpenRatingFieldProperty {
    /** 最大值 1 - 10 */
    max: number;
    /** Emoji slug */
    icon: string;
}

export interface IOpenPercentFieldProperty {
    /** 新增记录默认值 */
    defaultValue?: string;
    /** 保留小数位 */
    precision: number;
}

export interface IOpenCurrencyFieldProperty {
    /** 新增记录默认值 */
    defaultValue?: string;
    /** 单位 */
    symbol: string;
    /** 保留小数位 */
    precision: number;
    /** 单位对齐方式 */
    symbolAlign?: TSymbolAlign;
}

export type IMultiSelectedIds = string[];

export interface IWriteOpenSelectBaseFieldProperty {
    defaultValue?: string | IMultiSelectedIds;
    /** 选项配置 */
    options: {
        id?: string;
        name: string;
        /** color name */
        color?: string;
    }[]
}

export interface IOpenDateTimeFieldProperty {
    /** 日期格式 */
    dateFormat: string;
    /** 时间格式 */
    timeFormat?: string;
    /** 新增记录时是否自动填入创建时间 */
    autoFill?: boolean;
    /** 是否包含时间 */
    includeTime?: boolean;
}

export type IAddOpenTextFieldProperty = null;

export type IAddOpenURLFieldProperty = null;

export type IAddOpenEmailFieldProperty = null;

export type IAddOpenPhoneFieldProperty = null;

export type IAddOpenSingleTextFieldProperty = IOpenSingleTextFieldProperty;

export type IAddOpenNumberFieldProperty = IOpenNumberFieldProperty;

export type IAddOpenCheckboxFieldProperty = IOpenCheckboxFieldProperty;

export type IAddOpenRatingFieldProperty = IOpenRatingFieldProperty;

export type IAddOpenPercentFieldProperty = IOpenPercentFieldProperty;

export type IAddOpenCurrencyFieldProperty = IOpenCurrencyFieldProperty;

export type IAddOpenSingleSelectFieldProperty = IWriteOpenSelectBaseFieldProperty;

export type IAddOpenMultiSelectFieldProperty = IWriteOpenSelectBaseFieldProperty;

export interface IAddOpenMemberFieldProperty {
    /* 是否允许添加多个成员 **/
    isMulti?: boolean;
    /** 是否发送通知 */
    shouldSendMsg?: boolean;
}

export type IAddOpenDateTimeFieldProperty = IOpenDateTimeFieldProperty;

export type IAddOpenAttachmentFieldProperty = null;

export interface IAddOpenMagicLinkFieldProperty {
    /** 关联表ID，切换关联表，之前的brotherField会转成文本字段 */
    foreignDatasheetId: string;
    /** 指定视图 ID 筛选记录 */
    limitToViewId?: string;
    /** 是否限制只能选择单条记录 */
    limitSingleRecord?: boolean;
}

export interface IOpenComputedFormat {
    type: APIMetaFieldPropertyFormatEnums;
    format: IFormat
}

export interface IAddOpenMagicLookUpFieldProperty {
    /** 引用的当前表的关联字段 ID */
    relatedLinkFieldId: string;
    /** 关联表中查询的字段 ID */
    targetFieldId: string;
    /** 汇总函数 */
    rollupFunction?: RollUpFuncType;
    /** 格式，由于引用字段有区别，格式也不一样（数字、百分比、日期、货币） */
    format?: IOpenComputedFormat;
}

export interface IAddOpenFormulaFieldProperty {
    /** 公式表达式 */
    expression?: string;
    /** 当公式依赖的相关字段被删除或者转化类型时，可能无法正常获取计算值 */
    format?: IOpenComputedFormat;
}

export type IAddOpenAutoNumberFieldProperty = null;

export type IOpenCreatedTimeFieldProperty = Omit<IOpenDateTimeFieldProperty, 'autoFill'>;

export type IAddOpenCreatedTimeFieldProperty = IOpenCreatedTimeFieldProperty;

export enum CollectType {
    // 所有字段
    AllFields,
    // 指定字段
    SpecifiedFields,
}

export interface IAddOpenLastModifiedTimeFieldProperty {
    /** 日期格式 */
    dateFormat: string;
    /** 时间格式 */
    timeFormat?: string;
    /** 是否包含时间 */
    includeTime?: boolean;
    /** 指定字段类型：0 所有可编辑，1 指定字段 */
    collectType?: CollectType;
    /** 是否指定字段，数组类型可指定多个字段，不填为所有 */
    fieldIdCollection?: string[];
}

export type IAddOpenCreatedByFieldProperty = null;

export interface IAddOpenLastModifiedByFieldProperty {
    /** 指定字段类型：0 所有可编辑，1 指定字段 */
    collectType?: CollectType;
    /** 是否指定字段，数组类型可指定多个字段，不填为所有 */
    fieldIdCollection?: string[];
}

export type IAddOpenFieldProperty = IAddOpenTextFieldProperty
    | IAddOpenURLFieldProperty
    | IAddOpenEmailFieldProperty
    | IAddOpenPhoneFieldProperty
    | IAddOpenSingleTextFieldProperty
    | IAddOpenNumberFieldProperty
    | IAddOpenCheckboxFieldProperty
    | IAddOpenRatingFieldProperty
    | IAddOpenPercentFieldProperty
    | IAddOpenCurrencyFieldProperty
    | IAddOpenSingleSelectFieldProperty
    | IAddOpenMultiSelectFieldProperty
    | IAddOpenMemberFieldProperty
    | IAddOpenDateTimeFieldProperty
    | IAddOpenAttachmentFieldProperty
    | IAddOpenMagicLinkFieldProperty
    | IAddOpenMagicLookUpFieldProperty
    | IAddOpenFormulaFieldProperty
    | IAddOpenAutoNumberFieldProperty
    | IAddOpenCreatedTimeFieldProperty
    | IAddOpenLastModifiedTimeFieldProperty
    | IAddOpenCreatedByFieldProperty
    | IAddOpenLastModifiedByFieldProperty;
