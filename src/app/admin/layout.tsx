import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-600 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">W</span>
          </div>
          <div>
            <span className="font-bold text-sm">Beheer West</span>
            <span className="text-brand-200 text-xs ml-2">
              Ontmoetingsplekken
            </span>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/admin/dashboard"
            className="text-brand-100 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/nieuw"
            className="bg-white text-brand-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors text-xs"
          >
            + Nieuwe plek
          </Link>
          <Link
            href="/"
            className="text-brand-200 hover:text-white transition-colors text-xs"
          >
            Bekijk site →
          </Link>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
