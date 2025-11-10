"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Gauge,
  UserRound,
  Server,
  Book,
  Settings,
  Menu,
  Receipt,
  Cherry,
  LogOut,
} from "lucide-react"; // ✅ Icons based on your request

const items = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/users", label: "Users", icon: UserRound },
  { href: "/servers", label: "Servers", icon: Server },
  { href: "/orders", label: "Orders", icon: Receipt },
  { href: "/products", label: "Products", icon: Cherry },
  { href: "/reports", label: "Reports", icon: Book },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-45"
      } shrink-0 bg-slate-900 text-slate-100 sticky top-0 h-svh border-r border-slate-800 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800">
        {!collapsed && (
          <div>
            <div className="text-lg font-bold">CeriVPN Admin</div>
            <div className="text-xs text-slate-400">v1.0</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-slate-400 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-200 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:text-red-300 hover:bg-slate-800 transition-colors"
        >
          <LogOut size={20} className="rotate-180" /> {/* optional icon */}
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
