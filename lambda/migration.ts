// lambda/migration.ts

import { migrationList, postgresListMigrationHandler } from "cdk-typescript-lib";
import { ADD_LOG_TABLE, MULTIPY_LOG_TABLE } from "../lib/log-record";

export const migrations = migrationList()
    .migration({
        order: 1,
        description: "Table storing the history of add operations on the API",
        query: `
            CREATE TABLE IF NOT EXISTS ${ADD_LOG_TABLE}(
                first_argument BIGINT NOT NULL,
                second_argument BIGINT NOT NULL,
                result BIGINT NOT NULL,
                event_ts TIMESTAMPTZ NOT NULL
            )`
    }).migration({
        order: 2,
        description: "Table storing the history of multiply operations on the API",
        query: `
            CREATE TABLE IF NOT EXISTS ${MULTIPY_LOG_TABLE}(
                first_argument BIGINT NOT NULL,
                second_argument BIGINT NOT NULL,
                result BIGINT NOT NULL,
                event_ts TIMESTAMPTZ NOT NULL
            )`
    })

export const migration = postgresListMigrationHandler(migrations)