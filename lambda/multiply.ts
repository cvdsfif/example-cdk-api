// lambda/multiply.ts

import { handlerImpl } from "typizator-handler"
import { simpleApiS } from "../lib/shared/simple-api"

export const multiplyImpl = async (a: bigint, b: bigint) => a * b

export const multiply = handlerImpl(
    simpleApiS.metadata.implementation.multiply,
    multiplyImpl
)
