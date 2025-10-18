// import "./globals.css";
// import type { Metadata } from "next";
// import Sidebar from "./components/Sidebar";

// export const metadata: Metadata = {
//   title: "CeriVPN Admin",
//   description: "Admin panel for CeriVPN",
// };

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   return (
//     <html lang="en">
//       <body className="bg-slate-950 text-slate-100 antialiased">
//         <div className="min-h-svh flex">
//           <Sidebar />
//           <main className="flex-1 p-6 lg:p-8">{children}</main>
//         </div>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import type { Metadata } from "next";
import AppShell from "./AppShell";

export const metadata: Metadata = {
  title: "CeriVPN Admin",
  description: "Admin panel for CeriVPN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
