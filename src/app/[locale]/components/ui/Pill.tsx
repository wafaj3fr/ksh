export default function Pill({
  children,
  tone = 'dim',
}: {
  children: React.ReactNode;
  tone?: 'dim' | 'accent' | 'ghost';
}) {
  const styles =
    tone === 'accent'
      ? 'border border-[#B49C5B]/40 bg-[#B49C5B]/10 text-[#0a1f44]'
      : tone === 'ghost'
      ? 'border border-black/10 bg-white/60 text-gray-700'
      : 'border border-black/10 bg-white text-gray-700';
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs ${styles}`}>
      {children}
    </span>
  );
}
