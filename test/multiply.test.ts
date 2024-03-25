// test/multiply.test.ts

import { multiplyImpl } from "../lambda/multiply"

test("Should add two numbers", async () => {
    expect(await multiplyImpl(6n, 7n)).toEqual(42n)
})