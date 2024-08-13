import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dabaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = dabaseVersionResult.rows[0].server_version;

  const databaseMaxConenectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConenectionsValue =
    databaseMaxConenectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConenectionsValue),
        opened_connection: databaseOpenedConnectionValue,
      },
    },
  });
}

export default status;
