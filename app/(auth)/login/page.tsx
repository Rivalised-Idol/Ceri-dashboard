//app\admin-dashboard\login\page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  // 🧠 Check if user is already authenticated
  const session = await getServerSession(authOptions);

  if (session) {
    // ✅ Redirect logged-in user to dashboard
    return redirect("/");
  }

  // 🟩 Render the login form for unauthenticated users
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <LoginForm />
    </div>
  );
}
