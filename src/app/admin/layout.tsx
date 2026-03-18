import Link from "next/link";
import {
  MapPinIcon,
  Squares2X2Icon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-gray-950 flex-col shrink-0 fixed h-full">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center shrink-0">
              <MapPinIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white text-sm font-semibold leading-tight">
                Beheer West
              </div>
              <div className="text-gray-500 text-xs leading-tight mt-0.5">
                &apos;s-Hertogenbosch
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-2 mb-2">
            Beheer
          </p>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            <Squares2X2Icon className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/nieuw"
            className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Nieuwe plek
          </Link>
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-gray-600 hover:text-gray-300 transition-colors text-xs"
          >
            <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            Bekijk site
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden bg-gray-950 px-4 py-3.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center shrink-0">
            <MapPinIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-sm font-semibold">Beheer West</span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors text-xs"
        >
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
          Bekijk site
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 md:ml-56 min-h-screen pb-24 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-white/5 flex z-20">
        <Link
          href="/admin/dashboard"
          className="flex-1 flex flex-col items-center gap-1 py-3 text-gray-500 hover:text-white transition-colors"
        >
          <Squares2X2Icon className="w-5 h-5" />
          <span className="text-xs">Dashboard</span>
        </Link>
        <Link
          href="/admin/nieuw"
          className="flex-1 flex flex-col items-center gap-1 py-3 text-gray-500 hover:text-white transition-colors"
        >
          <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center -mt-5 shadow-lg shadow-brand-900/40">
            <PlusIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs mt-0.5">Nieuw</span>
        </Link>
        <Link
          href="/admin"
          className="flex-1 flex flex-col items-center gap-1 py-3 text-gray-500 hover:text-white transition-colors"
        >
          <MapPinIcon className="w-5 h-5" />
          <span className="text-xs">Overzicht</span>
        </Link>
      </nav>
    </div>
  );
}
