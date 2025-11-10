import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function ViewProductPage() {
  return (
    <div className="p-6 text-slate-300 text-center">
              <Link
        href="/products"
        className="inline-flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 border border-slate-700 px-4 py-2 rounded-md transition-all hover:bg-slate-700"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>
    
      This page is empty.
    </div>
  );
}
