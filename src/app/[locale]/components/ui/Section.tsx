export default function Section({ children, wide=false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <section className={`mx-auto ${wide?'max-w-7xl':'max-w-5xl'} w-full px-4 sm:px-6 lg:px-8`}>
      {children}
    </section>
  );
}
