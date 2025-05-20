import Image from "next/image";

interface CEOMessageProps {
  message?: string;
  imageUrl?: string;
}

export default function CEOMessage({ message, imageUrl }: CEOMessageProps) {
  return (
    <section className="px-8 sm:px-20 py-20 bg-[#f7f9fc]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <h2 className="text-3xl font-bold mb-6 text-primary">CEO's Message</h2>
        <p className="text-lg text-gray-600 max-w-2xl">{message}</p>
        {imageUrl && (
          <Image src={imageUrl} alt="CEO" width={100} height={100} className="rounded-full mx-auto" />
        )}
      </div>
    </section>
  );
}
