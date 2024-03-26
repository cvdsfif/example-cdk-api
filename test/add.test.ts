// test/add.test.ts

import { addImpl } from "../lambda/add"
import { ADD_LOG_TABLE, logRecordS } from "../lib/log-record";
import { setupTestConnection } from "./lib/setup-test-connection";

describe("Testing an API implementation with database connection", () => {
    const setup = setupTestConnection()

    afterEach(async () => await setup.connection!.query(`DELETE FROM ${ADD_LOG_TABLE}`))

    test("Should add two numbers", async () => {
        // GIVEN a database connection set up

        // WHEN we execute the add operation
        await addImpl({ db: setup.connection! }, { a: 30n, b: 12n })

        // THEN this operation is logged in the database
        const records = await setup.connection!.select(logRecordS, ADD_LOG_TABLE)
        expect(records).toContainTable(logRecordS, `
            firstArgument   secondArgument  result
            30              12              42
        `)
    })
})
