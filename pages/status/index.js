import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <hr />
      <Database />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString();
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function Database() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let versionText = "Carregando...";
  let maxConnectionsText = "Carregando...";
  let usedConnectionsText = "Carregando...";

  if (!isLoading && data) {
    versionText = data.dependencies.database.version;
    maxConnectionsText = data.dependencies.database.max_connections;
    usedConnectionsText = data.dependencies.database.opened_connection;
  }
  return (
    <div>
      <h3>Banco de dados:</h3>
      <ul>
        <li>Versão: {versionText}</li>
        <li>Conexões máximas: {maxConnectionsText}</li>
        <li>Conexões abertas: {usedConnectionsText}</li>
      </ul>
    </div>
  );
}
