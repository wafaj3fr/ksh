import Image from "next/image";

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  content: any[];
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  gallery?: {
    asset: { url: string };
    alt?: string;
  }[];
}

interface NewsProps {
  news: NewsItem[];
}

export default function News({ news }: NewsProps) {
  return (
    <section id="news" className="px-8 sm:px-20 py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-primary">News & Updates</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {news.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow p-6 text-left">
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(item.date).toLocaleDateString()}
              </p>

              {/* Main Image */}
              {item.mainImage?.asset.url && (
                <div className="mb-4">
                  <Image
                    src={item.mainImage.asset.url}
                    alt={item.mainImage.alt || "News Image"}
                    width={400}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <p className="text-gray-700 text-sm mb-4">
                {item.content[0]?.children[0]?.text || ""}
              </p>

              {/* Gallery */}
              {item.gallery?.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {item.gallery.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img.asset.url}
                      alt={img.alt || "Gallery Image"}
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
