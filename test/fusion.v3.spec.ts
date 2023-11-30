import {IDatasheetCreateRo, INodeItem, IRecord, Vika} from "../lib";
import {Buffer} from "buffer";
import fs from "fs";
import path from "path";
import {IAddOpenSingleTextFieldProperty} from "../lib/interface/field.create.property";
import {IDatasheetFieldCreateRo} from "../lib/interface/datasheet.field.create.ro";
import {EmbedLinkTheme, PermissionType} from "../lib/interface/embed.link";

jest.setTimeout(300000);
describe('full pipeline', () => {
    const host = `https://integration.vika.ltd/fusion/v1`;
    const token = 'uskM9c6MzfkHMeCJVipM1zv';
    const datasheetId = 'dstVrj2y9AMx1YJ5Jy';
    const folderId = process.env.FOLDER_ID as string;
    const spaceId = process.env.SPACE_ID as string;
    const viewId = process.env.VIEW_ID as string;

    const apitable = new Vika({
        token,
        host,
    });

    const datasheet = apitable.datasheet(datasheetId);

    let records: IRecord[];
    let spaceIds: string[];
    let nodes: INodeItem[];
    let createdDatasheetId: string;
    let createdFieldId: string;

    it('get records', async () => {
        const allRecords = await datasheet.records.query({
            isV3: true
        });
        const allRecords2 = await datasheet.records.query();
        console.log(' see result', allRecords);
        console.log(' see result2', allRecords2);
    });

});