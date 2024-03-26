// lambda/multiply.ts

import { HandlerProps, connectedHandlerImpl } from "typizator-handler"
import { simpleApiS } from "../lib/shared/simple-api"
import { MULTIPY_LOG_TABLE, logRecordS } from "../lib/log-record"

export const multiplyImpl = async (props: HandlerProps, a: bigint, b: bigint) => {
    const result = a * b
    props.db!.multiInsert(
        logRecordS,
        MULTIPY_LOG_TABLE,
        [{ firstArgument: a, secondArgument: b, result }],
        {
            eventTs: { action: "NOW" }
        }
    )
    return result
}

export const multiply = connectedHandlerImpl(
    simpleApiS.metadata.implementation.multiply,
    multiplyImpl
)
