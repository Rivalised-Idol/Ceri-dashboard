// 'use client';

// import { usePathname } from 'next/navigation';
// import Sidebar from './components/Sidebar';

// export default function AppShell({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   // Hide the global chrome on these routes
//   const hideChrome =
//     pathname === '/login' ||
//     pathname?.startsWith('/auth') ||
//     pathname === '/_error'; // optional

//   return (
//     <div className="min-h-screen bg-slate-900 text-white">
//       {!hideChrome && <Sidebar />}
//       <main className={hideChrome ? '' : 'pl-64'}>{children}</main>
//     </div>
//   );
// }

'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './components/Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define which routes should NOT show the sidebar
  const hideSidebar =
    pathname === '/login' ||
    pathname?.startsWith('/auth') ||
    pathname?.startsWith('/api');

  return (
    <div className="min-h-svh flex">
      {!hideSidebar && <Sidebar />}
      <main className={`flex-1 p-6 lg:p-8 ${hideSidebar ? '' : ''}`}>
        {children}
      </main>
    </div>
  );
}
