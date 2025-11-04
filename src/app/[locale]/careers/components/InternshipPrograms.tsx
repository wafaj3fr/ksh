'use client';

export default function InternshipPrograms({ title, body }: { title?: string; body?: string }) {
  return (
    <section className="bg-white px-6 sm:px-20 py-16">
      <div className="max-w-6xl mx-auto">
        {title && <h3 className="text-2xl font-bold text-[#0a1f44] text-center">{title}</h3>}
        <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto my-6" />
        {body && (
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[#263238]">{body}</p>
          </div>
        )}
      </div>
    </section>
  );
}
