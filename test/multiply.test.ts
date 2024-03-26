// test/multiply.test.ts

import { multiplyImpl } from "../lambda/multiply";
import { MULTIPY_LOG_TABLE, logRecordS } from "../lib/log-record";
import { setupTestConnection } from "./lib/setup-test-connection";

describe("Testing an API implementation with database connection", () => {
    const setup = setupTestConnection()

    afterEach(async () => await setup.connection!.query(`DELETE FROM ${MULTIPY_LOG_TABLE}`))

    test("Should add two numbers", async () => {
        // GIVEN a database connection set up

        // WHEN we execute the add operation
        await multiplyImpl({ db: setup.connection! }, 6n, 7n)

        // THEN this operation is logged in the database
        const records = await setup.connection!.select(logRecordS, MULTIPY_LOG_TABLE)
        expect(records).toContainTable(logRecordS, `
            firstArgument   secondArgument  result
            6               7               42
        `)
    })
})
