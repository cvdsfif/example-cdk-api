import { PostgreSqlContainer } from "@testcontainers/postgresql"
import { MigrationResultFailure, MigrationResultSuccess, PostgresListMigrationProcessor } from "cdk-typescript-lib"
import { Client } from "pg"
import { DatabaseConnection, connectDatabase } from "typizator-handler"
import { migrations } from "../../lambda/migration"
import { extendExpectWithToContainTable } from "typizator-test"

export type ConnectionSetup = {
    connection?: DatabaseConnection
}

export const setupTestConnection = () => {
    extendExpectWithToContainTable()
    jest.setTimeout(60000)

    const setup = {} as ConnectionSetup

    const isMigrationResultFailure = (
        arg: MigrationResultSuccess | MigrationResultFailure
    ): arg is MigrationResultFailure => !((arg as MigrationResultFailure).successful)

    beforeAll(async () => {
        const container = await new PostgreSqlContainer().withReuse().start()
        const client = new Client({ connectionString: container.getConnectionUri() })
        await client.connect()
        setup.connection = connectDatabase(client)
        const migration = new PostgresListMigrationProcessor(migrations)
        await migration.initialize(setup.connection)
        const migrationResult = await migration.migrate(setup.connection)
        if (isMigrationResultFailure(migrationResult))
            throw new Error(`Migration failed: ${migrationResult.errorMessage}`)
    })

    afterAll(async () => await setup.connection!.client.end())

    return setup
}