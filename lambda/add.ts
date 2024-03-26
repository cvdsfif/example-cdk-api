// lambda/add.ts

import { HandlerProps, connectedHandlerImpl } from "typizator-handler"
import { PairOfNumbers, simpleApiS } from "../lib/shared/simple-api"
import { ADD_LOG_TABLE, logRecordS } from "../lib/log-record"

export const addImpl = async (props: HandlerProps, arg: PairOfNumbers) => {
    const result = arg.a + arg.b
    props.db!.multiInsert(
        logRecordS,
        ADD_LOG_TABLE,
        [{ firstArgument: arg.a, secondArgument: arg.b, result }],
        {
            eventTs: { action: "NOW" }
        }
    )
    return result
}

export const add = connectedHandlerImpl(
    simpleApiS.metadata.implementation.add,
    addImpl
)
