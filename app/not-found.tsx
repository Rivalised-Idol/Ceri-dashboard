// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center px-6">
        <h1 className="text-8xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
