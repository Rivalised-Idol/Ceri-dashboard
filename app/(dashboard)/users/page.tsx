// app/users/page.tsx
import { fetchUsers } from "@/lib/users/fetchUsers";
import UsersTable from "@/components/users/UsersTable";

export default async function UsersPage() {
  const { users } = await fetchUsers(); // server-side call (secure)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <UsersTable initialUsers={users} />
    </div>
  );
}
