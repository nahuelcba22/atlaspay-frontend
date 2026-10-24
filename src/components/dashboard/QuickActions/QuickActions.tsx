import { useNavigate } from 'react-router-dom';
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Send } from 'lucide-react';

function QuickActions() {
  const navigate = useNavigate();

  // Mapeamos las acciones para renderizar los botones de forma más limpia
  const actions = [
    { 
      id: 'comprar', 
      label: 'Comprar', 
      icon: ArrowDownToLine, 
      route: '/operaciones?tipo=comprar' 
    },
    { 
      id: 'vender', 
      label: 'Vender', 
      icon: ArrowUpFromLine, 
      route: '/operaciones?tipo=vender' 
    },
    { 
      id: 'cambiar', 
      label: 'Cambiar', 
      icon: ArrowLeftRight, 
      route: '/operaciones?tipo=cambiar' 
    },
    { 
      id: 'transferir', 
      label: 'Transferir', 
      icon: Send, 
      route: '/transferencias' 
    },
  ];

  return (
    <section className="flex h-full flex-col rounded-[24px] border border-[#21516b]/40 bg-[#0a1829]/60 p-6 sm:p-8">
      <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-[#809ba7]">
        Operaciones Rápidas
      </h2>

      {/* Grilla 2x2 para los botones */}
      <div className="grid h-full grid-cols-2 gap-3 sm:gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => navigate(action.route)}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.06]"
            >
              {/* Contenedor del ícono con efecto de rebote al pasar el mouse */}
              <div className="rounded-full bg-[#123b54]/50 p-3 text-[#38d8ec] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-[#123b54] group-hover:text-white">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-[#c4d6e0] transition-colors group-hover:text-white">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;