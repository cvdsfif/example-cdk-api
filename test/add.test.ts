// test/add.test.ts

import { addImpl } from "../lambda/add"

test("Should add two numbers", async () => {
    expect(await addImpl({ a: 30n, b: 12n })).toEqual(42n)
})