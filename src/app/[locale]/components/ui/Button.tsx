'use client';

type Variant = 'primary' | 'outline' | 'ghost';

export default function Button({
  children,
  variant = 'outline',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base = 'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm transition';
  const styles: Record<Variant, string> = {
    primary: 'bg-[#B49C5B] text-white hover:brightness-110',
    outline:
      'border border-[#B49C5B]/40 text-[#0a1f44] bg-[#B49C5B]/10 hover:bg-[#B49C5B]/15',
    ghost:
      'border border-black/10 bg-white/60 text-gray-700 hover:bg-white',
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
