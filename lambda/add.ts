// lambda/add.ts

import { handlerImpl } from "typizator-handler"
import { PairOfNumbers, simpleApiS } from "../lib/shared/simple-api"

export const addImpl = async (arg: PairOfNumbers) => arg.a + arg.b

export const add = handlerImpl(
    simpleApiS.metadata.implementation.add,
    addImpl
)
