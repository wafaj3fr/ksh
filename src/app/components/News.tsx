interface NewsItem {
  _id: string;
  title: string;
  date: string;
  content: any[];
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
              <p className="text-gray-600 text-sm mb-2">{new Date(item.date).toLocaleDateString()}</p>
              <p className="text-gray-700 text-sm">{item.content[0]?.children[0]?.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
