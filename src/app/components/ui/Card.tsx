export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,.05),0_8px_20px_-12px_rgba(0,0,0,.08)] ${className}`}>
      {children}
    </div>
  );
}
