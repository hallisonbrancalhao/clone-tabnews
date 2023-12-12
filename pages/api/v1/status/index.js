import database from 'infra/database.js'

async function status(request, response) {
  const updatedAt = new Date().toISOString()
  const dabaseVersionResult = await database.query("SHOW server_version;")
  const databaseVersionValue = dabaseVersionResult.rows[0].server_version

  const databaseMaxConenectionsResult = await database.query("SHOW max_connections;")
  const databaseMaxConenectionsValue = databaseMaxConenectionsResult.rows[0].max_connections;

  response.status(200).json(
    {
      "updated_at": updatedAt,
      "dependencies": {
        "database": {
          "version": databaseVersionValue,
          "max_connections": parseInt(databaseMaxConenectionsValue)
        }
      }
    }
  )
}

export default status