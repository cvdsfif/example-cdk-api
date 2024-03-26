// lib/log-record.ts

import { bigintS, dateS, objectS } from "typizator";

export const ADD_LOG_TABLE = "add_log"
export const MULTIPY_LOG_TABLE = "multiply_log"

export const logRecordS = objectS({
    firstArgument: bigintS.notNull,
    secondArgument: bigintS.notNull,
    result: bigintS.notNull,
    eventTs: dateS.notNull
})