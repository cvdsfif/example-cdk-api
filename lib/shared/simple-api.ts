import { apiS, bigintS, objectS, InferTargetFromSchema } from "typizator"

export const pairOfNumbersS = objectS({
    a: bigintS.notNull,
    b: bigintS.notNull
}).notNull
export type PairOfNumbers = InferTargetFromSchema<typeof pairOfNumbersS>

export const simpleApiS = apiS({
    add: { args: [pairOfNumbersS], retVal: bigintS.notNull },
    multiply: { args: [bigintS.notNull, bigintS.notNull], retVal: bigintS.notNull }
})