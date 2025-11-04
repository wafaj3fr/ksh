'use client';

export default function HRContactCard({
  title,
  email,
  phone,
  whatsapp,
}: { title?: string; email?: string; phone?: string; whatsapp?: string }) {
  return (
    <section className="px-6 sm:px-20 py-12 bg-white">
      <div className="max-w-5xl mx-auto rounded-xl border border-black/10 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,.05),0_8px_20px_-12px_rgba(0,0,0,.08)]">
        <h3 className="text-xl font-semibold text-[#0a1f44] text-center">
          {title ?? 'Do You Have Questions?'}
        </h3>
        <div className="mt-4 flex flex-col items-center gap-1 text-sm text-[#263238]">
          {email && <div>Email: <a className="underline" href={`mailto:${email}`}>{email}</a></div>}
          {phone && <div>Phone: <a className="underline" href={`tel:${phone}`}>{phone}</a></div>}
          {whatsapp && <div>WhatsApp: <a className="underline" href={`https://wa.me/${whatsapp}`}>{whatsapp}</a></div>}
        </div>
      </div>
    </section>
  );
}
