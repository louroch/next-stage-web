"use client"

export default function TypographyExample() {
  return (
    <div className="p-8 space-y-8">
      {/* TÍTULOS - Special Gothic Expanded One */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#D4CFBC] mb-4">TÍTULOS</h2>
        <div className="space-y-2">
          <h1 className="text-6xl font-special-gothic font-normal tracking-tight text-[#D4CFBC]">
            SPECIAL GOTHIC EXPANDED ONE REGULAR
          </h1>
          <p className="text-lg font-roboto text-[#D4CFBC]/80 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum nisi eros, 
            sed tristique nisl convallis ut.
          </p>
        </div>
      </div>

      {/* SUBTÍTULOS - Timmana */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#D4CFBC] mb-4">SUBTÍTULOS</h2>
        <div className="space-y-2">
          <h2 className="text-4xl font-timmana font-normal italic text-[#D4CFBC]">
            TIMMANA REGULAR
          </h2>
          <p className="text-lg font-roboto text-[#D4CFBC]/80 max-w-2xl">
            Ut at tincidunt ligula, quis efficitur ipsum. Class aptent taciti sociosqu ad litora 
            torquent per conubia nostra, per inceptos himenaeos.
          </p>
        </div>
      </div>

      {/* CUERPO DE TEXTO - Roboto */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#D4CFBC] mb-4">CUERPO DE TEXTO Y NOTAS AL PIE</h2>
        <div className="space-y-2">
          <p className="text-lg font-roboto font-normal text-[#D4CFBC]/80 max-w-2xl">
            Vivamus rhoncus suscipit turpis, nec lacinia felis vulputate ac. Pellentesque mollis 
            ultricies mollis. Nullam tincidunt scelerisque odio ut rhoncus.
          </p>
        </div>
      </div>

      {/* EJEMPLO DE USO EN COMPONENTES */}
      <div className="space-y-4 pt-8 border-t border-[#D4CFBC]/20">
        <h2 className="text-2xl font-bold text-[#D4CFBC] mb-4">EJEMPLO DE USO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#2a2424]/50 border border-[#D4CFBC]/20 rounded-lg">
            <h3 className="text-2xl font-special-gothic font-normal text-[#D4CFBC] mb-3">
              TÍTULO DE SECCIÓN
            </h3>
            <p className="text-base font-roboto text-[#D4CFBC]/80">
              Este es un ejemplo de cómo usar la tipografía en componentes reales.
            </p>
          </div>
          
          <div className="p-6 bg-[#2a2424]/50 border border-[#D4CFBC]/20 rounded-lg">
            <h4 className="text-xl font-timmana font-normal italic text-[#D4CFBC] mb-3">
              Subtítulo de componente
            </h4>
            <p className="text-sm font-roboto text-[#D4CFBC]/70">
              Texto más pequeño para notas al pie o información secundaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
