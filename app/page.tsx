import { 
  agregarObjetivo, 
  obtenerObjetivos, 
  agregarGasto, 
  obtenerGastosDelDia 
} from "./actions";

export default async function Home() {
  // Ejecutamos ambas consultas en paralelo para máxima velocidad
  const [objetivos, gastos] = await Promise.all([
    obtenerObjetivos(),
    obtenerGastosDelDia()
  ]);

  // Calculamos el total gastado hoy
  const totalGastosHoy = gastos.reduce((acc, curr) => acc + curr.precio, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      
      {/* SECCIÓN DE BIENVENIDA Y RESUMEN RÁPIDO */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cúspide Financiera</h2>
          <p className="text-zinc-500 font-medium">Gestión profesional de tus recursos.</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Gastos de hoy</p>
          <p className="text-2xl font-black text-red-500">${totalGastosHoy.toLocaleString()}</p>
        </div>
      </section>

      {/* CARDS DE ESTADO GLOBAL */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Balance Total</p>
          <p className="mt-2 text-4xl font-bold">$12,450.00</p>
          <div className="mt-4 flex items-center text-sm font-medium text-green-600">
            <span>+12.5% vs mes anterior</span>
          </div>
        </div>

        <div className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Gastos del Mes</p>
          <p className="mt-2 text-4xl font-bold text-red-500">-$3,120.40</p>
          <div className="mt-4 flex items-center text-sm font-medium text-zinc-500">
            <span>24 movimientos registrados</span>
          </div>
        </div>

        <div className="group rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Eficiencia de Ahorro</p>
          <p className="mt-2 text-4xl font-bold text-blue-600">85%</p>
          <div className="mt-4 h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full w-[85%] bg-blue-600 rounded-full" />
          </div>
        </div>
      </section>

      {/* CUERPO PRINCIPAL: GASTOS VS OBJETIVOS */}
      <div className="grid gap-10 lg:grid-cols-2">
        
        {/* COLUMNA: GASTOS DIARIOS */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold px-2">Flujo Diario</h3>
          
          {/* Formulario de Gasto Rápido */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
            <form action={agregarGasto} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-zinc-400 ml-1">Descripción</label>
                <input 
                  name="nombre"
                  required
                  placeholder="Ej: Almuerzo, Gasolina..." 
                  className="w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-800"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 ml-1">Monto</label>
                  <input 
                    name="precio"
                    type="number" 
                    step="0.01"
                    required
                    placeholder="0.00" 
                    className="w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-800"
                  />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="h-11 bg-zinc-900 text-white px-8 rounded-xl font-bold text-xs hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 transition-all active:scale-95">
                    Registrar
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Lista de Gastos del Día */}
          <section className="rounded-3xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">Historial de Hoy</p>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-[400px] overflow-y-auto">
              {gastos.map((gasto) => (
                <div key={gasto.id} className="p-5 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <div>
                    <p className="font-bold text-sm">{gasto.nombre}</p>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">{gasto.categoria || 'General'}</p>
                  </div>
                  <p className="font-black text-red-500">-${gasto.precio.toLocaleString()}</p>
                </div>
              ))}
              {gastos.length === 0 && (
                <div className="py-20 text-center space-y-2">
                  <p className="text-zinc-400 text-xs italic">No hay gastos hoy.</p>
                  <p className="text-[10px] text-zinc-300">Tu bolsillo te lo agradece.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* COLUMNA: OBJETIVOS Y METAS */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold px-2">Objetivos</h3>

          {/* Formulario de Objetivos */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
            <form action={agregarObjetivo} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-zinc-400 ml-1">Meta / Producto</label>
                <input 
                  name="nombre"
                  required
                  placeholder="Ej: Viaje a Japón, PC Gamer..." 
                  className="w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 ml-1">Precio Total</label>
                  <input name="precio" type="number" step="0.01" required placeholder="0.00" className="w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 ml-1">Ahorro Inicial</label>
                  <input name="ahorrado" type="number" step="0.01" required placeholder="0.00" className="w-full rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-800" />
                </div>
              </div>
              <button type="submit" className="w-full h-11 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-xl font-bold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                Establecer Objetivo
              </button>
            </form>
          </section>

          {/* Lista de Objetivos */}
          <section className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {objetivos.map((obj) => {
                const porcentaje = Math.min(Math.round((obj.ahorrado / obj.precio) * 100), 100);
                return (
                  <div key={obj.id} className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">{obj.nombre}</p>
                        <p className="text-[10px] text-zinc-400 font-medium italic">Faltan: ${(obj.precio - obj.ahorrado).toLocaleString()}</p>
                      </div>
                      <span className="text-xs font-black">{porcentaje}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-700" 
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}