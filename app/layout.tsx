import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cúspide Financiera | Dashboard",
  description: "Gestión de gastos de alto nivel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        <div className="flex h-screen overflow-hidden">
          
          {/* BARRA LATERAL (SIDEBAR) */}
          <aside className="hidden md:flex w-72 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-20 items-center px-8 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xl font-bold tracking-tight">CÚSPIDE</span>
            </div>
            
            <nav className="flex-1 space-y-1 px-4 py-6">
              <div className="flex items-center gap-3 rounded-lg bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                Dashboard
              </div>
              <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-all cursor-pointer">
                Gastos Mensuales
              </div>
              <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-all cursor-pointer">
                Presupuestos
              </div>
              <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-all cursor-pointer">
                Configuración
              </div>
            </nav>

            <div className="border-t border-zinc-100 p-4 dark:border-zinc-800">
              <div className="rounded-xl bg-zinc-900 p-4 dark:bg-zinc-50">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Plan Actual</p>
                <p className="text-sm font-bold text-white dark:text-zinc-900">Premium Pro</p>
              </div>
            </div>
          </aside>

          {/* ÁREA PRINCIPAL */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            
            {/* CABECERA (HEADER) */}
            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
              <h1 className="text-sm font-medium text-zinc-500">Resumen Financiero</h1>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold">Usuario Pro</span>
                  <span className="text-xs text-zinc-500">Activo</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800" />
              </div>
            </header>

            {/* CONTENIDO DE LA PÁGINA */}
            <main className="flex-1 p-8">
              {children}
            </main>

            {/* PIE DE PÁGINA (FOOTER) */}
            <footer className="border-t border-zinc-100 bg-white p-6 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">
              &copy; 2025 Cúspide Financiera. Sistema de Control Profesional.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}