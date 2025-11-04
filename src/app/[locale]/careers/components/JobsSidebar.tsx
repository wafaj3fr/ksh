export default function JobsSidebar({ counts }:{ counts:Record<string,number> }) {
  const order = ['All','Engineering','Product','Design','Operation','Marketing'];
  return (
    <aside className="rounded-2xl border border-white/10 bg-[#0b0f13] p-4">
      <ul className="space-y-1">
        {order.map((k) => (
          <li key={k} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/[0.03]">
            <span className="text-sm text-white">{k}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
              {counts[k] ?? 0}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border border-[#b99a53]/40 bg-[#b99a53]/10 p-3 text-sm text-[#e7d8ad]">
        We are always seeking talented people. Share your LinkedIn profile and we will be in touch.
        <button className="mt-3 w-full rounded-lg border border-[#b99a53]/50 bg-[#b99a53]/15 px-3 py-1.5 text-sm hover:bg-[#b99a53]/20">
          Share your LinkedIn profile
        </button>
      </div>
    </aside>
  );
}
