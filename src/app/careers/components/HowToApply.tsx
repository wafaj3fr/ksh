'use client';

type HowToApplyProps = {
  /** عنوان اختياري للقسم */
  title?: string;
  /** خطوات التقديم */
  steps?: string[];
};

export default function HowToApply({
  title = 'How to Apply',
  steps = [],
}: HowToApplyProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="bg-[#f7f9fc] px-6 sm:px-20 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary text-center mb-6">
          {title}
        </h2>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-[#E5DDBF] bg-white p-4 shadow-sm"
            >
              <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#B49C5B] text-white font-semibold">
                {i + 1}
              </span>
              <p className="text-gray-800">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
