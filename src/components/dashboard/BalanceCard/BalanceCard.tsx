import { useState } from 'react';
import { Eye, EyeOff, Sparkles, Copy } from 'lucide-react';
import { formatCurrency } from '../../../utils/currency';
// import './BalanceCard.css'; // <-- Ya puedes eliminar o comentar este archivo

interface BalanceCardProps {
  balance: number;
  alias: string;
}

export default function BalanceCard({ balance, alias }: BalanceCardProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyAlias = async () => {
    try {
      await navigator.clipboard.writeText(alias);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      console.error('Error al copiar el alias');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#21516b] bg-gradient-to-br from-[#123b54] via-[#0d273d] to-[#0a1829] p-6 sm:p-8">
      {/* Elementos decorativos de fondo */}
      <div className="absolute -right-24 -top-28 size-80 rounded-full border border-[#38d8ec]/20" />
      <div className="absolute -right-8 -top-12 size-56 rounded-full border border-[#38d8ec]/10" />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9ab7c4]">
            Balance total
          </p>
          
          <div className="mt-4 flex items-center gap-3">
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-[47px]">
              {/* Aquí inyectamos tu lógica real */}
              {balanceVisible ? formatCurrency(balance, 'ARS') : 'ARS $ •••••••'}
            </h2>
            <button 
              className="text-[#75a8b8] transition-colors hover:text-white" 
              onClick={() => setBalanceVisible(!balanceVisible)} 
              aria-label={balanceVisible ? 'Ocultar balance' : 'Mostrar balance'}
            >
              {balanceVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-10 flex items-end justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#809ba7]">Alias de cuenta</p>
          <button 
            onClick={copyAlias} 
            className="mt-1 flex items-center gap-2 text-sm text-white transition-colors hover:text-[#38d8ea]"
          >
            {alias} <Copy size={13} />
            {copied && <span className="text-[10px] text-[#66e2d6]">Copiado</span>}
          </button>
        </div>
        <p className="hidden text-right text-xs text-[#809ba7] sm:block">
          Saldo disponible en ARS
        </p>
      </div>
    </div>
  );
}