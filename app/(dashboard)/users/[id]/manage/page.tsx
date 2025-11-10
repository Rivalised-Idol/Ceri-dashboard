// app/users/[id]/manage/page.tsx
import { fetchUserMetadata } from "@/lib/users/fetchUserMetadata";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, notFound } from "next/navigation";
import ManageUserForm from "@/components/users/ManageUserForm";
import type { UserMetadata } from "@/types/users";

interface ManageUserPageProps {
  params: { id: string };
}

export default async function ManageUserPage({ params }: ManageUserPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;

  try {
    const user: UserMetadata = await fetchUserMetadata(id);
    if (!user) notFound();

    return (
      <div className="max-w-2xl mx-auto mt-10">
        <ManageUserForm user={user} />
      </div>
    );
  } catch (error) {
    console.error("❌ Failed to load user metadata:", error);
    notFound();
  }
}
