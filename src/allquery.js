import * as _ from 'underscore';
import db from './db.js';
import msg from './msgcode.js';
const insertQuery = `INSERT INTO persons (pid, pname) VALUES ($1, $2) RETURNING cid;`;
const updateQuery = `UPDATE persons SET pid = $2, pname = $3 WHERE cid = $1 RETURNING *;`;

const create = async ({pid,pname}) => {
    const result = await db.query(insertQuery, [pid, pname]);
    if(result && _.isArray(result.rows) && result.rows.length > 0){
        const rowDataList = await db.query(`SELECT * FROM persons;`);
        return  { code: msg.msgCode.record_save_success_200,  message: msg.responseMsg.record_save_success_200, data: rowDataList.rows};
    }
    else{
        return { code: msg.msgCode.record_save_fail_400,  message: msg.responseMsg.record_save_fail_400};
    }
}

const findAll = async () => {
    const rowDataList =  await db.query(`SELECT * FROM persons;`);
    return { code: msg.msgCode.record_save_success_200,  message: msg.responseMsg.record_save_success_200, data: rowDataList.rows};
}

const updateOne = async (id, { pid, pname }) => {
    const result = await db.query(updateQuery, [+id, pid, pname]);
    if(result && _.isArray(result.rows) && result.rows.length > 0){
            const rowDataList = await db.query(`SELECT * FROM persons;`);
            return  { code: msg.msgCode.record_save_success_200,  message: msg.responseMsg.record_save_success_200, data: rowDataList.rows};
        }
        else{
            return { code: msg.msgCode.record_save_fail_400,  message: msg.responseMsg.record_save_fail_400};
        }
}

export default {
    create,
    findAll,
    updateOne
}