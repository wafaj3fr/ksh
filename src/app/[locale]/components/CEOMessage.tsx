import Image from "next/image";

interface CEOMessageProps {
  message?: string;
  imageUrl?: string;
}

export default function CEOMessage({ message, imageUrl }: CEOMessageProps) {
  return (
    <section className="bg-white py-24 px-6 sm:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* Left - Heading and Message */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-primary mb-2">
              General Manager Message
            </h2>
            <div className="w-20 h-1 bg-[#B49C5B] rounded" />
          </div>

          <div className="max-h-[300px] overflow-y-auto pe-2 scrollbar-thin scrollbar-thumb-[#B49C5B] scrollbar-track-#B49C5B/10">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {message}
            </p>
          </div>

          <div className="pt-2">
            <p className="text-sm font-semibold text-gray-800">
              Mahmoud Alassad
            </p>
            <p className="text-xs text-gray-500">Chief Executive Officer</p>
          </div>
        </div>

        {/* Right - Image */}
        {imageUrl && (
          <div className="flex justify-center">
            <Image
              src={imageUrl}
              alt="CEO"
              width={180}
              height={180}
              className="rounded-full border border-[#B49C5B]/40 shadow-md"
            />
          </div>
        )}
      </div>
    </section>
  );
}
