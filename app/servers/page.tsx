
// app/servers/page.tsx
import { fetchServers } from "@/lib/servers/fetchServers";
import ServersTable from "@/components/servers/ServersTable";

export default async function ServersPage() {
  const servers = await fetchServers(); // 🧠 Secure server-side fetch

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Servers</h1>
      <ServersTable initialServers={servers} />
    </div>
  );
}

