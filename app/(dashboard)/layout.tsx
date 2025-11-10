// app/(dashboard)/layout.tsx
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/components/common/Sidebar"; // adjust if Sidebar path differs

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 🧠 Server-side authentication check
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-svh flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}
